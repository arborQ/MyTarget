var gulp = require('gulp');
var jade = require('gulp-jade');
var ts = require('gulp-typescript');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var min = require('gulp-uglify');
var anotate = require('gulp-ng-annotate');
var embedTemplates = require('gulp-angular-embed-templates');
var less = require('gulp-less');
var cssMin = require('gulp-uglifycss');

gulp.task('jadeToHtml', function(){
  return gulp.src('modules/**/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('public'));
});

var pipeTsFolder = function(name) {
  return gulp.src(['typings/**/*.ts', 'modules/' + name + '/' + name + '-controllers.ts'])
  .pipe(ts())
  .pipe(concat(name + '/' + name + '.min.js'))
  .pipe(min())
  .pipe(gulp.dest('public'));
};

gulp.task('createSite', function(){
  return gulp.src(['typings/**/*.ts', 'modules/**/setup.ts', 'modules/**/*-directives.ts', 'modules/app/*-filter.ts'])
  .pipe(ts())
  .pipe(anotate())
  .pipe(concat('site.min.js'))
  .pipe(min())
  .pipe(gulp.dest('public'));
});

gulp.task('createControllers', function(){
  return gulp.src(['typings/**/*.ts', 'modules/**/*-controller.ts', 'modules/**/*-filters.ts'])
  .pipe(ts())
  .pipe(anotate())
  .pipe(min())
  .pipe(gulp.dest('public'));
});

gulp.task('tsTojs', ['createSite', 'createControllers'], function(){
  gulp.src(['typings/**/*.ts', 'modules/app.ts', 'modules/main.ts'])
  .pipe(ts())
  .pipe(anotate())
  .pipe(min())
  .pipe(gulp.dest('public'));
});

gulp.task('lessToCss', function(){
  return gulp.src('modules/**/*.less')
  .pipe(less())
  .pipe(concat('site.min.css'))
  .pipe(cssMin())
  .pipe(gulp.dest('public'))
});

gulp.task('default', ['jadeToHtml', 'tsTojs'], function(){
});

gulp.task('watch',['jadeToHtml','tsTojs','lessToCss'], function(){
  gulp.watch('modules/**/*.{jade,ts,less}', ['jadeToHtml','tsTojs','lessToCss']);
});





gulp.task('jshint', function() {
  return gulp.src('content/**/*.ts')
    .pipe(ts())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
