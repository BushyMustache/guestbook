import express from 'express';

const app = express();

const PORT = 3002;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const guestbook = [];

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/contact-form', (req, res) => {
    res.render('form');
});

app.post('/submit-form', (req, res) => {
    
    // Create a JSON object to store the order data
    const guest = {
        fname: req.body.fname,
        lname: req.body.lname,
        job: req.body.job,
        company: req.body.company ? req.body.company : "none",
        url: req.body.url ? req.body.url : "none",
        mail: req.body.mail,
        email: req.body.email ? req.body.email : "none",
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message ? req.body.message : "none",
        format: req.body.format,
        timestamp: new Date()
    };

    // Add order object to orders array
    guestbook.push(guest);
    
    res.render('confirmation', { guest });
});

app.get('/admin', (req, res) => {
    res.render('admin', { guestbook });
});

app.listen(PORT, () => {
    console.log(`Server is running at 
        http://localhost:${PORT}`);
});