var
gulp = require('gulp'),
ts = require('gulp-typescript');

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
