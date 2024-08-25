const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Load your Zoom OAuth credentials
const clientID = 'TCf3V1BOQbuf_v8XjLemUw';
const clientSecret = 'spqmMeJvrSUE2CmO9fp0BAKFccn70nHs';
const redirectUri = 'https://zoom-app-snowy.vercel.app/auth';

let accessToken = '';

app.get('/auth', async (req, res) => {
  const authCode = req.query.code;
  if (!authCode) {
    console.log('Authorization code is missing');
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    const tokenResponse = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirectUri,
      },
      auth: {
        username: clientID,
        password: clientSecret,
      },
    });
    accessToken = tokenResponse.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.message });
  }
});

// New /user endpoint to fetch Zoom user data
app.get('/user', async (req, res) => {
  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is missing' });
  }

  try {
    const userInfoResponse = await axios.get('https://api.zoom.us/v2/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(userInfoResponse.data);
  } catch (error) {
    console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
