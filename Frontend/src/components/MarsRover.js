import React, { useState } from 'react';
import axios from 'axios';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'; // Import necessary components

const MarsRover = () => {
  const [sol, setSol] = useState(1000); // Default sol (Martian day)
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/mars-rover?sol=${sol||10}`);
      setPhotos(response.data.photos.slice(0,20));
    } catch (err) {
      setError('Error fetching Mars Rover photos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (sol) { // Ensure that sol is valid
      fetchPhotos();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="solInput">Enter Martian Sol (Day):</label>
        <input
          type="number"
          id="solInput"
          value={sol}
          onChange={(e) => setSol(e.target.value)} // Update the sol state
        />
        <button type="submit">Fetch Photos</button>
      </form>

      {loading && <p>Loading photos...</p>}
      {error && <p>{error}</p>}
      
      {/* Display the fetched Mars Rover photos in an ImageList */}
      <ImageList
        sx={{ width: '100%', height: 'auto' }} // Full width and automatic height
        variant="quilted"
        cols={4}
        rowHeight={200}
      >
        {photos.length > 0 ? (
          photos.map((photo) => (
            <ImageListItem key={photo.id} cols={1} rows={1}>
              <img
                src={`${photo.img_src}?w=248&fit=crop&auto=format`} // Adjust URL for responsive display
                srcSet={`${photo.img_src}?w=248&fit=crop&auto=format&dpr=2 2x`} // Responsive image loading
                alt={`Mars rover photo taken on sol ${sol}`}
                loading="lazy"
              />
              <ImageListItemBar
                title={`Mars Rover Photo`} // Title overlay
                subtitle={`Taken on Sol ${sol}`} // Subtitle overlay
                position="bottom" // Position the bar at the bottom of the image
                sx={{
                  background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
                  color: 'white' // Text color
                }}
              />
            </ImageListItem>
          ))
        ) : (
          !loading && <p>No photos found for this sol.</p>
        )}
      </ImageList>
    </div>
  );
};

export default MarsRover;
