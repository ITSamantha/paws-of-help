import React from 'react';
import { Card, Typography, Steps, List, Row, Col, Button, Image } from 'antd';
import { HeartOutlined, FormOutlined, CheckCircleOutlined, MedicineBoxOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const HowToBecomeDonorPage = () => {
  const steps = [
    {
      title: 'Проверка здоровья',
      description: 'Убедитесь, что ваш питомец здоров и соответствует требованиям донорства. Это первый и самый важный шаг на пути к спасению жизней других животных.',
      icon: <MedicineBoxOutlined />,
      color: '#ff4d4f'
    },
    {
      title: 'Регистрация',
      description: 'Зарегистрируйте вашего питомца в системе. Это займет всего несколько минут, но поможет спасти множество жизней.',
      icon: <FormOutlined />,
      color: '#1890ff'
    },
    {
      title: 'Обследование',
      description: 'Пройдите необходимое обследование в клинике. Наши специалисты проведут все необходимые тесты и анализы.',
      icon: <CheckCircleOutlined />,
      color: '#52c41a'
    },
    {
      title: 'Готовность',
      description: 'Поздравляем! Ваш питомец готов помогать другим! Вы стали частью благородного сообщества доноров.',
      icon: <HeartOutlined />,
      color: '#ff4d4f'
    }
  ];

  const benefits = [
    {
      title: 'Бесплатное обследование',
      description: 'Регулярные check-up и анализы для вашего питомца',
      icon: '/images/benefits/checkup.png'
    },
    {
      title: 'Особый уход',
      description: 'Приоритетное обслуживание в клиниках-партнерах',
      icon: '/images/benefits/care.png'
    },
    {
      title: 'Скидки и бонусы',
      description: 'Специальные предложения на услуги и товары',
      icon: '/images/benefits/discount.png'
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '48px',
        background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
        padding: '48px',
        borderRadius: '16px',
        color: 'white'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: '24px' }}>
          Станьте героем - спасите жизнь!
        </Title>
        <Paragraph style={{ fontSize: '18px', color: 'white' }}>
          Донорство крови для животных - это возможность подарить надежду тем, кто в ней нуждается.
          Присоединяйтесь к нашей программе и станьте частью сообщества, которое спасает жизни!
        </Paragraph>
        <Link to="/donor">
          <Button type="primary" size="large" style={{ 
            marginTop: '24px',
            background: 'white',
            color: '#ff4d4f',
            borderColor: 'white',
            height: '48px',
            padding: '0 32px',
            fontSize: '16px'
          }}>
            Стать донором <ArrowRightOutlined />
          </Button>
        </Link>
      </div>

      {/* Process Section */}
      <Card 
        style={{ 
          marginBottom: '48px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Путь к донорству
        </Title>
        <Steps
          direction="vertical"
          current={-1}
          items={steps.map(step => ({
            ...step,
            icon: <div style={{ 
              background: step.color,
              borderRadius: '50%',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              {step.icon}
            </div>
          }))}
          style={{ marginBottom: '24px' }}
        />
      </Card>

      {/* Requirements Section */}
      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        <Col xs={24} md={12}>
          <Card
            style={{ 
              height: '100%',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Title level={2}>Требования к донорам</Title>
            <List
              dataSource={[
                'Возраст от 1 до 8 лет',
                'Вес не менее 5 кг',
                'Отсутствие хронических заболеваний',
                'Все необходимые прививки',
                'Регулярная обработка от паразитов',
                'Хорошее общее состояние здоровья'
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                    {item}
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            style={{ 
              height: '100%',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              background: '#f6ffed'
            }}
          >
            <Title level={2}>Преимущества донорства</Title>
            <List
              dataSource={benefits}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    style={{ width: '100%', border: 'none', background: 'transparent' }}
                  >
                    <Row align="middle" gutter={16}>
                      <Col>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: '#52c41a',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}>
                          <HeartOutlined style={{ fontSize: '24px' }} />
                        </div>
                      </Col>
                      <Col flex="1">
                        <Title level={4} style={{ margin: 0 }}>{item.title}</Title>
                        <Text>{item.description}</Text>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Call to Action */}
      <Card
        style={{ 
          background: 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          padding: '48px'
        }}
      >
        <Title level={2} style={{ color: 'white' }}>Готовы спасать жизни?</Title>
        <Paragraph style={{ color: 'white', fontSize: '18px' }}>
          Присоединяйтесь к программе донорства крови для животных прямо сейчас.
          Ваш питомец может стать героем и подарить надежду тем, кто в этом нуждается!
        </Paragraph>
        <Link to="/donor">
          <Button type="primary" size="large" style={{ 
            marginTop: '24px',
            background: 'white',
            color: '#1890ff',
            borderColor: 'white',
            height: '48px',
            padding: '0 32px',
            fontSize: '16px'
          }}>
            Зарегистрироваться как донор <ArrowRightOutlined />
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default HowToBecomeDonorPage;