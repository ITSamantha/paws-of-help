import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { getPetsByUserId } from '../../services/api';
import PetCard from '../cards/PetCard';

const { Option } = Select;

export default function PetSelect({ userId, value, onChange }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadPets = async () => {
      setLoading(true);
      try {
        const response = await getPetsByUserId(userId);
        setPets(response);
      } catch (error) {
        console.error('Не удалось загрузить питомцев:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, [userId]);

  return (
    <Select
        style={{ width: '100%' }}
        placeholder="Выберите питомца"
        value={value}
        onChange={onChange}
        loading={loading}
        disabled={!userId}
        dropdownStyle={{ padding: 8 }}
        optionLabelProp="label"
        >
        {pets.map((pet) => {
            const petWithoutImage = { ...pet, image: '' };
            return (
            <Option
                key={pet.id}
                value={pet.id}
                label={`${pet.pet_type.title} ${pet.name}`}
                style={{ height: 'auto', padding: 0 }}
            >
                <div style={{ pointerEvents: 'none' }}>
                <PetCard petData={petWithoutImage} needsDeleteButton={false}  />
                </div>
            </Option>
            );
        })}
        </Select>
  );
}
