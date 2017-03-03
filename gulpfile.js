'use strict';
//npm requires
var gulp 		          = require('gulp'),
    concat            = require('gulp-concat'),
    jshint            = require('gulp-jshint'),
    webserver         = require('gulp-webserver');


//the tasts to run, lint js, compile js and watch for changes
gulp.task('default', [], function() {
    gulp.start('jshint', 'scripts', 'watch', 'webserver');
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


gulp.task('webserver', [ ], function() {
  return gulp.src('./')
    .pipe(webserver({
      livereload: true,

      //Change this value to "True" to be taken to a directory listing upon running gulp
      directoryListing: {
          enable: true,
          path: 'dist'
      },
      open: true
    }));
});


//watch the js files for changes!
gulp.task('watch', function() {
  gulp.watch('./css/*.css'),[];
  gulp.watch('./js/**/*.js', ['jshint', 'scripts']);
});
