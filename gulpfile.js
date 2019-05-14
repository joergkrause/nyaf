// further build steps to create bundles for npm
const gulp = require('gulp');

gulp.task('packages', () => {
  return gulp.src([
    'projects/**/README.md',
    'projects/**/package.json',    
  ]).pipe(gulp.dest('dist'))
});

gulp.task('types/forms', () => {
  return gulp.src([
    'projects/@nyaf/forms/src/**/*.d.ts'
  ]).pipe(gulp.dest('dist/@nyaf/forms'))
});

gulp.task('types/lib', () => {
  return gulp.src([
    'projects/@nyaf/forms/src/**/*.d.ts'
  ]).pipe(gulp.dest('dist/@nyaf/lib'))
});

gulp.task('types/store', () => {
  return gulp.src([
    'projects/@nyaf/forms/src/**/*.d.ts'
  ]).pipe(gulp.dest('dist/@nyaf/store'))
});

gulp.task('default', gulp.parallel('packages', 'types/forms', 'types/store', 'types/lib'));
