import React, { useState, useEffect } from 'react';
import { useGetCounterQuery, useUpdateCounterMutation } from '../redux/api/api'; // Adjust the import path as needed

const MoecounterComponent = () => {
  const { data, error, isLoading } = useGetCounterQuery();
  const [updateCounter] = useUpdateCounterMutation();
  const [hasIncremented, setHasIncremented] = useState(false); // State to track if counter has been incremented

  useEffect(() => {
    if (data && !hasIncremented) {
      const newNumber = data.value + 1;
      updateCounter(newNumber);
      setHasIncremented(true); // Mark as incremented to prevent further increments
    }
  }, [data, updateCounter, hasIncremented]);

  return (
    <div style={{ display: 'flex' }}>
      {/* <img src={link} alt={`Count : ${number}`} style={{ userSelect: 'none' }} /> */}
    </div>
  );
};

export default MoecounterComponent;
