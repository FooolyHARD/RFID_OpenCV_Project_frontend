import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/PersonList.css"

interface InfoResponse {
  counted: number;
  passed: number;
}

const PersonListComponent: React.FC = () => {
  const [value, setValue] = useState<InfoResponse | null>(null);

  useEffect(() => {
    const fetchValue = async (): Promise<void> => {
      try {
        const response = await axios.get('http://172.28.19.221:8080/info/get_info');
        setValue(response.data as InfoResponse)
        fetchValue(); 
        console.log("fetched");
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchValue();

    return () => {
      setValue(null);
    };
  }, []);

  return (
    <div className='count'>
        Количество людей:
        { 
          value &&
          Object.entries(value).map(([key, count]) => (
            <div>{key}: {count}</div>
          ))
        }
    </div>
  );
};

export default PersonListComponent;
