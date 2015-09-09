/**
 * Created by lhunker on 9/8/15.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['*.js', 'scripts/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);

};