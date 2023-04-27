import { LCDClient } from '@terra-money/feather.js';
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const lcdcolumbus = new LCDClient({
    'columbus-5': {
	lcd: 'https://terra-classic-lcd.publicnode.com',
	chainID: 'columbus-5',
	gasAdjustment: 5,
	gasPrices: { uluna: '28.325uluna' },
	previx: 'terra',
    },

});


const lcd = new LCDClient({
    'pisco-1': {
	lcd: 'https://blockentropy.dev',
	chainID: 'pisco-1',
	gasAdjustment: 2,
	gasPrices: { uluna: '28.325uluna' },
	previx: 'terra',
    },

});


/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database'
});*/

//db.connect((err) => {
//    if (err) throw err;
//    console.log('Connected to the MySQL database.');
//});

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname));



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

