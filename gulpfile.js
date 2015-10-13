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
var jsPackage = function(name){
  console.log('./src/client/'+ name +'/**/*.ts');
  return gulp.src([ './typings/**/*.d.ts','./src/client/**/*.d.ts', './src/client/'+ name +'/**/*.ts' ])
    .pipe(ts({ mode : 'amd' }))
    .pipe(ngAnnotate())
    .pipe(concat(name + ".js"))
    .pipe(gulp.dest("./public/" + name));
};

gulp.task('clientTs', function(){
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

gulp.task('default', [ 'less' , 'clientTs', 'jade' ], function () {});
gulp.task('watch', [ 'default'], function() {
  return gulp.watch('./src/client/**/*.{ts,jade,less}', [ 'default' ]);
});
