import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImageList, ImageListItem, ImageListItemBar,ListSubheader } from '@mui/material'; // Import necessary components

const EpicImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch EPIC images once when the component mounts
  useEffect(() => {
    const fetchEpicImages = async () => {
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        const response = await axios.get('http://localhost:3000/epic');
        setImages(response.data);
      } catch (err) {
        setError('Error fetching EPIC images');
      } finally {
        setLoading(false);
      }
    };

    // Call fetchEpicImages once when the component is mounted
    fetchEpicImages();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h1>EPIC Images</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* ImageList component */}
      <ImageList variant="masonry" cols={3} gap={16}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">EPIC Images</ListSubheader>
      </ImageListItem>
        {images.length > 0 ? (
          images.map((img) => (
            <ImageListItem key={img.identifier}>
              <img
                src={`https://epic.gsfc.nasa.gov/archive/natural/${img.date
                  .split(' ')[0]
                  .replace(/-/g, '/')}/jpg/${img.image}.jpg?w=248&fit=crop&auto=format`}
                srcSet={`https://epic.gsfc.nasa.gov/archive/natural/${img.date
                  .split(' ')[0]
                  .replace(/-/g, '/')}/jpg/${img.image}.jpg?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={img.caption}
                loading="lazy"
                style={{ borderRadius: '8px' }} // Optional styling
              />
              <ImageListItemBar position="below" title={img.caption} />
            </ImageListItem>
          ))
        ) : (
          !loading && <p>No images found.</p>
        )}
      </ImageList>
    </div>
  );
};

export default EpicImages;
