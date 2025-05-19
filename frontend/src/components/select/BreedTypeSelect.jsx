// components/select/BreedTypeSelect.jsx
import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { getBreedsByPetType } from '../../services/api';

const { Option } = Select;

export default function BreedTypeSelect({ petTypeId, value, onChange }) {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!petTypeId) return;

    const loadBreeds = async () => {
      setLoading(true);
      try {
        const response = await getBreedsByPetType(petTypeId);
        setBreeds(response);
      } catch (error) {
        console.error('Не удалось загрузить породы:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBreeds();
  }, [petTypeId]);

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Выберите породу"
      value={value}
      onChange={onChange}
      loading={loading}
      disabled={!petTypeId}
    >
      {breeds.map((breed) => (
        <Option key={breed.id} value={breed.id}>
          {breed.title}
        </Option>
      ))}
    </Select>
  );
}
