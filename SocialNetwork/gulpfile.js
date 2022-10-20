"use strict";

import gulp from 'gulp';
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import merge from 'merge-stream';
import del from 'del';
import fs from 'fs';
var bundleconfig = JSON.parse(fs.readFileSync('./bundleconfig.json'));

var regex = {
    css: /\.css$/,
    js: /\.js$/
};

function getBundles(regexPattern) {
    return bundleconfig.filter(function (bundle) {
        return regexPattern.test(bundle.outputFileName);
    });
}

function clean() {
    var files = bundleconfig.map(function (bundle) {
        return bundle.outputFileName;
    });

    return del(files);
}
gulp.task(clean);

function minJs() {
    var tasks = getBundles(regex.js).map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName))
            .pipe(
                babel({
                    presets: ['@babel/env'], // 使用預設環境編譯
                    minified: bundle.minify.enabled,
                })
            )
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
}
//
//function minJs() {
//    var tasks = getBundles(regex.js).map(function (bundle) {
//        return gulp.src(bundle.inputFiles, { base: "." })
//            .pipe(concat(bundle.outputFileName))
//            .pipe(uglify())
//            .pipe(gulp.dest("."));
//    });
//    return merge(tasks);
//}
gulp.task(minJs);

function minCss() {
    var tasks = getBundles(regex.css).map(function (bundle) {
        return bundle.minify.enabled ?
            gulp.src(bundle.inputFiles, { base: "." }).pipe(concat(bundle.outputFileName)).pipe(cssmin()).pipe(gulp.dest(".")) :
            gulp.src(bundle.inputFiles, { base: "." }).pipe(concat(bundle.outputFileName)).pipe(gulp.dest("."));
    });
    return merge(tasks);
}
gulp.task(minCss);

gulp.task("min", gulp.series(clean, minJs, minCss));