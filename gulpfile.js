var gulp = require('gulp');
var jade = require('gulp-jade');
var ts = require('gulp-typescript');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var min = require('gulp-uglify');
var anotate = require('gulp-ng-annotate');
var embedTemplates = require('gulp-angular-embed-templates');

gulp.task('jadeToHtml', function(){
  return gulp.src('modules/**/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('public'));
});

var pipeTsFolder = function(name) {
  return gulp.src(['typings/**/*.ts', 'modules/' + name + '/*.ts'])
  .pipe(ts())
  .pipe(anotate())
  .pipe(concat(name + '/' + name + '.min.js'))
  .pipe(min())
  .pipe(gulp.dest('public'));
};

gulp.task('tsTojs', function(){
  pipeTsFolder('app');
  pipeTsFolder('cookBook');
  pipeTsFolder('users');
});

gulp.task('default', ['jadeToHtml', 'tsTojs'], function(){
});

gulp.task('watch',['jadeToHtml','tsTojs'], function(){
  gulp.watch('content/**/*.{jade,ts}', ['jadeToHtml','tsTojs']);
});





gulp.task('jshint', function() {
  return gulp.src('content/**/*.ts')
    .pipe(ts())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
