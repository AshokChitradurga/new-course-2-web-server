var express = require('express');
var app = express();
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('ToUpper', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    next();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        PageTitle: 'Home Page',
        WelcomeMsg: 'Welcome to my website'
    });
})

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        PageTitle: 'About Page'
        //CurrentYear: new Date().getFullYear()
    });
});

app.listen(3500, (error, response) => {
    console.log("server running....");
});