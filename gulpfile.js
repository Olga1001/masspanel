var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng = require('gulp-tinypng-compress'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    htmlImport = require('gulp-html-import'),
    sourcemaps = require('gulp-sourcemaps');


gulp.task('import', function () {
    return gulp.src('app/components/pages/**/*.html')
        .pipe(rename({dirname: ''}))
        .pipe(htmlImport('app/components/'))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream());
});
gulp.task('sass',function(){
  return gulp.src('app/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('tiny', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg)')
    .pipe(cache(tinypng({
      key: 'p9hZWdpVCqFgzxVSTKkTt7K2xwvC0ll6',
      sigFile: 'images/.tinypng-sigs',
      sameDest: true,
      log: true
    })));
});

gulp.task('img', ['tiny'], function(){
  return gulp.src('app/img/**/*.+(svg|ico)')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    })));
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(['app/sass/**/*.sass', 'app/components/pages/**/*.sass'], ['sass']);
    // gulp.watch('app/*.html', browserSync.reload);
    gulp.watch(['app/components/*.html', 'app/components/pages/**/*.html'], ['import'], browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
