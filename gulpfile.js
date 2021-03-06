var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var sassdoc = require('sassdoc');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');


var autoprefixerOptions = {
    browsers: ['last 2 versions','ie >= 9', '> 5%', 'Firefox ESR']
};

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        // server: {
        //     baseDir: 'dev'
        // }
        proxy: "localhost:8080"

    })
});


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
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});




gulp.task('min', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('src/css/'));
});
