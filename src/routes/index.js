const express = require('express');

const pessoas = require('./PessoasRoutes');
const niveis = require('./NiveisRoutes');
const turmas = require('./TurmasRoutes');
const matriculas = require('./MatriculasRoutes');

module.exports = app => {
    app.use(
        express.json(),
        pessoas,
        niveis,
        turmas,
        matriculas
    );
}


