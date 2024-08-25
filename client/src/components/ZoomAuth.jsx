import React from 'react'

function ZoomAuth() {
    const clientID = 'TCf3V1BOQbuf_v8XjLemUw';
    const redirectUri = encodeURIComponent('https://zoom-app-snowy.vercel.app/auth');
    const zoomOAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}`;
  return (
    <div>
      <h1>Zoom App</h1>
      <a href={zoomOAuthUrl}>Authorize Zoom</a>
    </div>
  )
}

export default ZoomAuth
