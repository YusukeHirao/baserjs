const gulp = require('gulp');
const webpackGulp = require('webpack-stream');
const webpack = require('webpack');
const ts = require('gulp-typescript');
const tsc = require('typescript');
const header = require('gulp-header');
const moment = require('moment');
const runSequence = require('run-sequence');
const git = require('git-rev-sync');
const pkg = require('./package.json');

const banner = `/**!
	* ${pkg.name} - v${pkg.version}
	* revision: ${git.long()}
	* update: ${moment().format("YYYY-MM-DD")}
	* Author: ${pkg.author} [${pkg.website}]
	* Github: ${pkg.repository.url}
	* License: Licensed under the ${pkg.license} License
	*/

`;

const project = ts.createProject('./tsconfig.json', {typescript: tsc});

gulp.task('ts', () => project.src().pipe(project()).pipe(gulp.dest('./lib/')));

gulp.task('pack', () => {
	gulp.src('./lib/browser.js')
		.pipe(webpackGulp({
			plugins: [new webpack.optimize.AggressiveMergingPlugin()],
			output: {
				filename: 'baser.js'
			}
		}, webpack))
		.pipe(header(banner, {
			pkg: pkg,
			moment: moment,
			git: git
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe(gulp.dest("./dist/v" + pkg.version + "/"));
});

gulp.task('dev-ts', (cb) => runSequence('ts', 'pack', cb));

gulp.task('watch', () => gulp.watch('src/**/*.ts', ['dev-ts']));

gulp.task('build', (cb) => runSequence('ts', 'pack', cb));

gulp.task('default', ['build']);
