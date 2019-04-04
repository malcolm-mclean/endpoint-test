'use strict';

const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const gulpSass = require('gulp-sass');

/**
 * Asset directories
 */
const paths = {
	dist: {
		js: './assets/dist/js/',
		css: './assets/dist/css/',
	},
	src: {
		js: './assets/src/js/**/*.js',
		scss: './assets/src/scss/**/*.scss',
	}
};

function buildJs() {
	console.log(paths.src.js);
	return gulp.src([paths.src.js, '!./node_modules/**/*.js'])
		.pipe(gulp.dest(paths.dist.js))
		.pipe(browserSync.stream());
}

function buildCss() {
	return gulp.src(paths.src.scss)
		.pipe(gulpSass().on('error', gulpSass.logError))
		.pipe(gulp.dest(paths.dist.css))
		.pipe(browserSync.stream());
}

/**
 * Wrapper for all asset handling tasks, used as default gulp task
 */
function build() {
	browserSync.init({
		server: {
			baseDir: './'
		},
		reloadDelay: 500
	});

	gulp.watch(paths.src.scss, buildCss);
	gulp.watch(paths.src.js, buildJs);
	gulp.watch('./index.html', ).on('change', browserSync.reload);
}

gulp.task('default', build);