import express from 'express';

import mysql2 from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = 3002;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const guestbook = [];

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

app.get('/db-test', async(req, res) => {
    try {
        const guestbook_contacts = await pool.query('SELECT * FROM contacts');
        res.send(guestbook_contacts[0]);
    } catch (err) {
        console.log('Database error: ', err);
    }
});

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