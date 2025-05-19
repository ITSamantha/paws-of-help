import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col, Select, message, Spin, Card, Space, Tag, Statistic, Divider, Input } from 'antd';
import { updateDonor, meUser, getDonors, getGonorStatuses } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import DonorCard from '../cards/DonorCard';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined,
  TeamOutlined,
  FilterOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;
const { Search } = Input;

const statusColors = {
  'Создан': 'default',
  'Утвержден': 'success',
  'Завершен': 'processing',
  'Отклонен': 'error'
};

const statusIcons = {
  'Создан': <ClockCircleOutlined style={{ color: '#d9d9d9' }} />,
  'Утвержден': <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  'Завершен': <CheckCircleOutlined style={{ color: '#1890ff' }} />,
  'Отклонен': <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
};

export default function AdminClinicPage() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clinicId, setClinicId] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    petType: 'all',
    bloodComponent: 'all',
    search: ''
  });
  const [statistics, setStatistics] = useState({
    total: 0,
    created: 0,
    approved: 0,
    completed: 0,
    rejected: 0
  });
  const navigate = useNavigate();

  // Получаем уникальные типы животных и компоненты крови из данных
  const petTypes = [...new Set(donors.map(donor => donor.pet?.pet_type?.title))].filter(Boolean);
  const bloodComponents = [...new Set(donors.map(donor => donor.recipient?.blood_component?.title))].filter(Boolean);

  useEffect(() => {
    const fetchUserClinic = async () => {
      try {
        const user = await meUser();
        if (!user || !user.clinic?.id) {
          message.warning('Вы не привязаны к клинике');
          navigate('/');
          return;
        }
        const id = user.clinic.id;
        setClinicId(id);
        fetchDonors(id);
        fetchStatuses();
      } catch (err) {
        message.error('Ошибка при загрузке пользователя');
      }
    };

    fetchUserClinic();
  }, []);

  const fetchDonors = async (id) => {
    setLoading(true);
    try {
      const res = await getDonors();
      setDonors(res);
      
      const stats = res.reduce((acc, donor) => {
        acc.total++;
        if (donor.donor_status?.title === 'Создан') acc.created++;
        else if (donor.donor_status?.title === 'Утвержден') acc.approved++;
        else if (donor.donor_status?.title === 'Завершен') acc.completed++;
        else if (donor.donor_status?.title === 'Отклонен') acc.rejected++;
        return acc;
      }, { total: 0, created: 0, approved: 0, completed: 0, rejected: 0 });
      
      setStatistics(stats);
    } catch (err) {
      message.error('Ошибка при загрузке заявок');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await getGonorStatuses();
      setStatuses(res);
    } catch (err) {
      message.error('Ошибка при загрузке статусов');
    }
  };

  const handleStatusChange = async (donorId, newStatus) => {
    try {
      await updateDonor(donorId, { "donor_status_id": newStatus });
      message.success('Статус обновлён');
      fetchDonors(clinicId);
    } catch (err) {
      message.error('Не удалось обновить статус');
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredDonors = donors.filter(donor => {
    const matchesStatus = filters.status === 'all' || donor.donor_status?.title === filters.status;
    const matchesPetType = filters.petType === 'all' || donor.pet?.pet_type?.title === filters.petType;
    const matchesBloodComponent = filters.bloodComponent === 'all' || donor.recipient?.blood_component?.title === filters.bloodComponent;
    const matchesSearch = !filters.search || 
      donor.pet?.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      `${donor.pet?.user?.surname} ${donor.pet?.user?.name}`.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesPetType && matchesBloodComponent && matchesSearch;
  });

  const stats = [
    {
      title: 'Всего доноров',
      value: statistics.total,
      icon: <TeamOutlined style={{ color: '#1890ff' }} />,
      color: '#e6f7ff'
    },
    {
      title: 'Создано',
      value: statistics.created,
      icon: statusIcons['Создан'],
      color: '#fafafa'
    },
    {
      title: 'Утверждено',
      value: statistics.approved,
      icon: statusIcons['Утвержден'],
      color: '#f6ffed'
    },
    {
      title: 'Завершено',
      value: statistics.completed,
      icon: statusIcons['Завершен'],
      color: '#e6f7ff'
    },
    {
      title: 'Отклонено',
      value: statistics.rejected,
      icon: statusIcons['Отклонен'],
      color: '#fff1f0'
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        style={{ 
          borderRadius: 8,
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: 24
        }}
      >
        <Row gutter={[16, 16]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                style={{
                  background: stat.color,
                  borderRadius: 8,
                  border: 'none'
                }}
              >
                <Statistic
                  title={<span style={{ color: '#595959' }}>{stat.title}</span>}
                  value={stat.value}
                  prefix={stat.icon}
                  valueStyle={{ color: '#262626' }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Card
        style={{ 
          borderRadius: 8,
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
        title={
          <Space size="large">
            <span>Доноры клиники</span>
          </Space>
        }
      >
        <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: 24 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Статус"
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
                style={{ width: '100%' }}
              >
                <Option value="all">Все статусы</Option>
                <Option value="Создан">Созданные</Option>
                <Option value="Утвержден">Утвержденные</Option>
                <Option value="Завершен">Завершенные</Option>
                <Option value="Отклонен">Отклоненные</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Тип животного"
                value={filters.petType}
                onChange={(value) => handleFilterChange('petType', value)}
                style={{ width: '100%' }}
              >
                <Option value="all">Все животные</Option>
                {petTypes.map(type => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Компонент крови"
                value={filters.bloodComponent}
                onChange={(value) => handleFilterChange('bloodComponent', value)}
                style={{ width: '100%' }}
              >
                <Option value="all">Все компоненты</Option>
                {bloodComponents.map(component => (
                  <Option key={component} value={component}>{component}</Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Поиск по имени питомца или владельцу"
                prefix={<SearchOutlined />}
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </Col>
          </Row>
        </Space>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredDonors.length === 0 ? (
              <Col span={24}>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  Нет заявок с выбранными фильтрами
                </div>
              </Col>
            ) : (
              filteredDonors.map((donor) => (
                <Col xs={24} sm={12} md={8} lg={6} key={donor.id}>
                  <Card
                    style={{
                      background: '#fff',
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <DonorCard donorData={donor} needsDeleteButton={false} />
                    <Divider style={{ margin: '12px 0' }} />
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Select
                        value={donor.donor_status.id}
                        style={{ width: '100%' }}
                        onChange={(value) => handleStatusChange(donor.id, value)}
                      >
                        {statuses.map((status) => (
                          <Option key={status.id} value={status.id}>
                            {status.title}
                          </Option>
                        ))}
                      </Select>
                    </Space>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}
      </Card>
    </div>
  );
}
