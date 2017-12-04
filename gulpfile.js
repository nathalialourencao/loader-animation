const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch');

//task para o sass
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
            gutil.beep();
        }}))
        .pipe(sourcemaps.init())
        .pipe(sass({sourceMap: true, outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(
            {
                browsers: [
                    '> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'
                ],
                cascade: false
            }
        ))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('css'))
});

//task para o watch
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['sass']);
});

//task default gulp
gulp.task('default', ['sass', 'watch']);