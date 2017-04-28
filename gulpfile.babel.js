const gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	wiredep = require('wiredep').stream,
	del = require('del'),
	sequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('pug', () => {
	return gulp.src('src/pug/*.pug')
		.pipe($.pug({
			pretty: '\t'
		}))
        .pipe(wiredep({
            directory: './src/bower_components',
            src: ['src/pug/layouts/*.pug'],
            pwd: './src'
        }))
		.pipe(gulp.dest('src'));
});

gulp.task('pug:watch', ['pug'], reload);

gulp.task('watch:pug', () => {
	gulp.watch('src/**/*.pug', ['pug']);
});

gulp.task('scss',  () => {
	return gulp.src('src/assets/scss/app.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sass({compress:false}))
		.pipe($.autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('src/assets/css/'));
});
gulp.task('watch:scss', ['scss'], reload);

gulp.task('scss:watch', () => {
	gulp.watch('src/assets/scss/**/*', ['scss'], reload);
});



gulp.task('js',  () => {
	return gulp.src('src/assets/es6/app.js')
		.pipe($.babel({
			presets: ['es2015']
		}))
		//.pipe( $.uglify().on('error', e => console.log(e) ) )
		.pipe( gulp.dest('src/assets/js'));
});

gulp.task('js:watch', ['js'], reload);

gulp.task('bower',  () => {
  gulp.src('src/*.html')
    .pipe(wiredep({
    	directory: 'src/bower_components'
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('bower:watch', () => {
	gulp.watch('bower.json', ['bower'], reload)
});

gulp.task('html',  () => {
	return gulp.src('src/*.html')
		.pipe($.useref(/*{
		    transformPath: function (filePath) {
                if(filePath.indexOf('http') === -1){
                    return filePath.replace('../', '')
                }
            }
		}*/))
		//.pipe($.if('*.js', $.babel()))
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.cleanCss()))
		.pipe(gulp.dest('dist'));
});

gulp.task('html:source',  () => {
	return gulp.src('src/*.html')
		.pipe($.useref())
		.pipe(gulp.dest('dist-source'));
});

gulp.task('clean',  () => {
	del(['dist']).then(paths => {
	    console.log('Deleted files and folders:\n', paths.join('\n'));
	});
});

gulp.task('dev', () => {
	gulp.watch('src/assets/scss/**/*.scss', ['scss']);
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('bower.json', ['bower']);
	gulp.watch('src/assets/es6/**/*.js', ['js']);
});

gulp.task('dist', cb => {
	sequence( 'clean', 'pug', 'scss', 'js' , 'bower', 'assets', 'html', cb);
});

gulp.task('dist:src', cb => {
	sequence( 'clean', 'pug', 'scss', 'js' , 'bower', 'assets:src', 'html:source', 'dist.server_src', cb);
});

gulp.task('dist.server', server);
gulp.task('dist.server_src', server_src);

gulp.task('assets', function () {
	return gulp.src(['src/assets/**/*', '!src/assets/{js,css}/*'])
		.pipe(gulp.dest('dist/assets'));
});

gulp.task('assets:src', function () {
	return gulp.src(['src/assets/**/*', '!src/assets/{js,css}/*'])
		.pipe(gulp.dest('dist-source/assets'));
});

gulp.task('default', cb => {
    sequence( 'clean', 'pug', 'scss', 'js' , 'bower', 'assets', 'html', 'dist.server', cb);
});

function pug() {
    return gulp.src('src/pug/*.pug')
        .pipe($.pug({
            pretty: '\t'
        }))
        .pipe(wiredep({
            directory: 'src/bower_components',
            src: ['src/pug/layouts/*.pug']
        }))
        .pipe(gulp.dest('src'));
}

function scss() {
    return gulp.src('src/assets/scss/app.scss')
        .pipe($.sourcemaps.init())
        .pipe($.scss({compress:false}))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('src/assets/css/'));
}

function javascript() {
    return gulp.src('src/assets/js/app.js')
        .pipe($.babel({
            presets: ['es2015']
        }))
        //.pipe( $.uglify().on('error', e => console.log(e) ) )
        .pipe( gulp.dest('dist/assets/js'));
}

function watch() {
    gulp.watch('src/assets/scss/**/*.scss', ['watch:scss']);
    gulp.watch('src/**/*.pug', ['pug:watch']);
    gulp.watch('src/assets/es6/**/*.js', ['js:watch']);
	gulp.watch('bower.json', ['bower:watch']);
}

function server() {
    browserSync({server:'./src', port: 3000});
    watch();
}
function server_src() {
    browserSync({server:'./dist-source'});
}