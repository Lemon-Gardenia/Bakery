const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");

gulp.task("html",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("dist")).pipe(connect.reload());
});

gulp.task("sass",function(){
	gulp.src("css/*.css")
	.pipe(sass())
	.pipe(gulp.dest("dist/css")).pipe(connect.reload());
});

gulp.task("img",function(){
	gulp.src("img/*.png")
	.pipe(gulp.dest("dist/img")).pipe(connect.reload());
});

gulp.task("js",function(){
	gulp.src("js/*.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename({
		suffix:".min",
		extname:".js"
	}))
	.pipe(gulp.dest("dist/js")).pipe(connect.reload());
});

gulp.task("build",["html","sass","img","js"]);

gulp.task("watch",function(){
	gulp.watch(["*.html","sass/*.css","img/*.png","js/*.js"],["html","sass","img","js"]);
})

gulp.task("server",function(){
	connect.server({
		root:'dist',
		livereload:true 
	});
})

gulp.task("default",["build","server","watch"]);

