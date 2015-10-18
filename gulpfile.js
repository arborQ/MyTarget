var
gulp = require('gulp'),
ts = require('gulp-typescript'),
less = require('gulp-less')
group = require('gulp-group-files')
concat= require('gulp-concat')
ngAnnotate = require('gulp-ng-annotate')
jade = require('gulp-jade')
gulpIf = require('gulp-if')
minJs = require('gulp-uglify')
minCss = require('gulp-minify-css')
flat = require('gulp-flatten'),
jsonMin = require('gulp-jsonmin'),
rename = require('gulp-rename'),
argv = require('yargs').argv;


gulp.task('less', function () {
  return gulp.src(['./src/client/**/*.less', '!./src/client/variables.less'])
    .pipe(less())
    .pipe(gulpIf(argv.production || argv.p, concat('site.min.css')))
    .pipe(gulpIf(argv.production || argv.p, minCss()))
    .pipe(gulp.dest('./public'));
});

gulp.task('jade', function(){
  return gulp.src('./src/client/*/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public'));
});

var languagePackage = function(code){
  return gulp.src(['./src/client/**/'+ code +'/*.lang.json' ])
  .pipe(flat())
  .pipe(rename({ extname : '' }))
  .pipe(jsonMin())
  .pipe(gulp.dest('./public/resources/' + code));
}
var jsPackage = function(name){
  console.log('./src/client/'+ name +'/**/*.ts');
  return gulp.src([ './typings/**/*.d.ts', '!./src/**/structure/*.ts', './src/client/**/*.d.ts', './src/client/'+ name +'/**/*.ts' ])
    .pipe(ts({ mode : 'amd' }))
    .pipe(ngAnnotate())
    .pipe(concat(name + ".js"))
    .pipe(gulp.dest("./public/" + name));
};

gulp.task('structureTs', function(){
  return gulp.src(['./typings/**/*.d.ts', './src/**/structure/*.ts' ])
  .pipe(ts({ mode : 'amd' }))
  .pipe(concat('structure.js'))
  .pipe(gulpIf(argv.production || argv.p, minJs()))
  .pipe(gulp.dest("./public"));

});

gulp.task('clientTs', ['structureTs'], function(){
  if(argv.production || argv.p){
    return gulp.src([ './typings/**/*.d.ts','./src/client/**/*.d.ts', './src/client/**/*.ts' ])
      .pipe(ts({ mode : 'amd' }))
      .pipe(ngAnnotate())
      .pipe(concat('site.min.js'))
      .pipe(minJs())
      .pipe(gulp.dest("./public"));
  }else{
    jsPackage('application');
    jsPackage('auth');
    jsPackage('users');
    jsPackage('settings');
  }
});
gulp.task('locale', function(){
  languagePackage('en-US');
  languagePackage('pl-PL');
});
gulp.task('default', [ 'less' , 'clientTs', 'jade', 'locale' ], function () {});
gulp.task('watch', [ 'default'], function() {
  return gulp.watch('./src/client/**/*.{ts,jade,less,json}', [ 'default' ]);
});
