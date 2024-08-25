import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ZoomAuth() {
  const clientID = 'TCf3V1BOQbuf_v8XjLemUw';
  const clientSecret = 'spqmMeJvrSUE2CmO9fp0BAKFccn70nHs';
  const redirectUri = encodeURIComponent('https://9f44-2401-4900-1cbd-61d1-44a2-7e4f-6011-81d.ngrok-free.app/auth');
  const zoomOAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}`;
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
  
    if (code) {
      fetch('https://9f44-2401-4900-1cbd-61d1-44a2-7e4f-6011-81d.ngrok-free.app/getZoomToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Access Token:', data.access_token);
          // Use the access token
        })
        .catch(error => console.error('Error:', error));
    }
  }, [location]);
  

  return (
    <div>
      <h1>Pepsales</h1>
      <a href={zoomOAuthUrl}>Authorize Zoom</a>
    </div>
  );
}

export default ZoomAuth;
