import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { getPetTypes } from '../../services/api';

const { Option } = Select;

export default function PetTypeSelect({ value, onChange }) {
  const [petTypes, setPetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPetTypes = async () => {
      try {
        const types = await getPetTypes();
        setPetTypes(types);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить типы животных');
      } finally {
        setLoading(false);
      }
    };

    loadPetTypes();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Выберите тип животного"
      value={value}
      onChange={onChange}
    >
      {petTypes.map((type) => (
        <Option key={type.id} value={type.id}>
          {type.title}
        </Option>
      ))}
    </Select>
  );
}
