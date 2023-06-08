import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
    // Perform any other actions related to page change, such as fetching data
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={5} 
        color="primary"
        page={currentPage}
        onChange={handlePageChange}
      />
    </Stack>
  );
}
