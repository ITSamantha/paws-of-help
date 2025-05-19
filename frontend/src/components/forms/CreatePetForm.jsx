import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { meUser, postPet } from '../../services/api';
import PetTypeSelect from '../select/PetTypeSelect';
import BloodRhesusSelect from '../select/BloodRhesusSelect';
import BreedTypeSelect from '../select/BreedTypeSelect';
import BloodGroupSelect from '../select/BloodGroupSelect';
import { useNavigate } from 'react-router-dom';

const formStyle = {
  width: '100%',
};

export default function CreatePetForm() {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [selectedPetTypeId, setSelectedPetTypeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await meUser();
      setUser(currentUser);
      if (!currentUser) {
        navigate('/auth');
        return;
      }
    };
    fetchUser();
  }, []);

  const handleFinish = async (values) => {
    try {
      values.user_id = user.id;
      const response = await postPet(values);
      if (response && response.status === 200) {
        message.success('Питомец успешно создан!');
        setTimeout(() => {
          navigate('/profile');
        }, 1000);
      } else {
        message.error('Ошибка при создании питомца');
      }
    } catch (error) {
      console.error(error);
      message.error('Произошла ошибка при отправке формы');
    }
  };

  return (
    <Form layout="vertical" form={form} style={formStyle} size="large" onFinish={handleFinish}>
      <Form.Item
        label="Имя питомца"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
      >
        <Input placeholder="Булочка" />
      </Form.Item>

      <Form.Item
        label="Возраст, полных лет"
        name="age"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
      >
        <Input placeholder="4" />
      </Form.Item>

      <Form.Item
        label="Вес, кг"
        name="weight"
        rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
      >
        <Input placeholder="12.5" />
      </Form.Item>

      <Form.Item label="Тип животного" name="pet_type_id">
        <PetTypeSelect
          value={selectedPetTypeId}
          onChange={(value) => {
            setSelectedPetTypeId(value);
            form.setFieldsValue({
              pet_type_id: value,
              breed_type_id: undefined,
              blood_group_id: undefined,
            });
          }}
        />
      </Form.Item>

      <Form.Item
        label="Порода"
        name="breed_type_id"
        rules={[{ required: true, message: 'Выберите породу.' }]}
      >
        <BreedTypeSelect
          petTypeId={selectedPetTypeId}
          value={form.getFieldValue('breed_type_id')}
          onChange={(value) => form.setFieldsValue({ breed_type_id: value })}
        />
      </Form.Item>

      <Form.Item
        label="Группа крови"
        name="blood_group_id"
        rules={[{ required: true, message: 'Выберите группу крови.' }]}
      >
        <BloodGroupSelect
          petTypeId={selectedPetTypeId}
          value={form.getFieldValue('blood_group_id')}
          onChange={(value) => form.setFieldsValue({ blood_group_id: value })}
        />
      </Form.Item>

      <Form.Item label="Резус крови" name="blood_rhesus_id">
        <BloodRhesusSelect
          value={form.getFieldValue('blood_rhesus_id')}
          onChange={(value) => form.setFieldsValue({ blood_rhesus_id: value })}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{backgroundColor:"#c0cdf0", color: "#000"}}>
          Создать питомца
        </Button>
      </Form.Item>
    </Form>
  );
}
