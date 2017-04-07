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
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./js/'));
});

//Generates a live reloading web server
gulp.task('webserver', [ ], function() {
  //sets the base directory as the currnt level
  return gulp.src('./')
  //creates a webserver
    .pipe(webserver({
      //sets live reload to true
      livereload: true,

      //Change this value to "True" to be taken to a directory listing upon running gulp
      directoryListing: {
          enable: true,
          //specify the path of the direcotry to list
          path: './'
      },
      //opens the browser automatically
      open: true
    }));
});


//watch the js files for changes!
gulp.task('watch', function() {
  gulp.watch('./css/*.css'),[];
  gulp.watch('./js/**/*.js', ['jshint', 'scripts']);
});
