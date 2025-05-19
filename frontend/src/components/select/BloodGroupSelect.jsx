// components/select/BreedTypeSelect.jsx
import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { getBloodGroupsByPetType } from '../../services/api';

const { Option } = Select;

export default function BloodGroupSelect({ petTypeId, value, onChange }) {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!petTypeId) return;

    const loadBloodGroups = async () => {
      setLoading(true);
      try {
        const response = await getBloodGroupsByPetType (petTypeId);
        setBloodGroups(response);
      } catch (error) {
        console.error('Не удалось загрузить группы:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBloodGroups();
  }, [petTypeId]);

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Выберите группу крови"
      value={value}
      onChange={onChange}
      loading={loading}
      disabled={!petTypeId}
    >
      {bloodGroups.map((result) => (
        <Option key={result.blood_group.id} value={result.blood_group.id}>
          {result.blood_group.title}
        </Option>
      ))}
    </Select>
  );
}
