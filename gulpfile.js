// further build steps to create bundles for npm
const gulp = require('gulp');

gulp.task('packages', () => {
  return gulp.src([
    'src/packages/**/README.md',
    'src/packages/**/package.json',
    'out-tsc/packages/**/*.d.ts'    
  ]).pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.parallel('packages'));
