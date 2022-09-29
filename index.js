const express = require('express');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;

routes(app);

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;