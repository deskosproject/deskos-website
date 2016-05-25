var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var handlebars = require('gulp-handlebars');
var hb = require('gulp-hb');
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

// Html
gulp.task('html', function() {
  return gulp.src('./src/*.html')
  .pipe(browserSync.stream());
})

// Scripts
gulp.task('scripts', function() {
  return gulp.src('./src/scripts/*.js')
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());
})

// Styles
gulp.task('styles', function() {
  return gulp.src('./src/styles/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());
});

// Templates
gulp.task('hbs', function() {
  gulp.src('./src/index.html')
  .pipe(hb({
    data: './src/data/*.{js,json}',
    helpers: './src/helpers/*.js',
    partials: './src/templates/*.hbs'
  }))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());
});

// Images
gulp.task('images', function() {
  gulp.src(['./src/assets/images/*', './src/assets/images/screens/*'])
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/assets/images'))
  .pipe(browserSync.stream());
});

// Static server
gulp.task('serve', ['html', 'scripts', 'styles', 'hbs', 'images'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch('./src/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./src/styles/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('./src/scripts/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('./src/templates/*.hbs', ['hbs']).on('change', browserSync.reload);
  gulp.watch('./src/assets/images/*', ['images']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
