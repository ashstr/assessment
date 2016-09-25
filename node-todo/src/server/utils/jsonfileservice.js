module.exports = function() {
    var fs = require('fs');

    function getJsonFromFile(file) {
        console.log("getting data from file");

        function readJsonFileSync(filepath, encoding) {
            if (typeof(encoding) === 'undefined') {
                encoding = 'utf8';
            }
            var file = fs.readFileSync(filepath, encoding);
            try {
                return JSON.parse(file);
            } catch (e) {
                console.error('empty file',e);
                return [];
            }
        }

        function getConfig(file) {
            var filepath = __dirname + file;
            return readJsonFileSync(filepath);
        }

        return getConfig(file);
    }

    function updateJsonIntoFile(file, todos) {
        console.log("updateing Data Into File");
        var filepath = __dirname + file;
        fs.writeFile(filepath, JSON.stringify(todos), "utf8");
    }


    return {
        getJsonFromFile: getJsonFromFile,
        updateJsonIntoFile: updateJsonIntoFile
    };
};
