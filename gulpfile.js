'use strict';
//npm requires
var gulp 		          = require('gulp'),
    concat            = require('gulp-concat'),
    jshint            = require('gulp-jshint');


//the tasts to run, lint js, compile js and watch for changes
gulp.task('default', [], function() {
    gulp.start('jshint', 'scripts', 'watch');
});


//lint the javascript
gulp.task('jshint', function() {
    return gulp.src([
        '/js/seperate/*.js',
    ]).pipe(jshint()
    ).pipe(jshint.reporter('jshint-stylish'));
});

//compile the javascript into one
gulp.task('scripts', function() { 
    return gulp.src([
        './js/seperate/*.js',
    ])
        .pipe(concat('scriptstwo.js'))
        .pipe(gulp.dest('./js/'));
});

//watch the js files for changes!
gulp.task('watch', function() {
  gulp.watch('./js/**/*.js', ['jshint', 'scripts']);
});
