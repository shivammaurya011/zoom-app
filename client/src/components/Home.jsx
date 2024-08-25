import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then(response => {
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Welcome to the Zoom App</h1>
      <div>
        <h2>Fetched Data:</h2>
        <ul>
          {data.length > 0 ? (
            data.map(item => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))
          ) : (
            <p>No data available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home