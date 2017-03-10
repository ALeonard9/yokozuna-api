var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
const jshint = require('gulp-jshint');


gulp.task('default', function() {
  return gulp.src('src/*.js')
   .pipe(jshint())
   .pipe(jshint.reporter('jshint-stylish'))
   .pipe(jshint.reporter('fail'))
   .pipe(uglify())
   .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['default']);
});
