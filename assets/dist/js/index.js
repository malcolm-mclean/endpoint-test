(function () {
	const dom = {
		form: {
			self: document.querySelector('#form'),
			input: document.querySelector('#input'),
			submit: document.querySelector('#submit')
		},
		user: document.querySelector('#user'),
		content: document.querySelector('#content'),
		spinner: document.querySelector('#spinner')
	};

	const state = {
		searchTerm: '',
		loading: false,
		data: {
			user: {},
			posts: {}
		},
		error: ''
	};

	const stateMethods = {
		setSearchTermState: (searchTerm) => {
			return new Promise((resolve, reject) => {
				state.searchTerm = searchTerm
				resolve(state.searchTerm);
			});
		},
		setLoadingState: (isLoading) => {
			return new Promise((resolve, reject) => {
				state.loading = isLoading
				resolve(state.loading);
			});
		},
		setPostsDataState: (json) => {
			return new Promise((resolve, reject) => {
				state.data.posts = json
				resolve(state.data.posts);
			});
		},
		setUserDataState: (json) => {
			return new Promise((resolve, reject) => {
				state.data.user = json
				resolve(state.data.user);
			});
		},
		setErrorState: (error) => {
			return new Promise((resolve, reject) => {
				state.error = error
				resolve(state.error);
			});
		}
	};

	const uiMethods = {
		renderLoading: (isLoading) => {
			uiMethods.toggleSection('content', isLoading);
			uiMethods.toggleSection('user', isLoading);

			if (isLoading) {
				dom.spinner.classList.remove('hide');
			} else {
				dom.spinner.classList.add('hide');
			}
		},
		renderContent: (json) => {
			return new Promise((resolve, reject) => {
				let html = `<h3 class="post-count">${json.length} posts found</h3>`;
				json.map(post => {
					const title = `<h2 class="post-title"><a href="/post/${post.id}">${post.title}</a></h2>`;
					const body = `<p class="post-content">${post.body}</p>`
					html += `<article class="post" id="${post.id}">${title}${body}</article>`;
				});
				dom.content.innerHTML = html;
				resolve();
			});
		},
		renderUser: (json) => {
			return new Promise((resolve, reject) => {
				const name = `<h2 class="user-name">${json.name}</h2>`;
				const email = `<a class="user-email" href="mailto:${json.email}">${json.email}</a>`;
				const companyName = `<h3 class="user-company">${json.company.name}</h3>`;
				const companyCatchphrase = `<p class="user-company-catchphrase">${json.company.catchPhrase}</p>`;

				dom.user.innerHTML = `<div class="user-info-wrapper">${name}${email}</div>${companyName}${companyCatchphrase}`;

				resolve();
			});
		},
		toggleSection: (section, isLoading) => {
			if (isLoading) {
				dom[section].classList.add('hide');
			} else {
				dom[section].classList.remove('hide');
			}
		}
	};

	const endpointMethods = {
		getJson: async (endpoint, callback) => {
			try {
				const response = await fetch(endpoint);
				const json = await response.json();
				return callback(json);
			}
			catch (error) {
				console.log(`Error during fetch: ${error.toString()}`);
			}
		},
		getEndpointWithArgs: (resource, filter = undefined, id = undefined) => {
			const baseUrl = 'https://jsonplaceholder.typicode.com';
		
			let endpoint = `${baseUrl}/${resource}`;
			let modifiers = '';
		
			if (filter && !id) {
				throw new Error('Filtering requires an ID');
			}
		
			if (!filter && id) {
				modifiers = `/${id}`
			}
		
			if (filter && id) {
				modifiers = `?${filter}=${id}`;
			}
		
			return endpoint + modifiers;
		},
		getPosts: async (searchTerm) => {
			const endpoint = endpointMethods.getEndpointWithArgs('posts', 'userId', searchTerm);
		
			try {
				const json = await endpointMethods.getJson(endpoint, stateMethods.setPostsDataState);
				return uiMethods.renderContent(json, 'posts');
			}
			catch (error) {
				console.log(`Error during getPosts: ${error.toString()}`);
				stateMethods.setErrorState(error);
				// todo: add error to dom
			}
		},
		getUser: async (searchTerm) => {
			const endpoint = endpointMethods.getEndpointWithArgs('users', false, searchTerm);
		
			try {
				const json = await endpointMethods.getJson(endpoint, stateMethods.setUserDataState);
				return uiMethods.renderUser(json);
			}
			catch (error) {
				console.log(`Error during getPosts: ${error.toString()}`);
				stateMethods.setErrorState(error);
				// todo: add error to dom
			}
		}
	};

	const disableAllLinks = () => {
		const links = document.querySelectorAll('a');

		for (let i = 0; i < links.length; i++) {
			links[i].addEventListener('click', (e) => {
				e.preventDefault();
			});
		}
	}

	dom.form.self.addEventListener('submit', async (e) => {
		e.preventDefault();
		const searchTerm = dom.form.input.value;
		if (searchTerm) {
			await stateMethods.setLoadingState(true).then(isLoading => {
				uiMethods.renderLoading(isLoading);
			});

			await stateMethods.setSearchTermState(searchTerm);

			// these two lines are inefficient and should be cleaned up
			await endpointMethods.getPosts(state.searchTerm);
			await endpointMethods.getUser(state.searchTerm);

			stateMethods.setLoadingState(false).then(isLoading => {
				uiMethods.renderLoading(isLoading);
				disableAllLinks();
			});
		}

		return;
	});
})();