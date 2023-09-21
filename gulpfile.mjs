import gulp from 'gulp';
import webpack from 'webpack-stream';
import image from 'gulp-image';
import cleanCSS from 'gulp-clean-css';
import browsersync from 'browser-sync';
import tailwindcss from 'tailwindcss';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';

const dist = './dist';

gulp.task('copy-html', () => {
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task('build-js', () => {
  return gulp
    .src('./src/js/script.js')
    .pipe(gulp.dest(dist + '/js'))
    .pipe(browsersync.stream());
});

gulp.task('copy-assets', () => {
  gulp.src('./src/assets/icons/**/*.*').pipe(gulp.dest(dist + '/assets/icons'));

  return gulp
    .src('./src/assets/img/**/*.*')
    .pipe(image())
    .pipe(gulp.dest(dist + '/assets/img'))
    .pipe(browsersync.stream());
});

gulp.task('build-css-min', () => {
  return gulp
    .src('./src/css/styles.css')
    .pipe(postcss([tailwindcss, autoprefixer]))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(gulp.dest(dist + '/css'))
    .pipe(browsersync.stream());
});

gulp.task('watch', () => {
  browsersync.init({
    server: './dist/',
    browser: 'google chrome',
    port: 3001,
    notify: true,
  });

  gulp.watch('./src/index.html', gulp.parallel('copy-html'));
  gulp.watch('./src/assets/**/*.*', gulp.parallel('copy-assets'));
  gulp.watch('./src/img/**/*.*', gulp.parallel('copy-assets'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('build-js'));
  gulp.watch(
    ['./src/css/styles.css', 'tailwind.config.js', './src/index.html'],
    gulp.parallel('build-css-min')
  );
});

gulp.task(
  'build',
  gulp.parallel('copy-html', 'copy-assets', 'build-js', 'build-css-min')
);

gulp.task('prod', () => {
  gulp.src('./src/index.html').pipe(gulp.dest(dist));
  gulp.src('./src/assets/img/**/*.*').pipe(gulp.dest(dist + '/assets/img'));
  gulp.src('./src/assets/icons/**/*.*').pipe(gulp.dest(dist + '/assets/icons'));

  gulp
    .src('./src/js/scipt.js')
    .pipe(
      webpack({
        mode: 'production',
        output: {
          filename: 'script.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: 'usage',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist + '/js'));

  return gulp
    .src('./src/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('default', gulp.parallel('watch', 'build'));
