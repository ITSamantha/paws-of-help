import React, { useState, useEffect } from 'react';
import { Radio, Spin, Space, Card, Row, Col } from 'antd';
import { getPetsByUserId } from '../../services/api';
import PetCard from '../cards/PetCard';

export default function PetRadioGroup({ userId, value, onChange }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadPets = async () => {
      setLoading(true);
      try {
        const response = await getPetsByUserId(userId);
        const sanitized = response.map(pet => ({ ...pet, image: '' })); // пустые картинки
        setPets(sanitized);
      } catch (error) {
        console.error('Не удалось загрузить питомцев:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, [userId]);

  if (!userId) return null;
  if (loading) return <Spin />;

  return (
    <Radio.Group
      onChange={(e) => onChange(e.target.value)}
      value={value}
      style={{ width: '100%' }}
    >  
    <Row gutter={[16, 16]}>
        {pets.map((pet) => (
             <Col span={6} key={pet.id}>
                <Radio key={pet.id} value={pet.id} style={{ width: '100%' }}>
                    <PetCard petData={pet} />
                </Radio>
          </Col>
        ))}
      </Row>
    </Radio.Group>
  );
}
