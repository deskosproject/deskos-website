var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Styles
gulp.task('styles', function(){
  return gulp.src('src/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// HTML
gulp.task('html', function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Static server
gulp.task('serve', ['html', 'styles'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
    gulp.watch('src/styles/*.scss', ['styles']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
