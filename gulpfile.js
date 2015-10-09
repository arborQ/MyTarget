var
gulp = require('gulp'),
ts = require('gulp-typescript'),
less = require('gulp-less');

gulp.task('setupApplicationJs', function() {
  return gulp.src('./src/server/**/*.js')
  .pipe(gulp.dest('./'));
});

gulp.task('setupApplicationTs', ['setupApplicationJs'], function() {
  return gulp.src('./src/server/**/*.ts')
  .pipe(ts({ module : 'commonjs' }))
  .pipe(gulp.dest('./'));
});

gulp.task('setupApplicationWatch', ['setupApplicationJs', 'setupApplicationTs'], function() {
  return gulp.watch('./src/server/**/*.{ts,js}', ['setupApplicationJs', 'setupApplicationTs']);
});

gulp.task('css', function () {
  return gulp.src('./src/client/**/*.css')
    .pipe(less())
    .pipe(gulp.dest('./public'));
});

gulp.task('less', ['css'], function () {
  return gulp.src('./src/client/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public'));
});
