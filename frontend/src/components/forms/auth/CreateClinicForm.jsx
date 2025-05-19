import React, { useState } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { postClinic } from '../../../services/api';
import CitySelect from '../../select/CitySelect';

const { Title } = Typography;

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '40px',
};

const formWrapperStyle = {
  width: '100%',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  padding: '32px',
};

export default function CreateClinicForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      const response = await postClinic(values);
      if (response && response.status === 200) {
        message.success('Клиника успешно добавлена! Ожидайте верификации администратором.');
        navigate('/'); 
      } else {
        message.error('Не удалось добавить клинику. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Ошибка при добавлении клиники:', error);
      message.error('Ошибка при добавлении клиники. Попробуйте позже.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <Form
          layout="vertical"
          form={form}
          size="large"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Название клиники"
            name="title"
            rules={[{ required: true, message: 'Введите название клиники.' }]}
          >
            <Input placeholder="ВетКлиника №1" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: 'email', message: 'Введите корректный email.' },
            ]}
          >
            <Input placeholder="clinic@example.com" />
          </Form.Item>

          <Form.Item
            label="Адрес"
            name="address"
            rules={[{ required: true, message: 'Введите адрес клиники.' }]}
          >
            <Input placeholder="г. Москва, ул. Ленина, д. 5" />
          </Form.Item>

          <Form.Item
            label="Телефон"
            name="phone"
            rules={[{ required: true, message: 'Введите номер телефона.' }]}
          >
            <Input placeholder="+7 (999) 123-45-67" />
          </Form.Item>

          <Form.Item
            label="Сайт клиники"
            name="url"
            rules={[
              { required: true, type: 'url', message: 'Введите корректный URL.' },
            ]}
          >
            <Input placeholder="https://vetclinic.ru" />
          </Form.Item>

          <Form.Item
            label="Город"
            name="city_id"
            rules={[{ required: true, message: 'Выберите город.' }]}
          >
            <CitySelect
              value={form.getFieldValue('city_id')}
              onChange={(value) => form.setFieldsValue({ city_id: value })}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Создать клинику
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
