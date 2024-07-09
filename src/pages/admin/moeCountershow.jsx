import React, { useState, useEffect } from 'react';
import { useGetCounterQuery, useUpdateCounterMutation } from '../../redux/api/api'; // Adjust the import path as needed
import { color } from 'framer-motion';

const MoecounterComponentShow = () => {
  const { data, error, isLoading } = useGetCounterQuery();
  const [updateCounter] = useUpdateCounterMutation();
  const [theme, setTheme] = useState(getRandomTheme()); // Add a state for theme


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading counter value: {error.message}</div>;
  }

  const number = data ? data.value : 0; // Fallback to 0 if data is not available

  const link = `https://api.sefinek.net/api/v2/moecounter?number=${number}&length=5&theme=${theme}&pixelated=true`;

  return (
    <div style={{ display: 'flex' }}>
      <img src={link} alt={`Count : ${number}`} style={{ userSelect: 'none', paddingRight:'1rem'}} /> 
      <h3 style={{color:'pink'}}>Views</h3>
    </div>
  );
};

// Function to get a random theme
function getRandomTheme() {
  const themes = ['default', 'asoul', 'gelbooru', 'moebooru'];
  return themes[Math.floor(Math.random() * themes.length)];
}

export default MoecounterComponentShow;
