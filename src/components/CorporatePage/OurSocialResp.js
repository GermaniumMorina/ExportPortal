import React, { useEffect, useState } from 'react';
import LoadingText from '../LoadingScreens/LoadingText';
import axios from 'axios';

const OurSocialResp = () => {
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCompanyData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/corporate`);
      setCompanyData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='height-controller-container'>

    <div className='company-data-text'>
      <p>Company Profile</p>
      {isLoading ? (
        <LoadingText />
      ) : (
        <div >
       
        <p>{companyData.name}</p>
        <p>{companyData.responsibility}</p> 
       

        </div>
      )}
    </div>
    </div>
  );
};

export default OurSocialResp;
