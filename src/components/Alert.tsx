import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Alert.css";


const AlertComponent: React.FC = () => {
  const [alert, setAlert] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchAlert = async (): Promise<void> => {
      try {
        const response = await axios.get('http://172.28.19.221:8080/info/get_alert');
        console.log
        setAlert(response.data);
        console.log('alert fetched')
        fetchAlert();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAlert();

    return () => {
      setAlert(null);
    };
  }, []);

  return (
    <div>
      <div className='alerts'>Alerts</div>
      {alert == true ? (
        <div className='alert-red'>zalupa {alert}</div>
      ) : (
        <div className='alert-green'>No alerts</div>
      )}
    </div>
  );
};

export default AlertComponent;
