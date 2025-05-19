import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { getBloodRhesuses } from '../../services/api'; 

const { Option } = Select;

export default function BloodRhesusSelect({ value, onChange }) {
  const [bloodRhesuses, setBloodRhesuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBloodRhesuses = async () => {
      try {
        const types = await getBloodRhesuses();
        setBloodRhesuses(types);
      } catch (err) {
        setError('Не удалось загрузить резусы.');
      } finally {
        setLoading(false);
      }
    };

    loadBloodRhesuses();
  }, []);

  if (loading) return <Spin />;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Выберите резус крови"
      value={value}
      onChange={onChange}
    >
      {bloodRhesuses.map((type) => (
        <Option key={type.id} value={type.id}>
          {type.title}
        </Option>
      ))}
    </Select>
  );
}
