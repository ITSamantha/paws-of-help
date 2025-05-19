import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Typography, Avatar, Tag, Spin, Alert, Space, Statistic, Timeline, Button, Tabs, Badge, Empty, Divider } from 'antd';
import { 
  CalendarFilled,
  HeartFilled,
  MedicineBoxFilled,
  SafetyCertificateFilled,
  EditFilled,
  DeleteFilled,
  PlusCircleFilled,
  ClockCircleFilled,
  CheckCircleFilled,
  TrophyFilled
} from '@ant-design/icons';
import { getPetById, getDonors } from '../../services/api';

const { Title, Text } = Typography;

const statsCardStyle = {
  borderRadius: '8px',
  background: '#ffffff',
  padding: '24px',
  height: '100%',
  border: 'none',
};

const timelineCardStyle = {
  borderRadius: '8px',
  background: '#ffffff',
  marginBottom: '12px',
  border: 'none',
};

export default function PetProfilePage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petResponse, donationsResponse] = await Promise.all([
          getPetById(id),
          getDonors(10, 0, {pet_id:id})
        ]);

        if (petResponse.status === 200) {
          setPet(petResponse.data);
        }
        if (donationsResponse) {
          setDonationHistory(donationsResponse);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Не удалось получить данные.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#ffffff' }}>
      <Spin size="large" />
    </div>
  );
  if (error) return <Alert message={error} type="error" showIcon style={{ margin: 40 }} />;
  if (!pet) return null;

  const stats = [
    {
      title: 'Возраст',
      value: `${pet.age} лет`,
      icon: <CalendarFilled style={{ color: '#595959' }} />
    },
    {
      title: 'Вес',
      value: `${pet.weight} кг`,
      icon: <SafetyCertificateFilled style={{ color: '#595959' }} />
    },
    {
      title: 'Донаций',
      value: donationHistory?.length || 0,
      icon: <HeartFilled style={{ color: '#595959' }} />
    }
  ];

  const items = [
    {
      key: '2',
      label: (
        <span>
          <HeartFilled /> История донорства
          <Badge count={donationHistory?.length || 0} style={{ marginLeft: 8 }} />
        </span>
      ),
      children: donationHistory && donationHistory.length > 0 ? (
        <Timeline
          mode="left"
          items={donationHistory.map((donor) => {
            const donationDate = donor.donation_date ? new Date(donor.donation_date) : new Date();
            const formattedDate = donationDate.toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
            
            const isApproved = donor.donor_status?.title === 'Утвержден';
            
            return {
              color: isApproved ? '#52c41a' : '#1890ff',
              dot: isApproved ? <CheckCircleFilled /> : <ClockCircleFilled />,
              label: (
                <Card 
                  size="small" 
                  style={{ 
                    width: 120,
                    textAlign: 'center',
                    borderRadius: 8,
                    background: '#d7d6ff',
                    border: 'none'
                  }}
                >
                  {formattedDate}
                </Card>
              ),
              children: (
                <Card
                  size="small"
                  style={{
                    marginBottom: 16,
                    background: '#fff',
                    border: '1px solid #fff'
                  }}
                >
                  <Space direction="vertical" size={8} style={{ width: '100%' }}>
                    <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
                      <Text strong style={{ fontSize: 15 }}>
                        {donor.recipient?.blood_component?.title || 'Компонент не указан'}
                      </Text>
                      <Tag
                        color={isApproved ? 'success' : 'processing'}
                        style={{ margin: 0, fontSize: 12 }}
                      >
                        {donor.donor_status?.title || 'В обработке'}
                      </Tag>
                    </Space>
                    
                    <Space direction="vertical" size={4} style={{ fontSize: 13 }}>
                      <Text type="secondary">
                        Клиника: {donor.recipient?.clinic?.title || 'Не указана'}
                      </Text>
                      {donor.recipient?.pet && (
                        <Text type="secondary">
                          Реципиент:{' '}
                          <Link 
                            to={`/pet/profile/${donor.recipient.pet.id}`}
                            style={{ 
                              color: '#1890ff',
                              textDecoration: 'none',
                              borderBottom: '1px dashed #1890ff'
                            }}
                            onClick={(e) => {
                              if (donor.recipient.pet.id === id) {
                                e.preventDefault();
                              }
                            }}
                          >
                            {donor.recipient.pet.name}
                          </Link>
                        </Text>
                      )}
                    </Space>
                  </Space>
                </Card>
              )
            };
          })}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Text type="secondary" style={{ fontSize: 14 }}>
              Пока нет истории донорства
            </Text>
          }
        />
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#ffffff' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            style={statsCardStyle}
            cover={
              <img
                alt={pet.name}
                src={pet.image || 'https://cdn.ren.tv/cache/1200x630/media/img/2d/11/2d112f34c2bb298c9c49a0db357c38588881e586.jpg'}
                style={{ borderRadius: '8px 8px 0 0', objectFit: 'cover', height: '200px' }}
              />
            }
          >
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <div>
                <Title level={3} style={{ margin: 0 }}>{pet.name}</Title>
                <Text type="secondary">{pet.pet_type.title}</Text>
              </div>
              
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <Text>
                  <strong>Группа крови:</strong> {pet.blood_group.title} {pet.blood_rhesus.title}
                </Text>
                <Text>
                  <strong>Порода:</strong> {pet.breed_type.title || 'Не указано'}
                </Text>
              </Space>

              <Row gutter={[16, 16]}>
                {stats.map((stat, index) => (
                  <Col span={8} key={index}>
                    <Statistic
                      title={
                        <Space size={4}>
                          {stat.icon}
                          <Text type="secondary" style={{ fontSize: 14 }}>{stat.title}</Text>
                        </Space>
                      }
                      value={stat.value}
                      valueStyle={{ fontSize: 16 }}
                    />
                  </Col>
                ))}
              </Row>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card style={statsCardStyle}>
            <Tabs
              items={items}
              style={{ marginTop: -8 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
