"use strict";
var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  tsc = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps');

var tsProjectForJs = tsc.createProject("tsconfig.json");
var tsProjectForClientJs = tsc.createProject("tsconfig-client.json");
gulp.task('build', ['build-server', 'build-client']);
gulp.task('build-server', function () {
  return gulp.src([
    './**/**.ts',
    '!./lib/**',
    '!./client/**',
    '!./node_modules/**'
  ])
    .pipe(sourcemaps.init())
    .pipe(tsProjectForJs())
    .js
    .pipe(sourcemaps.write('../maps', {
      includeContent: false,
      sourceRoot: function (file) {
        // needed to fix relative path in sourceMaps
        var path = '../'.repeat((file.relative.match(/\//g) || []).length);
        return path;
      }
    }))
    .pipe(gulp.dest('lib'));
})
gulp.task('build-client', function () {
  return gulp.src([
    './typings/**/**.ts',
    './client/**/**.ts',
  ])
    .pipe(tsProjectForClientJs())
    .js
    .pipe(gulp.dest('client'));
})

gulp.task('tests-no-build', function () {
  return gulp.src('./lib/spec/*.js')
    .pipe(mocha());
});

gulp.task('tests', ['build'], function () {
  return gulp.src('./lib/spec/*.js')
    .pipe(mocha());
});

//alternative name for the 'tests' task
gulp.task('specs', ['tests']);

gulp.task('server', function () {
  require('./lib/src/server');
});
