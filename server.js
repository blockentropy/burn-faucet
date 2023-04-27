const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database.');
});

app.post('/input', (req, res) => {
    const input = req.body.input;
    const query = 'SELECT * FROM your_table WHERE input_column = ?';

    db.query(query, [input], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            const insertQuery = 'INSERT INTO your_table (input_column) VALUES (?)';
            db.query(insertQuery, [input], (err, result) => {
                if (err) throw err;
                res.send(`Input '${input}' has been added to the database.`);
            });
        } else {
            res.send(`Input '${input}' already exists in the database.`);
        }
    });
});

app.use(express.static(__dirname));



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

