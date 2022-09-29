const express = require('express');
const pessoas = require('../routes/PessoasRoutes');

module.exports = app => {
    app.use(
        express.json(),
        pessoas
    );
}


