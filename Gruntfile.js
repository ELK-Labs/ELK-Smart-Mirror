module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {presets: ["es2015"]}]
                    ]
                },
                files: {
                    // if the source file has an extension of es6 then
                    // we change the name of the source file accordingly.
                    // The result file's extension is always .js
                    "./dist/js/app.js": ["./src/js/*.js"]
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: ["**/*.html"],
                    dest: "./dist/"
                },
                {
                    expand: true,
                    cwd: "src",
                    src: ["css/*.css"],
                    dest: "./dist/"
                },
                {
                    expand: true,
                    cwd: "src",
                    src: ["js/lib/*.js"],
                    dest: "./dist/"
                }]
            }
        },
        watch: {
            scripts: {
                files: ["./src/**/*.js"],
                tasks: ["browserify"]
            }
        },
        clean :{
            options: {
                "force": true
            },
            dist: ["./dist/**/*"]
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", ["build", "watch"]);
    grunt.registerTask("build", ["browserify","copy"]);
    grunt.registerTask("clean", ["clean"]);
};