const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/getZoomToken', async (req, res) => {
  const code = req.body.code;
  const clientID = 'TCf3V1BOQbuf_v8XjLemUw';
  const clientSecret = 'spqmMeJvrSUE2CmO9fp0BAKFccn70nHs';
  const redirectUri = 'https://9f44-2401-4900-1cbd-61d1-44a2-7e4f-6011-81d.ngrok-free.app/auth';

  const tokenUrl = 'https://zoom.us/oauth/token';
  const authHeader = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post(tokenUrl, new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }), {
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
