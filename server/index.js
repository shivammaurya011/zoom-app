const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000; 

// CORS configuration to allow Zoom app origin and iframe support
app.use(cors({
    origin: ['https://zoom-app-snowy.vercel.app/', 'https://zoom.us'], // Update with your actual Zoom app URL
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.get('/api/posts', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
