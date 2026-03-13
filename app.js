import express from 'express';

import mysql2 from 'mysql2';

import dotenv from 'dotenv';

import {validateForm} from './validation.js';

dotenv.config();

const app = express();

const PORT = 3002;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

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

app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});
app.post('/submit-form', async (req, res) => {
    
    const guest = req.body;

    const valid = validateForm(guest);
    if (!valid.isValid) {
        res.render('form', {errors: valid.errors});
        return;
    }

    const firstName = guest.fname || null;
    const lastName = guest.lname || null;
    const job = guest.job || null;
    const company = guest.company || null;
    const url = guest.url || null;
    const mail = guest.mail || null;
    const email = guest.email || null;
    const meet = guest.meet || null;
    const other = guest.other || null;
    const message = guest.message || null;
    const format = guest.format || null;

    const params = [
        firstName,
        lastName,
        job,
        company,
        url,
        mail,
        email,
        meet,
        other,
        message,
        format
    ];

    const sql = `INSERT INTO contacts (fname, lname, job,
                 company, url, mail, email, meet, other, 
                 message, format)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await pool.execute(sql, params);
    console.log("Contact inserted with ID: ", result[0].insertId);

    res.render('confirmation', { guest });
});

app.get('/admin', async (req, res) => {

    let sql = "SELECT * FROM contacts ORDER BY fname";
    const guestbook = await pool.query(sql);

    res.render('admin', { guestbook: guestbook[0] });
});

app.listen(PORT, () => {
    console.log(`Server is running at 
        http://localhost:${PORT}`);
});