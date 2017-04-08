const express = require('express');

const app = express();

app.listen(3000, function () {
    console.log('ayy its ready to go yo');
    app.set('ready', true);
    app.emit('app:ready');
});
