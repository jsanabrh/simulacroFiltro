const express = require('express');
const connectDB = require('./config/database.js');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth.js')

const app = express();
const port = 3001;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(auth.initialize());

app.use('/', routes);

app.listen(port, () => console.log(`Server listening in port http://localhost:${port}`));