import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import { getCities } from '../../services/api';

const { Option } = Select;

export default function CitySelect({ value, onChange }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error('Ошибка при загрузке городов:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  if (loading) {
    return <Spin />;
  }

  const handleChange = (value) => {
    if (onChange) {
      onChange(value); 
    }
  };

  return (
    <Select
      placeholder="Выберите город"
      style={{ width: '100%' }}
      value={value} 
      onChange={handleChange} 
    >
      {cities.map((city) => (
        <Option key={city.id} value={city.id}>
          {city.title}, {city.region.title}
        </Option>
      ))}
    </Select>
  );
}
