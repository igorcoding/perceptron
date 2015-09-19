var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var goServer = require('golang-server-reload');
var process = require('process');

var STATIC_DIR = './static/';

function staticFile(path) {
    return STATIC_DIR + path;
}

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('sass', function () {
    gulp.src(staticFile('sass/**/*.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(staticFile('css')));
});

gulp.task('watch', function () {
    gulp.watch(staticFile('sass/**/*.scss'), ['sass']);
});

gulp.task('scripts', function() {
    return gulp.src(staticFile('js/**/*.js'))
        .pipe(amdOptimize('main', {
            configFile: 'main.js'
        }))
        .pipe(concat('main-bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    var server = new goServer('github.com/igorcoding/perceptron', '.', process.env.GOPATH + '/bin/perceptron');
    server.serve(12345, 8080);
});

gulp.task('default', ['clean', 'sass', 'watch', 'server']);