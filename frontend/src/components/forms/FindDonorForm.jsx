import React, { useState, useEffect } from 'react';
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Input,
  Spin,
  Button,
  Result,
  message
} from 'antd';
import BloodComponentSelect from '../select/BloodComponentSelect';
import PetSelect from '../select/PetSelect';
import { getClinics, meUser, postRecipient } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function FindDonorForm() {
  const [form] = Form.useForm();
  const [clinics, setClinics] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinics = async () => {

    const currentUser = await meUser();
    setUser(currentUser);
        
    if (!currentUser) {
        navigate('/auth');
        return;
    }

    try {
        const data = await getClinics();
        setClinics(data);
        setFilteredClinics(data);
        const uniqueRegions = [...new Set(data.map(c => c.city?.region?.title).filter(Boolean))];
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('Ошибка при загрузке клиник:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, []);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    form.setFieldsValue({ city: undefined, clinic_id: undefined });

    const regionCities = [
      ...new Map(
        clinics
          .filter(c => c.city?.region?.title === region && c.city?.id && c.city?.title)
          .map(c => [c.city.id, { id: c.city.id, title: c.city.title }])
      ).values(),
    ];

    setCities(regionCities);
    setFilteredClinics([]);
  };

  const handleCityChange = (cityId) => {
    const filtered = clinics.filter(c => c.city?.id === cityId);
    form.setFieldsValue({ city_id: cityId, clinic_id: undefined });
    setFilteredClinics(filtered);
  };

  const handleFinish = async (values) => {
    const { region, city_id, due_date, ...rest } = values;

    const dataToSend = {
            ...rest,
            clinic_id: values.clinic_id,
            due_date: due_date?.format('YYYY-MM-DD'),
        };

        try {
            const response = await postRecipient(dataToSend);
            if (response && response.status === 200) {
            message.success('Заявка успешно подана! В личном кабинете вы сможете следить за её статусом.');
            navigate('/profile'); 
        } else {
            message.error('Ошибка при отправке заявки. Попробуйте позже.');
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            message.error('Произошла ошибка. Проверьте подключение и попробуйте снова.');
        }
    };

  if (loading) return <Spin size="large" />;


  return (
    <Form layout="vertical" form={form} size="large" onFinish={handleFinish}>
      <Form.Item label="Пациент" name="pet_id" rules={[{ required: true, message: 'Выберите пациента' }]}>
        <PetSelect
          userId={user.id}
          value={form.getFieldValue('pet_id')}
          onChange={(value) => form.setFieldsValue({ pet_id: value })}
        />
      </Form.Item>

      <Form.Item label="Компонент крови" name="blood_component_id" rules={[{ required: true }]}>
        <BloodComponentSelect />
      </Form.Item>

      <Form.Item label="Причина запроса" name="reason" rules={[{ required: true, message: 'Укажите причину' }]}>
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Регион" name="region" rules={[{ required: true }]}>
        <Select placeholder="Выберите регион" onChange={handleRegionChange} allowClear>
          {regions.map(region => (
            <Option key={region} value={region}>{region}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Город" name="city_id" rules={[{ required: true }]}>
        <Select
          placeholder="Выберите город"
          onChange={handleCityChange}
          allowClear
          value={form.getFieldValue('city_id')}
        >
          {cities.map(city => (
            <Option key={city.id} value={city.id}>{city.title}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Клиника" name="clinic_id" rules={[{ required: true }]}>
        <Select placeholder="Выберите клинику">
          {filteredClinics.map(clinic => (
            <Option key={clinic.id} value={clinic.id}>
              {clinic.title}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Дата, до которой нужен донор"
        name="due_date"
        rules={[{ required: true, message: 'Укажите срок' }]}
      >
        <DatePicker
          style={{ width: '100%' }}
          disabledDate={date => date && (date < new Date() || date > new Date(Date.now() + 14 * 24 * 60 * 60 * 1000))}
        />
      </Form.Item>

      <Form.Item
        label="Количество доноров"
        name="donor_amount"
        rules={[
          { required: true, message: 'Укажите количество' },
          { type: 'number', min: 1, max: 10, message: 'Максимум 10 доноров' },
        ]}
      >
        <InputNumber min={1} max={10} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Подать заявку
        </Button>
      </Form.Item>
    </Form>
  );
}
