// further build steps to create bundles for npm
const gulp = require('gulp');

gulp.task('packages', () => {
  return gulp.src([
    'projects/**/README.md',
    'projects/**/package.json',
    'out-tsc/projects/**/*.d.ts'    
  ]).pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.parallel('packages'));
