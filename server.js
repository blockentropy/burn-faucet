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
        prefix: 'terra',
    },
});


const lcd = new LCDClient({
    'pisco-1': {
        lcd: 'https://blockentropy.dev',
        chainID: 'pisco-1',
        gasAdjustment: 2,
        gasPrices: { uluna: '28.325uluna' },
        prefix: 'terra',
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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/input', async (req, res) => {
    const hash = req.body.hash;
    try {
        const txInfo = await lcdcolumbus.tx.txInfo(hash, 'columbus-5');

        // Extract the height
        const height = txInfo.height;

        // Extract the txhash
        const txhash = txInfo.txhash;

        // Extract the amount value
        const amountValue = txInfo.raw_log.match(/"amount","value":"(\d+uluna)"/)[1];

        // Extract the key spender value
        const spenderValue = txInfo.raw_log.match(/"spender","value":"(terra[\w]+)/)[1];

            // Extract the memo
            const memo = txInfo.tx.body.memo;

            console.log("Height:", height);
            console.log("TxHash:", txhash);
            console.log("Amount Value:", amountValue);
            console.log("Spender Value:", spenderValue);
            console.log("Memo:", memo);
            const input = req.body.input;
            const query = 'SELECT * FROM your_table WHERE input_column = ?';

            /*db.query(query, [input], (err, results) => {
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
    });*/
            res.send('Data processed.');
        } catch (error) {
            console.error('Error fetching transaction info:', error);
            res.status(500).send('Error fetching transaction info.');
        }
});

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        app.use(express.static(__dirname));

        const port = 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

