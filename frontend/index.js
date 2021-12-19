const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');

const app = express();

app.engine('handlebars', 
    exphbs.engine({
        defaultLayout: 'layout',
        helpers: require('./helpers')
    })
);

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes());

app.listen(3000, () => {
	console.log('FrontEnd App started on port ' + 3000);
});

// app.listen(process.env.PORT, () => {
// 	console.log('FrontEnd App started on port ' + process.env.PORT);
// });