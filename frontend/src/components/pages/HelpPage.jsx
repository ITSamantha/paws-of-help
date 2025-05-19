import React from 'react';
import { Card, Steps, Divider, Typography, List, Button , Col, Row, Image} from 'antd';
import {
  QuestionCircleOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import QuestionsCollapse from '../collapse/QuestionsCollapse';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

export default function HelpPage() {
  return (
    <div style={{ padding: '40px 80px' , display: 'flex', justifyContent: 'center' }}>
      <div style={{  width: '100%' }}>
        <Row gutter={[48, 48]} align="middle" style={{ marginBottom: 100 }}>
          <Col xs={24} md={12}>
            <Title level={1}>Как стать донором?</Title>
            <Paragraph style={{ fontSize: '18px', textAlign:"justify" }}>
              Спасение жизни животных — благородное дело. 
              Узнайте, как вы или ваш питомец можете помочь уже сейчас!
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Image
              src="/static/pets.jpg"
              alt="Донор животное"
              style={{ borderRadius: 12, height: 500 }}
              preview={false}
            />
          </Col>
        </Row>

        <Divider style={{ marginBottom: 60 }} />

        <Title level={2}>Процесс становления донором</Title>

        <Steps
          current={-1}
          style={{ margin: '40px 0', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Step
            title={<span style={{ fontSize: '24px' }}>Проверка</span>}
            description={<span style={{ fontSize: '16px' }}>Соответствие требованиям</span>}
            icon={<QuestionCircleOutlined style={{ fontSize: 48 }} />}
          />
          <Step
            title={<span style={{ fontSize: '24px' }}>Обследование</span>}
            description={<span style={{ fontSize: '16px' }}>Медицинские анализы</span>}
            icon={<MedicineBoxOutlined style={{ fontSize: 32 }} />}
          />
          <Step
            title={<span style={{ fontSize: '24px' }}>Донорство</span>}
            description={<span style={{ fontSize: '16px' }}>Процедура сдачи крови</span>}
            icon={<HeartOutlined style={{ fontSize: 32 }} />}
          />
        </Steps>


        <Divider style={{ marginBottom: 60 }} />

        <Title level={2}>Требования к донорам</Title>

        <List
          size="large"
          bordered
          dataSource={[
            'Возраст животного: от 1 года до 8 лет',
            'Вес: более 4 кг для кошек, более 25 кг для собак',
            'Полная вакцинация',
            'Отсутствие хронических заболеваний',
            'Регулярные профилактические обработки от паразитов',
            'Спокойный характер (для животных)',
          ]}
          renderItem={(item) => <List.Item> < ExclamationCircleOutlined/> {item}</List.Item>}
          style={{ marginBottom: '32px', textAlign:"left" }}
        />


        <Title level={2} style={{ marginTop: 60, marginBottom: 30}}>
            Часто задаваемые вопросы
          </Title>
        <QuestionsCollapse />
        
        <Title level={2} style={{ marginTop: 60, marginBottom: 30}} >Где можно сдать кровь?</Title>

        <Paragraph style={{fontSize:18}}>
          Ветеринарные клиники, участвующие в программе донорства, 
          доступны для просмотра на <Link to="/clinics">отдельной странице</Link>.
        </Paragraph>


        <div style={{ textAlign: 'center', marginTop: 32}}>
          <Button type="primary" size="large" icon={<FileTextOutlined />} style={{ padding: 30, marginRight: 100, backgroundColor:"#c0cdf0", color: "#000"  }}>
            Стать донором
          </Button>
          <Button type="primary" size="large" icon={<FileTextOutlined />} style={{ padding: 30,  backgroundColor:"#c0cdf0", color: "#000"  }}>
            Найти донора
          </Button>
        </div>
      </div>
    </div>
  );
}
