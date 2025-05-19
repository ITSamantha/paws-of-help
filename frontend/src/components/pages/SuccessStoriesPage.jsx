import React from 'react';
import { Typography, Card, Row, Col, Avatar } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const SuccessStoriesPage = () => {
  const stories = [
    {
      title: 'Макс спас жизнь Луне',
      description: 'Лабрадор Макс стал регулярным донором крови после того, как узнал о программе донорства. Благодаря его помощи, маленькая Луна смогла перенести сложную операцию и полностью восстановиться.',
      donor: 'Макс, лабрадор, 4 года',
      recipient: 'Луна, хаски, 2 года',
      image: '/images/success-story-1.jpg'
    },
    {
      title: 'История Мурки и Барсика',
      description: 'Домашняя кошка Мурка стала донором для Барсика, который попал в серьезную аварию. Благодаря своевременной помощи и донорской крови, Барсик смог вернуться к полноценной жизни.',
      donor: 'Мурка, домашняя кошка, 3 года',
      recipient: 'Барсик, британец, 5 лет',
      image: '/images/success-story-2.jpg'
    },
    {
      title: 'Спасение Рекса',
      description: 'Немецкая овчарка Белла регулярно сдает кровь в нашей клинике. Ее кровь помогла спасти Рекса, который страдал от тяжелой формы анемии.',
      donor: 'Белла, немецкая овчарка, 5 лет',
      recipient: 'Рекс, ротвейлер, 6 лет',
      image: '/images/success-story-3.jpg'
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={1}>Истории успеха</Title>
      
      <Paragraph style={{ marginBottom: '24px' }}>
        Каждая капля донорской крови может спасти жизнь. Здесь собраны истории питомцев,
        которые смогли помочь другим животным благодаря донорству крови.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {stories.map((story, index) => (
          <Col xs={24} sm={24} md={8} key={index}>
            <Card
              hoverable
              cover={
                <div style={{ 
                  height: '200px',
                  background: '#f5f5f5',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <HeartFilled style={{ fontSize: '48px', color: '#ff4d4f' }} />
                </div>
              }
              style={{ height: '100%' }}
            >
              <Meta
                title={story.title}
                description={
                  <>
                    <Paragraph>{story.description}</Paragraph>
                    <Paragraph>
                      <strong>Донор:</strong> {story.donor}
                    </Paragraph>
                    <Paragraph>
                      <strong>Реципиент:</strong> {story.recipient}
                    </Paragraph>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: '48px' }}>
        <Title level={2}>Станьте частью историй успеха</Title>
        <Paragraph>
          Ваш питомец тоже может стать героем и спасти жизнь другому животному.
          Присоединяйтесь к программе донорства крови для животных и помогите нам
          создавать новые истории успеха.
        </Paragraph>
      </Card>
    </div>
  );
};

export default SuccessStoriesPage; 