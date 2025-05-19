import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { 
  PhoneOutlined, 
  MailOutlined, 
  HeartOutlined, 
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ 
      background: '#fff',
      padding: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center' 
    }}>
      <div style={{  margin: '0 auto' }}>
        <Row gutter={[48, 32]}>
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ marginBottom: '24px', fontSize: '24px', }}>О проекте</Title>
            <Paragraph style={{ fontSize: '18px' }}>
              Мы создаем сообщество ответственных владельцев животных, 
              готовых помочь спасать жизни четвероногих друзей через 
              донорство крови.
            </Paragraph>
            <Space size="large" style={{ marginTop: '16px' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              </a>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ marginBottom: '24px' }}>Полезные ссылки</Title>
            <Space direction="vertical" size="middle">
              <Link to="/donor/how-to">Как стать донором</Link>
              <Link to="/donor/faq">Частые вопросы</Link>
              <Link to="/clinics">Клиники-партнеры</Link>
              <Link to="/donor/success-stories">Истории успеха</Link>
              <Link to="/donation">Пожертвования</Link>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ marginBottom: '24px' }}>Контакты</Title>
            <Space direction="vertical" size="middle">
              <Space>
                <PhoneOutlined />
                <Text>+7 (999) 123-45-67</Text>
              </Space>
              <Space>
                <MailOutlined />
                <Text>info@petdonor.ru</Text>
              </Space>
              <Space>
                <HeartOutlined />
                <Text>Круглосуточная поддержка</Text>
              </Space>
            </Space>
          </Col>
        </Row>

        <Divider style={{ margin: '32px 0 24px' }} />

        <Row justify="space-between" align="middle">
          <Col>
            <Text type="secondary">© {new Date().getFullYear()} Лапки помощи · Все права защищены</Text>
          </Col>
          <Col>
            <Space split={<Divider type="vertical" />}>
              <Link to="/privacy">Политика конфиденциальности</Link>
              <Link to="/terms">Условия использования</Link>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;


