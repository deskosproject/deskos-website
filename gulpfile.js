var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var handlebars = require('gulp-handlebars');
var hb = require('gulp-hb');
var sass = require('gulp-sass');

// Styles
gulp.task('styles', function(){
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
    .pipe(gulp.dest('./dist/'));
});

// Static server
gulp.task('serve', ['styles', 'hbs'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('./src/templates/*.hbs', ['hbs']).on('change', browserSync.reload);
    gulp.watch('./src/styles/*.scss', ['styles']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
