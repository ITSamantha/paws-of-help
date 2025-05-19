import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { loginUser } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({  }) {
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await loginUser(values);
      if (result.status === 200 && result.data.access_token) {
        localStorage.setItem('token', result.data.access_token);
        message.success('Успешный вход');
        navigate('/profile'); 
      } else {
        message.error('Неверный логин или пароль');
      }
    } catch (error) {
      message.error('Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}
      >
        <Input placeholder="your@email.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password placeholder="Введите пароль" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
}
