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
                files: ["./src/**"],
                tasks: ["browserify", "uglify", "copy"]
            }
        },
        clean :{
            options: {
                "force": true
            },
            dist: ["./dist/**/*"]
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery', 'Moment']
                }
            },
            my_target: {
                files: {
                    'dist/js/app.min.js': ['dist/js/app.js']
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", ["build", "uglify", "watch"]);
    grunt.registerTask("build", ["browserify","copy"]);
    grunt.registerTask("clean", ["clean"]);
};