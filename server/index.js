const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000; 

app.use(cors());

app.get('/api/posts', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
