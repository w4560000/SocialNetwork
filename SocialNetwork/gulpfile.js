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

var nodeRoot = './node_modules/';
var targetPath = './wwwroot/lib/';
var nodePath = [
    'jquery/dist',
    'jquery-ui/dist',
    'lightslider/dist',
    'sweetalert2/dist'
];


var regex = {
    css: /\.css$/,
    js: /\.js$/
};

function getBundles(regexPattern) {
    return bundleconfig.filter((bundle) => regexPattern.test(bundle.outputFileName));
}

function clean() {
    var files = bundleconfig.map((bundle) => bundle.outputFileName);

    return del(files);
}

function cleanLib() {
    return del(targetPath);
}

function installLib() {
    var tasks = nodePath.map(nodePath => gulp.src(nodeRoot + nodePath + '/**/*').pipe(gulp.dest(targetPath + nodePath)));

    return merge(tasks);
}

//function minJs() {
//    var tasks = getBundles(regex.js).map((bundle) =>
//        gulp.src(bundle.inputFiles, { base: "." })
//            .pipe(concat(bundle.outputFileName))
//            .pipe(
//                babel({
//                    presets: ['@babel/env'], // 使用預設環境編譯
//                    minified: bundle.minify.enabled,
//                }))
//            .pipe(gulp.dest(".")));

//    return merge(tasks);
//}

//function minCss() {
//    var tasks = getBundles(regex.css).map((bundle) =>
//            bundle.minify.enabled ?
//                gulp.src(bundle.inputFiles, { base: "." }).pipe(concat(bundle.outputFileName)).pipe(cssmin()).pipe(gulp.dest(".")) :
//            gulp.src(bundle.inputFiles, { base: "." }).pipe(concat(bundle.outputFileName)).pipe(gulp.dest(".")));

//    return merge(tasks);
//}

//gulp.task(clean);
gulp.task('installLib', gulp.series(cleanLib, installLib));
//gulp.task(minJs);
//gulp.task(minCss);
//gulp.task("min", gulp.series(clean, minJs, minCss));