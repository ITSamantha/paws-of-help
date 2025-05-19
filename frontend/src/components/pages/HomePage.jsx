import { Layout, Spin, Card, Col, Row, Image, Typography, Divider } from 'antd';
import { useEffect, useState } from 'react';
import PetCard from '../cards/PetCard';
import { getRecipients} from '../../services/api';
import QuestionsCollapse from '../collapse/QuestionsCollapse';
import RecipientCard from '../cards/RecipientCard';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default function HomePage() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const data = await getRecipients(16, 0);
        setRecipients(data);
      } catch (error) {
        console.error('Ошибка при загрузке питомцев:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipients();
  }, []);

  if (loading) return <Spin size="large" style={{ marginTop: '100px' }} />;

  return (
    <Layout style={{ minHeight: '100vh', background: '#fdfdfd' }}>
      <Content style={{ padding: '40px 80px' }}>
        <Row gutter={[32, 32]} style={{ marginTop: 30 }}>
          <Col span={24}>
            <Row justify="space-between" align="middle">
              <Col xs={10}>
                <Image
                    src="/static/index.jpg"
                    alt="Главное изображение"
                    width="100%"
                    height={500}
                    style={{
                      objectFit: 'cover',
                      borderRadius: '12px',
                      marginBottom: '32px',
                    }}
                    preview={false}
                  />
              </Col>

              <Col xs={12}>
                <Title level={1}>О нас</Title>
                <Paragraph style={{ fontSize: '18px', lineHeight: '1.8', textAlign:"justify" }}>
                  Мы объединяем владельцев питомцев, которым требуется срочная помощь, и доноров — животных, готовых спасти жизни.
                  Донорство крови у животных — это важный и часто единственный шанс на спасение других питомцев.
                  Присоединяйтесь к сообществу и помогите тем, кто в этом нуждается!
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>

        <Divider style={{ margin: '48px 0 48px 0' }} />

        <Title level={1} style={{ textAlign: 'center', marginBottom: '48px' }}>
          Нуждаются в вашей помощи
        </Title>
        <Row gutter={[24, 24]}>
          {recipients.map((recipient) => (
            <Col xs={24} sm={12} md={8} lg={6} key={recipient.id}>
              <RecipientCard recipientData={recipient}  needsHelpButton={true} />
            </Col>
          ))}
        </Row>
        
        <Divider style={{ margin: '48px 0 48px 0' }} />
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: '48px' }}>
            Часто задаваемые вопросы
          </Title>
          <div style={{ width: '80%' }}>
            <QuestionsCollapse />
          </div>
        </div>

      </Content>
    </Layout>
  );
}
