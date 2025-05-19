import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { getBloodComponents } from '../../services/api';

const { Option } = Select;

export default function BloodComponentSelect({ value, onChange }) {
  const [bloodComponents, setBloodComponents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBloodComponents = async () => {
      try {
        const types = await getBloodComponents();
        setBloodComponents(types);
      } catch (err) {
        setError('Не удалось загрузить компоненты крови.');
      }
    };

    loadBloodComponents();
  }, []);

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Выберите компонент крови"
      value={value}
      onChange={onChange}
      allowClear
    >
      {bloodComponents.map(type => (
        <Option key={type.id} value={type.id}>
          {type.title}
        </Option>
      ))}
    </Select>
  );
}
