import { Form, Input, Button, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import { registerUser, getCities } from '../../../services/api';

export default function RegisterForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesRes = await getCities();
        setCities(citiesRes || []);
      } catch {
        message.error('Не удалось загрузить справочные данные');
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        surname: values.surname,
        patronymic: values.patronymic,
        email: values.email,
        password: values.password,
        city_id: values.city_id,
      };
      const result = await registerUser(payload);
      if (result.status === 200) {
        message.success('Регистрация успешна!');
        onSuccess?.();
      } else {
        message.error('Ошибка при регистрации');
      }
    } catch {
      message.error('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="surname" label="Фамилия" rules={[{ required: true, message: 'Введите фамилию' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Введите имя' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="patronymic" label="Отчество" rules={[{ required: true, message: 'Введите отчество' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Пароль" rules={[{ required: true, min: 6 }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Повторите пароль"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Подтвердите пароль' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              return value === getFieldValue('password')
                ? Promise.resolve()
                : Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="city_id" label="Город" rules={[{ required: true }]}>
        <Select placeholder="Выберите город" loading={cities.length === 0}>
          {cities.map(city => (
            <Select.Option key={city.id} value={city.id}>
              {city.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
}
