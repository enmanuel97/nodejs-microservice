const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');

const app = express();

app.engine('handlebars', 
    exphbs.engine({
        defaultLayout: 'layout'
    })
);

app.set('view engine', 'handlebars');

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes());

app.listen(5000, () => {
	console.log('Server started on port 5000');
});