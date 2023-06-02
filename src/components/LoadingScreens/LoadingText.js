import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import "../CorporatePage/Navigation.css"

const LoadingText = () => {
  return (
    <div >
           <Box sx={{ width: 800 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    </div>
  )
}

export default LoadingText