module.exports = function() { 
    var root = './';
    var server = './src/server/';
    var test='./src/test';

    var config = {
        /**
         * Files paths
         */
        alljs: [
            './src/**/*.js',
            './*.js'
        ],        
        root: root,
        server: server,
        test:test,       

        packages : [
            './package.json',
            './bower.json'
        ],

        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js'

    };

    return config;

    ////////////////

}