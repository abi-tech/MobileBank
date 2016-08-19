// var gulp = require('gulp');
// var coffee = require('gulp-coffee'); //还要学coffee的语法 简直麻烦
// var concat = require('gulp-concat'); //合并
// var uglify = require('gulp-uglify'); //压缩
// var imagemin = require('gulp-imagemin'); //图片压缩
// var sourcemaps = require('gulp-sourcemaps');
// var del = require('del');

// var paths = {
// 	sass: 'client/sass/**/*.scss',
// 	jslib: ['client/jslib/jquery.swiper.js','client/jslib/jquery.backtop.js'],
//   scripts: ['client/js/**/*.js', '!client/external/**/*.js'],
//   images: 'client/img/**/*'
// };

// // Not all tasks need to use streams
// // A gulpfile is just another node program and you can use any package available on npm
// gulp.task('clean', function() {
//   // You can use multiple globbing patterns as you would with `gulp.src`
//   return del(['build']);
// });

// gulp.task('scripts', ['clean'], function() {
//   // Minify and copy all JavaScript (except vendor scripts)
//   // with sourcemaps all the way down
//   return gulp.src(paths.scripts)
//     .pipe(sourcemaps.init())
//       //.pipe(coffee())
//       .pipe(uglify())
//       .pipe(concat('all.min.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/js'));
// });

// // Copy all static images
// gulp.task('images', ['clean'], function() {
//   return gulp.src(paths.images)
//     // Pass in options to the task
//     .pipe(imagemin({optimizationLevel: 5}))
//     .pipe(gulp.dest('build/img'));
// });

// // Rerun the task when a file changes
// gulp.task('watch', function() {
//   gulp.watch(paths.scripts, ['scripts']);
//   gulp.watch(paths.images, ['images']);
// });

// // The default task (called when you run `gulp` from cli)
// gulp.task('default', ['watch', 'scripts', 'images']);

// //tablet destop mobile

var gulp = require('gulp');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');

var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var rename = require('gulp-rename');

var paths = {
	styles: ['client/css/**/*.scss'],
	scripts: ['client/js/**/*.js'],
	images: 'client/img/**/*'
};

gulp.task('clean', function () {
	return del(['build']);
});

gulp.task('scripts', ['clean'], function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      //.pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', ['clean'], function () {
	return gulp.src(paths.images)
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('build/img'));
});

gulp.task('styles', ['clean'], function () {
	return gulp.src(paths.styles)
		.pipe(sass())
		.pipe(concat('all.min.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('build/css'));
});

gulp.task('connect', function() {
   connect.server({
    name: 'mobile bank',
    root: ['client'],
    port: 9000,
    livereload: true
  });
});

gulp.task('html', function () {
  // gulp.src(options.src)
  //   .pipe(gulp.dest(options.dest));

  gulp.src('./client/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./client/*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);

//javascript 合并-->压缩
//images 合并 雪碧图
//       压缩 图片质量
//sass 合并 压缩
//html
