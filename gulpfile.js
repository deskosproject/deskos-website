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

// Fonts
gulp.task('fonts', function() {
  return gulp.src(['./src/assets/fonts/*','./node_modules/font-awesome/fonts/*'])
  .pipe(gulp.dest('./dist/assets/fonts'))
  .pipe(browserSync.stream());
})

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['./src/scripts/*.js','./node_modules/jquery/dist/jquery.min.js','./node_modules/jquery-smooth-scroll/jquery.smooth-scroll.min.js','./node_modules/jquery-fancybox/source/js/jquery.fancybox.pack.js'])
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());
})

// Styles
gulp.task('styles', function() {
  return gulp.src(['./src/styles/main.scss','./node_modules/bootstrap/dist/css/bootstrap.min.css','./node_modules/font-awesome/css/font-awesome.min.css','./node_modules/jquery-fancybox/source/scss/jquery.fancybox.scss'])
  .pipe(sass())
  .pipe(gulp.dest('./dist/assets/styles'))
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
  gulp.src(['./src/assets/images/*'])
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/assets/images'))
  .pipe(browserSync.stream());

  gulp.src(['./src/assets/images/screens/*'])
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/assets/images/screens'))
  .pipe(browserSync.stream());

  gulp.src(['./node_modules/jquery-fancybox/source/img/*'])
  .pipe(gulp.dest('./dist/assets/styles'));
});

// Static server
gulp.task('serve', ['html', 'fonts', 'scripts', 'styles', 'hbs', 'images'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch('./src/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./src/assets/fonts/*', ['fonts']).on('change', browserSync.reload);
  gulp.watch('./src/styles/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('./src/scripts/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('./src/templates/*.hbs', ['hbs']).on('change', browserSync.reload);
  gulp.watch(['./src/assets/images/*','./src/assets/images/screens/*'], ['images']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
