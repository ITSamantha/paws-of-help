import React from 'react';
import { Typography, Card, Row, Col, Button, Input, Space, Statistic, Divider } from 'antd';
import { 
  HeartOutlined, 
  CrownOutlined, 
  StarOutlined,
  DollarOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const DonationPage = () => {
  const donationOptions = [
    {
      title: 'Помощник',
      amount: '500₽',
      description: 'Поможет приобрести расходные материалы для одной процедуры донации',
      icon: <HeartOutlined />,
      color: '#ff4d4f'
    },
    {
      title: 'Спаситель',
      amount: '1000₽',
      description: 'Обеспечит полное обследование одного животного-донора',
      icon: <StarOutlined />,
      color: '#faad14'
    },
    {
      title: 'Хранитель',
      amount: '3000₽',
      description: 'Поддержит работу банка крови для животных на неделю',
      icon: <CrownOutlined />,
      color: '#52c41a'
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '48px',
        background: 'linear-gradient(135deg, #52c41a 0%, #95de64 100%)',
        padding: '48px',
        borderRadius: '16px',
        color: 'white'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: '24px' }}>
          Поддержите наш проект
        </Title>
        <Paragraph style={{ fontSize: '18px', color: 'white' }}>
          Ваше пожертвование поможет нам развивать сеть донорства крови для животных
          и спасать еще больше жизней наших четвероногих друзей.
        </Paragraph>
      </div>

      {/* Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Собрано в этом месяце"
              value={158750}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="₽"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Спасено животных"
              value={243}
              valueStyle={{ color: '#cf1322' }}
              prefix={<HeartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Рост пожертвований"
              value={15.7}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Donation Options */}
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
        Варианты поддержки
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        {donationOptions.map((option, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              hoverable
              style={{ 
                height: '100%',
                textAlign: 'center',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                background: option.color,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: 'white',
                fontSize: '32px'
              }}>
                {option.icon}
              </div>
              <Title level={3}>{option.title}</Title>
              <Title level={2} style={{ color: option.color }}>{option.amount}</Title>
              <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
                {option.description}
              </Paragraph>
              <Button type="primary" size="large" style={{
                background: option.color,
                borderColor: option.color
              }}>
                Поддержать
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Custom Amount */}
      <Card
        style={{ 
          textAlign: 'center',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          marginBottom: '48px'
        }}
      >
        <Title level={3}>Другая сумма</Title>
        <Paragraph style={{ fontSize: '16px' }}>
          Вы можете выбрать любую удобную для вас сумму пожертвования
        </Paragraph>
        <Space size="large">
          <Input
            size="large"
            placeholder="Введите сумму"
            style={{ width: '200px' }}
            suffix="₽"
          />
          <Button type="primary" size="large">
            Поддержать
          </Button>
        </Space>
      </Card>

      {/* Info Section */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card style={{ height: '100%', borderRadius: '16px' }}>
            <Title level={3}>На что идут средства</Title>
            <ul style={{ fontSize: '16px', paddingLeft: '20px' }}>
              <li>Закупка оборудования для банка крови</li>
              <li>Расходные материалы для процедур донации</li>
              <li>Поддержка работы лабораторий</li>
              <li>Транспортировка донорской крови</li>
              <li>Развитие сети клиник-партнеров</li>
            </ul>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ height: '100%', borderRadius: '16px' }}>
            <Title level={3}>Почему это важно</Title>
            <Paragraph style={{ fontSize: '16px' }}>
              Каждый день множество животных нуждается в переливании крови. 
              Ваша поддержка помогает нам:
            </Paragraph>
            <ul style={{ fontSize: '16px', paddingLeft: '20px' }}>
              <li>Спасать жизни животных в критических ситуациях</li>
              <li>Развивать инфраструктуру донорства</li>
              <li>Делать процедуры более доступными</li>
              <li>Информировать владельцев животных о важности донорства</li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DonationPage; 