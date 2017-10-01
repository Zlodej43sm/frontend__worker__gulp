import gulp from 'gulp';
import tap from 'gulp-tap';
import sass from 'gulp-sass';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import newer from 'gulp-newer';
import uglify from 'gulp-uglify';
import buffer from 'gulp-buffer';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import es2015 from 'babel-preset-es2015';

const themePath = '../theme/';
const src = {
    scripts: '/js/source',
    styles: '/scss'
};
const dest = {
    scripts: '/js/compiled',
    styles: '/css'
};

// Compile & build bundle 'ES6' into pure 'ES5'script, using Babel
gulp.task('scripts', () => {
    gulp.src(`${themePath}${src.scripts}/**/*.js`, {read: false})
        // .pipe(newer(`${themePath}${dest.scripts}`))
        .pipe(tap(function (file) {
            gutil.log('bundling ' + file.path);
            file.contents = browserify(file.path, {debug: true})
                .transform(babelify, {presets: [es2015]})
                .bundle();
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${themePath}${dest.scripts}`));
});

// Add scripts watcher
gulp.task('scripts:w', ['scripts'], () => {
    gulp.watch(`${themePath}${src.scripts}/**/*.js`, ['scripts'])
        .on('change', (file) => {
            console.log(`File ${file.path} was ${file.type}, running 'scripts' task...`);
        });
});

// Clean scripts destination directory
gulp.task('scripts:c', () => {
    gulp.src(themePath + dest.scripts)
        .pipe(clean({force: true}));
});

// Compile & build 'css', using SASS source
gulp.task('styles', () => {
    gulp.src(`${themePath}${src.styles}/**/*.scss`)
        .pipe(sass({includePaths: 'bower_components/compass-mixins/lib', outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(`${themePath}${dest.styles}/`));
});

// Add styles watcher
gulp.task('styles:w', ['styles'], () => {
    gulp.watch(`${themePath}${src.styles}/**/*.scss`, ['styles'])
        .on('change', (file) => {
            console.log(`File ${file.path} was ${file.type}, running 'styles' task...`);
        });
});


gulp.task('watch', ['styles:w', 'scripts:w']);
gulp.task('build', ['clean', 'styles', 'scripts']);
gulp.task('default', ['build', 'watch']);