import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';

const MissionVission = () => {

  const getCompanyData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/corporate`);
     console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='company-data-text'>
        MissionVission
        <Box sx={{ width: 800 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
        </div>
  )
}

export default MissionVission

