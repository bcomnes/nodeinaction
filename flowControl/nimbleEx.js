var flow = require('nimble');

flow.series([
    function (callback) {
        setTimeout(function() {
            console.log('I excecute first.');
            callback();
        }, 1000);
    },
    function (callback) {
        setTimeout(function() {
            console.log('I excecute next.');
            callback();
        }, 500);
    },
    function (callback) {
        setTimeout(function() {
            console.log('I excecute last.');
            callback();
        }, 100);
    },
    ]);