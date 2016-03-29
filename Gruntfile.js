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
                    "./dist/js/app.js": ["./src/js/*.js"]
                }
            }
        },
        copy: {
            main: {
                files: [{
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
                },
                {
                    expand: true,
                    cwd: "src",
                    src: ["*.html"],
                    dest: "./dist/"
                },
                {
                    expand: true,
                    cwd: "src",
                    src: ["font/*"],
                    dest: "./dist/"
                }]
            }
        },
        watch: {
            scripts: {
                files: ["./src/**"],
                tasks: ["build"]
            }
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
        },
        replace: {
            dist: {
                options: {
                    type: 'RegExp',
                    patterns: [
                        {
                            match: /app\.js/,
                            replacement: 'app.min.js'
                        },
                        {
                            match: /\.css/,
                            replacement: '.min.css'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['src/index.html'], dest: 'dist/'}
                ]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask("default", ["build", "watch"]);
    grunt.registerTask("build", ["browserify","copy", "uglify", "replace", "cssmin"]);
    grunt.registerTask("clean", ["clean"]);
};