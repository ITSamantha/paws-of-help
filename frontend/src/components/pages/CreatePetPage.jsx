import { Card, Typography, Row, Col } from 'antd';
import CreatePetForm from '../forms/CreatePetForm';

const { Title } = Typography;

export default function CreatePetPage() {
  return (
    <Row justify="center" style={{ marginTop: 60 }}>
      <Col xs={24} sm={20} md={16} lg={12}>
      <Title level={3} style={{ marginBottom: 0 }}>Создание питомца</Title>
          <CreatePetForm />
      </Col>
    </Row>
  );
}
