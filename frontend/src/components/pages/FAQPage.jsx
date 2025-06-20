import React from 'react';
import { Typography, Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const FAQPage = () => {
  const faqItems = [
    {
      question: 'Безопасно ли донорство для моего питомца?',
      answer: 'Да, донорство крови безопасно для здоровых животных. Процедура проводится под наблюдением опытных ветеринаров с использованием стерильного оборудования. Объем забираемой крови рассчитывается индивидуально и не причиняет вреда донору.'
    },
    {
      question: 'Как часто питомец может быть донором?',
      answer: 'Собаки могут сдавать кровь каждые 3-4 месяца, кошки – каждые 2-3 месяца. Точный интервал определяется ветеринаром с учетом состояния здоровья животного.'
    },
    {
      question: 'Нужна ли специальная подготовка перед донацией?',
      answer: 'Да, есть несколько правил: не кормить животное за 12 часов до процедуры, обеспечить свободный доступ к воде, избегать физических нагрузок накануне. Все детальные инструкции вы получите от ветеринара.'
    },
    {
      question: 'Какие породы собак и кошек могут быть донорами?',
      answer: 'Донором может стать животное любой породы при условии соответствия основным требованиям: хорошее здоровье, подходящий возраст и вес, отсутствие хронических заболеваний.'
    },
    {
      question: 'Получает ли питомец-донор какие-то бонусы?',
      answer: 'Да! Доноры получают бесплатное обследование перед каждой донацией, включая общий анализ крови и осмотр ветеринара. Также предоставляются специальные скидки на ветеринарные услуги и корм.'
    },
    {
      question: 'Что делать после процедуры донации?',
      answer: 'После донации рекомендуется обеспечить питомцу спокойный отдых, хорошее питание и доступ к воде. В течение суток следует избегать физических нагрузок. Ветеринар предоставит подробные рекомендации по уходу.'
    },
    {
      question: 'Как долго длится процедура донации?',
      answer: 'Сама процедура забора крови занимает около 15-30 минут. Однако нужно учитывать время на предварительный осмотр и подготовку, поэтому стоит планировать визит в клинику на 1-1.5 часа.'
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={1}>Часто задаваемые вопросы о донорстве</Title>
      
      <Paragraph style={{ marginBottom: '24px' }}>
        Здесь вы найдете ответы на самые распространенные вопросы о донорстве крови для животных.
        Если у вас остались дополнительные вопросы, не стесняйтесь обращаться к нашим специалистам.
      </Paragraph>

      <Collapse
        expandIcon={({ isActive }) => <QuestionCircleOutlined rotate={isActive ? 90 : 0} />}
        style={{ marginTop: '24px', backgroundColor: '#fff', textAlign:"left"}}
      >
        {faqItems.map((item, index) => (
          <Panel header={item.question} key={index}>
            <Paragraph>{item.answer}</Paragraph>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQPage; 