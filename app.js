import express from 'express';

const app = express();

const PORT = 3002;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

const guestbook = [];

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
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
        other: req.body.other ? req.body.other : "none",
        message: req.body.message ? req.body.message : "none",
        format: req.body.format,
        timestamp: new Date()
    };

    // Add order object to orders array
    guestbook.push(guest);
    
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req, res) => {
    res.send(guestbook);
});

app.listen(PORT, () => {
    console.log(`Server is running at 
        http://localhost:${PORT}`);
});