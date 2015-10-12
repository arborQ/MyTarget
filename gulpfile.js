var
gulp = require('gulp'),
ts = require('gulp-typescript'),
less = require('gulp-less')
group = require('gulp-group-files')
concat= require('gulp-concat')
ngAnnotate = require('gulp-ng-annotate')
jade = require('gulp-jade');

gulp.task('css', function () {
  return gulp.src('./src/client/**/*.css')
    .pipe(less())
    .pipe(gulp.dest('./public'));
});

gulp.task('less', ['css'], function () {
  return gulp.src(['./src/client/**/*.less', '!./src/client/variables.less'])
    .pipe(less())
    .pipe(gulp.dest('./public'));
});

gulp.task('jade', function(){
  return gulp.src('./src/client/*/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public'));
});

gulp.task('clientTs',group({
  'application' : [ './typings/**/*.d.ts','./src/client/**/*.d.ts', './src/client/application/**/*.ts' ],
  'auth' : [ './typings/**/*.d.ts','./src/client/**/*.d.ts', './src/client/auth/**/*.ts' ],
  'users' : [ './typings/**/*.d.ts','./src/client/**/*.d.ts', './src/client/users/**/*.ts' ]
}, function(name, files){
  console.log(files);
    return gulp.src(files)
      .pipe(ts({ mode : 'amd' }))
      .pipe(ngAnnotate())
      .pipe(concat(name + ".js"))
      .pipe(gulp.dest("./public/" + name));
}));

gulp.task('default', [ 'less' , 'setupApplicationTs', 'clientTs', 'jade' ], function () {});
gulp.task('watch', [ 'clientTs', 'jade', 'less'], function() {
  return gulp.watch('./src/client/**/*.{ts,jade,less}', [ 'clientTs', 'jade', 'less' ]);
});
