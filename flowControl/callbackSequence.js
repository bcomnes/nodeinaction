setTimeout(function() {
    console.log('I execute first.');
    setTimeout(function() {
        console.log('I excetute next.');
        setTimeout(function() {
            console.log('I excetute last.');
        }, 100);
    }, 500);
}, 1000);