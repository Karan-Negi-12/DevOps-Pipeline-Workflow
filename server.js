const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const mysql = require('mysql2');
const dbConfig = require('./db-config');

const pool = mysql.createPool(dbConfig);

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (path === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (path === '/style.css') {
        fs.readFile('style.css', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading style.css');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (path === '/script.js') {
        fs.readFile('script.js', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading script.js');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (path === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { name, dob, city, email } = JSON.parse(body);
            const query = 'INSERT INTO entries (name, dob, city, email) VALUES (?, ?, ?, ?)';
            pool.query(query, [name, dob, city, email], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        res.writeHead(409, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Email already exists.' }));
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Database error.' }));
                    }
                } else {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Entry submitted successfully!' }));
                }
            });
        });
    } else if (path === '/winner' && req.method === 'GET') {
        const query = 'SELECT * FROM entries ORDER BY RAND() LIMIT 1';
        pool.query(query, (err, results) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Database error.' }));
            } else if (results.length > 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ winner: results[0] }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'No entries yet.' }));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
