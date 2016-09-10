var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var sassdoc = require('sassdoc');
var cleanCSS = require('gulp-clean-css');

var autoprefixerOptions = {
    browsers: ['last 2 versions','ie >= 9', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
});
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'watch'],
        callback
    );
});

gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('src/css/'));
});
