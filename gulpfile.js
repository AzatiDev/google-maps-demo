var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    zip = require('gulp-zip'),
    cssmin = require('gulp-cssmin'),
    copy = require('gulp-copy'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglifyjs');

var develFolder = './dest';

gulp.task('views', function() {
	return gulp.src(['./src/views/**/*.html'], { 'base': './src/' })
		.pipe(gulp.dest(develFolder));
});

gulp.task('source-js', function() {
    return gulp.src(['./src/js/utils/**/*.js', './src/js/*.js', './src/js/controllers/**/*.js', './src/js/services/**/*.js'])
        .pipe(uglify('app.js', {
            mangle: false,
            output: {
                beautify: true
            },
            compress: {
                drop_debugger: false
            }
        }))
        .pipe(gulp.dest(develFolder));
});

gulp.task('libs-js', function() {
	return gulp.src(['./src/libs/**/*.js'], { 'base': './src/' })
		.pipe(gulp.dest(develFolder));
});

gulp.task('images', function() {
	return gulp.src(['./src/img/**/*'], { 'base': './src/' })
        .pipe(imagemin())
        .pipe(gulp.dest(develFolder));
});

gulp.task('css', function() {
	return gulp.src(['./src/css/**/*.css'])
        .pipe(cssmin()).on("error", function(err) { console.log("Error : " + err.message); })
		.pipe(concat('app.css'))
        .pipe(gulp.dest(develFolder));
});

gulp.task('root-page', function() {
    return gulp.src(['./src/index.html', './src/data.json'], { 'base': './src/' })
		.pipe(gulp.dest(develFolder));
});

gulp.task('connect', function() {
    connect.server({
        root: 'dest',
        port: 8800,
        livereload: true
    });

    console.log('Server listening on http://localhost:8880');
});

// launching development tasK: gulp watch
gulp.task('watch', function() {
    // prepare project
    gulp.start('views', 'source-js', 'libs-js', 'images', 'css', 'root-page');

    watch('./src/views/**/*', function() { 
        gulp.start('views');
    });
    watch('./src/js/**/*', function() { 
        gulp.start('source-js');
    });
    watch('./src/libs/**/*', function() {
        gulp.start('libs-js');
    });
    watch('./src/img/**/*', function() {
        gulp.start('images');
    });
    watch('./src/css/**/*', function() {
		console.log("css changed!");
        gulp.start('css');
    });
    watch('./src/index.html', function() {
        gulp.start('root-page');
    });
    watch('./src/data.json', function() {
        gulp.start('root-page');
    });
});

var buildDestFolder = 'build';

gulp.task('build_css', function() {
    return gulp.src(['./src/css/**/*.css'])
        .pipe(cssmin())
		.pipe(concat('app.css'))
        .pipe(gulp.dest(buildDestFolder));
});

gulp.task('build_pages', function() {
    return gulp.src(['./src/views/**/*.html'], { 'base': './src/' })
		.pipe(gulp.dest(buildDestFolder));
});

gulp.task('build_libs', function() {
    return gulp.src(['./src/libs/**/*.js'], { 'base': './src/' })
		.pipe(gulp.dest(buildDestFolder));
});

gulp.task('build_js', function() {
    //return gulp.src(['./src/js/**/*.js'], { 'base': './src/' })
    //.pipe(gulp.dest(buildDestFolder));
    return gulp.src(['./src/js/utils/**/*.js', './src/js/*.js', './src/js/controllers/**/*.js', './src/js/services/**/*.js'])
        .pipe(uglify('app.js', {
            mangle: false,
            output: {
                beautify: false,
                max_line_len: 1000
            },
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest(buildDestFolder));
});

gulp.task('build_img', function() {
    return gulp.src(['./src/img/**/*'], { 'base': './src/' })
        .pipe(imagemin())
        .pipe(gulp.dest(buildDestFolder));
});

gulp.task('build_files', function() {
    return gulp.src(['./src/index.html', './src/config.xml', './src/icon.png', './src/data.json'], { 'base': './src/' })
		.pipe(gulp.dest(buildDestFolder));
});

gulp.task('build_res', function() {
    return gulp.src(['./src/res/**/*'], { 'base': './src/' })
  .pipe(gulp.dest(buildDestFolder));
});

gulp.task('compress_build', ['build_css', 'build_pages', 'build_libs', 'build_js', 'build_img', 'build_files', 'build_res'], function() {
    return gulp.src(buildDestFolder + '/**/*')
        .pipe(zip('google_maps_demo.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['build_css', 'build_pages', 'build_libs', 'build_js', 'build_img', 'build_files', 'build_res', 'compress_build']);
gulp.task('default', ['connect', 'watch']);