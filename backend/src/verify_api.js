const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/hotels',
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        try {
            const parsed = JSON.parse(data);
            console.log('Response Body:', JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log('Response Body:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error.message);
});

req.end();
