import { Card, Row, Col, Avatar, Typography, Divider, Button, Tag, Spin, Tabs, Statistic, Space } from 'antd';
import { UserOutlined, EditOutlined, LogoutOutlined, HeartOutlined, PlusOutlined, EnvironmentOutlined, MailOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { getDonors, getPets, getRecipients, meUser, getPetsByUserId } from '../../services/api';
import PetCard from '../cards/PetCard';
import RecipientCard from '../cards/RecipientCard';
import DonorCard from '../cards/DonorCard';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [donors, setDonors] = useState([]);
  const [recipientsLoading, setRecipientsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await meUser();
        setUser(currentUser);

        if (!currentUser || !currentUser.id) {
          navigate('/auth');
          return;
        }

        const petList = await getPetsByUserId(currentUser.id);
        setPets(petList);

        setRecipientsLoading(true);

        const allRecipients = await Promise.all(
          petList.map((pet) =>
            getRecipients(1000, 0, { pet_id: pet.id }).catch(() => [])
          )
        );

        const allDonors = await Promise.all(
          petList.map((pet) =>
            getDonors(1000, 0, { pet_id: pet.id }).catch(() => [])
          )
        );

        setRecipients(allRecipients.flat());
        setDonors(allDonors.flat());
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
        setRecipientsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
  );

  const stats = [
    {
      title: 'Питомцев',
      value: pets.length,
      icon: <HeartOutlined  style={{ color: '#1890ff' }} />,
      color: '#e6f7ff'
    },
    {
      title: 'Доноров',
      value: donors.length,
      icon: <HeartOutlined style={{ color: '#ff4d4f' }} />,
      color: '#fff1f0'
    },
    {
      title: 'Реципиентов',
      value: recipients.length,
      icon: <HeartOutlined style={{ color: '#52c41a' }} />,
      color: '#f6ffed'
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      {/* Hero Section */}
      <Card
        style={{
          borderRadius: '16px',
          marginBottom: '24px',
          background: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <Avatar
              size={200}
              icon={<UserOutlined />}
              style={{
                backgroundColor: '#f0f5ff',
                color: '#1890ff',
                boxShadow: '0 4px 12px rgba(24,144,255,0.15)'
              }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Title level={2} style={{ color: '#262626', margin: 0 }}>
              {user.surname} {user.name} {user.patronymic}
            </Title>
            <Space direction="vertical" size="large" style={{ marginTop: '24px' }}>
              <Space>
                <EnvironmentOutlined style={{ color: '#595959', fontSize: '18px' }} />
                <Text style={{ color: '#595959', fontSize: '16px' }}>
                  {user.city.title}, {user.city.region.title}
                </Text>
              </Space>
              <Space>
                <MailOutlined style={{ color: '#595959', fontSize: '18px' }} />
                <Text style={{ color: '#595959', fontSize: '16px' }}>
                  {user.email}
                </Text>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: '16px',
                textAlign: 'center',
                background: stat.color,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              <Statistic
                title={<span style={{ fontSize: '16px', color: '#595959' }}>{stat.title}</span>}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: '#262626', fontSize: '28px' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content */}
      <Card
        style={{
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Tabs
          defaultActiveKey="1"
          size="large"
          items={[
            {
              key: '1',
              label: 'Мои питомцы',
              children: (
                <>
                  <div style={{ marginBottom: '24px', textAlign: 'right' }}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => navigate('/pet')}
                      size="large"
                      style={{
                        background: 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(24,144,255,0.35)'
                      }}
                    >
                      Создать питомца
                    </Button>
                  </div>
                  <Row gutter={[24, 24]}>
                    {pets.map((pet) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={pet.id}>
                        <PetCard petData={pet} needsDeleteButton={true} />
                      </Col>
                    ))}
                  </Row>
                </>
              )
            },
            {
              key: '2',
              label: 'Заявки на донорство',
              children: (
                <>
                  <div style={{ marginBottom: '24px', textAlign: 'right' }}>
                    <Button
                      type="primary"
                      icon={<HeartOutlined />}
                      onClick={() => navigate('/donor')}
                      size="large"
                      style={{
                        background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(255,77,79,0.35)'
                      }}
                    >
                      Стать донором
                    </Button>
                  </div>
                  <Row gutter={[24, 24]}>
                    {donors.map((donor) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={donor.id}>
                        <DonorCard donorData={donor} needsDeleteButton={true} />
                      </Col>
                    ))}
                  </Row>
                </>
              )
            },
            {
              key: '3',
              label: 'Заявки на реципиента',
              children: (
                <>
                  <div style={{ marginBottom: '24px', textAlign: 'right' }}>
                    <Button
                      type="primary"
                      icon={<HeartOutlined />}
                      onClick={() => navigate('/donor/find')}
                      size="large"
                      style={{
                        background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(82,196,26,0.35)'
                      }}
                    >
                      Найти донора
                    </Button>
                  </div>
                  <Row gutter={[24, 24]}>
                    {recipients.map((recipient) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={recipient.id}>
                        <RecipientCard recipientData={recipient} needsHelpButton={false} needsDeleteButton={true} />
                      </Col>
                    ))}
                  </Row>
                </>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
}
