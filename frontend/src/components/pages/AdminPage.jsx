import React, { useEffect, useState } from 'react';
import {
  Table,
  Typography,
  Layout,
  Spin,
  Row,
  Col,
  Select,
  Button,
  message,
} from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { verifyClinic, getClinics, meUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

export default function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);

  const navigate = useNavigate();

  const fetchUser = async () => {
    const currentUser = await meUser();
    if (!currentUser) {
      navigate('/auth');
      return false;
    }
    if (currentUser.user_role.id !== 1) {
      message.error('У вас нет роли администратора!');
      navigate('/profile');
      return false;
    }
    return true;
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getClinics(false); // Заявки с isVerified === false
      setRequests(data);
      setFilteredRequests(data);

      const uniqueCities = [...new Set(data.map(c => c.city?.title).filter(Boolean))];
      const uniqueRegions = [...new Set(data.map(c => c.city?.region?.title).filter(Boolean))];

      setCities(uniqueCities);
      setRegions(uniqueRegions);
    } catch (error) {
      message.error('Ошибка при загрузке заявок');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (clinicId) => {
    try {
      await verifyClinic(clinicId);
      message.success('Клиника одобрена');
      setRequests(prev => prev.filter(c => c.id !== clinicId));
      setFilteredRequests(prev => prev.filter(c => c.id !== clinicId));
    } catch (error) {
      message.error('Ошибка при одобрении');
    }
  };

  useEffect(() => {
    const init = async () => {
      const ok = await fetchUser();
      if (ok) await fetchRequests();
    };
    init();
  }, []);

  useEffect(() => {
    let result = requests;

    if (selectedCity) {
      result = result.filter(c => c.city?.title === selectedCity);
    }

    if (selectedRegion) {
      result = result.filter(c => c.city?.region?.title === selectedRegion);
    }

    setFilteredRequests(result);
  }, [selectedCity, selectedRegion, requests]);

  const columns = [
    { title: 'Название', dataIndex: 'title', key: 'title' },
    { title: 'Город', dataIndex: ['city', 'title'], key: 'city' },
    { title: 'Регион', dataIndex: ['city', 'region', 'title'], key: 'region' },
    { title: 'Адрес', dataIndex: 'address', key: 'address' },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'Одобрить',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<CheckOutlined />}
          style={{backgroundColor:"#c0cdf0", color: "#000"}}
          onClick={() => handleApprove(record.id)}
        >
          Одобрить
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Content style={{ padding: '40px 80px' }}>
        <Title level={2}>Заявки на добавление клиник</Title>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col>
            <Select
              placeholder="Город"
              allowClear
              style={{ width: 200 }}
              onChange={value => setSelectedCity(value)}
            >
              {cities.map(city => (
                <Option key={city} value={city}>{city}</Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Регион"
              allowClear
              style={{ width: 200 }}
              onChange={value => setSelectedRegion(value)}
            >
              {regions.map(region => (
                <Option key={region} value={region}>{region}</Option>
              ))}
            </Select>
          </Col>
        </Row>

        {loading ? (
          <Spin size="large" style={{ marginTop: 50 }} />
        ) : (
          <Table
            dataSource={filteredRequests}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 10 }}
          />
        )}
      </Content>
    </Layout>
  );
}
