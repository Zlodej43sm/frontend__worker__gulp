import babelify from 'babelify';
import browserify from 'browserify';
import gulp from 'gulp';
import tap from 'gulp-tap';
import sass from 'gulp-sass';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import uglify from 'gulp-uglify';
import buffer from 'gulp-buffer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

const NODE_ENV = process.env.NODE_ENV || 'development',
    PROJECT_PATH = 'projectPath',
    STYLES_SRC = '/scss',
    STYLES_DEST = '/css',
    SCRIPTS_SRC = '/js/source',
    SCRIPTS_DEST = '/js/compiled';

let processors = [
        require("postcss-url")(),
        require("postcss-cssnext")(),
        require("cssnano")({ autoprefixer: false }),
        require("postcss-browser-reporter")(),
        require("postcss-reporter")()
    ],
    presets = [
        require("babel-preset-env")
    ];

// Compile & build bundle 'ES6' into pure 'ES5'script, using Babel
gulp.task('scripts', () => {
    let scripts = gulp.src(`${PROJECT_PATH}${SCRIPTS_SRC}/**/*.js`, {read: false})
        .pipe(tap(function (file) {
            gutil.log('bundling ' + file.path);
            file.contents = browserify(file.path, {debug: true})
                .transform(babelify, {presets: presets})
                .bundle();
        }))
        .pipe(buffer());

    if (NODE_ENV === 'development') {
        scripts.pipe(
                sourcemaps.init(
                    {
                        loadMaps: true
                    }
                )
            )
            .pipe(sourcemaps.write('.'));
    }

    if (NODE_ENV === 'production') {
        scripts.pipe(uglify())
    }

    scripts.pipe(gulp.dest(`${PROJECT_PATH}${SCRIPTS_DEST}`));
});

// Add scripts watcher
gulp.task('scripts:w', ['scripts'], () => {
    gulp.watch(`${PROJECT_PATH}${SCRIPTS_SRC}/**/*.js`, ['scripts'])
        .on('change', (file) => {
            console.log(`File ${file.path} was ${file.type}, running 'scripts' task...`);
        });
});

// Clean scripts destination directory
gulp.task('scripts:c', () => {
    gulp.src(PROJECT_PATH + SCRIPTS_DEST)
        .pipe(clean({force: true}));
});

// Compile & build 'css', using SASS source
gulp.task('styles', () => {
    let styles = gulp.src(`${PROJECT_PATH}${STYLES_SRC}/**/*.scss`)
        .pipe(sass({includePaths: 'bower_components/compass-mixins/lib', outputStyle: 'compressed'}))
        // .pipe(postcss(processors))
        .pipe(autoprefixer());


    if (NODE_ENV === 'development') {
        styles.pipe(
                sourcemaps.init(
                    {
                        loadMaps: true
                    }
                )
            )
            .pipe(sourcemaps.write('.'));
    }

    styles.pipe(gulp.dest(`${PROJECT_PATH}${STYLES_DEST}/`));
});

// Add styles watcher
gulp.task('styles:w', ['styles'], () => {
    gulp.watch(`${PROJECT_PATH}${STYLES_SRC}/**/*.scss`, ['styles'])
        .on('change', (file) => {
            console.log(`File ${file.path} was ${file.type}, running 'styles' task...`);
        });
});


gulp.task('watch', ['styles:w', 'scripts:w']);
gulp.task('build', ['scripts:c', 'styles', 'scripts']);
gulp.task('default', ['build', 'watch']);