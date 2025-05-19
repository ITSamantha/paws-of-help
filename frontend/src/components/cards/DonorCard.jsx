import { Card, Divider, Button, Tag, Popconfirm, message } from 'antd';
import {
  CalendarFilled,
  PushpinFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDonor } from '../../services/api';
import { useState } from 'react';

const cardStyle = {
  textAlign: 'left',
};

const DonorCard = ({ donorData, needsDeleteButton = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { pet, recipient, donor_status, donation_date } = donorData;
  const status = donor_status?.code || 'pending';
  const statusLabel = donor_status?.title || 'Неизвестно';

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDonor(id);
      message.success('Заявка успешно отозвана!');
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      message.error('Ошибка при отзыве заявки!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      hoverable
      cover={
        <img
          src={
            pet.image ||
            'https://cdn.ren.tv/cache/1200x630/media/img/2d/11/2d112f34c2bb298c9c49a0db357c38588881e586.jpg'
          }
          alt="pet"
        />
      }
      style={cardStyle}
    >
      <Card.Meta
        title={`${pet.pet_type.title} ${pet.name}`}
        description={`Группа крови: ${pet.blood_group.title} ${pet.blood_rhesus.title}`}
      />

      <div style={{ marginTop: '10px' }}>
        <Divider />
        <p>
          <CalendarFilled /> Дата донации: {new Date(donation_date).toLocaleDateString()}
        </p>
        <p>
          Реципиент: <Link to={`/pet/profile/${recipient.pet.id}`}>{recipient.pet.pet_type.title} {recipient.pet.name}</Link>
        </p>
        <p>
          Статус заявки: {statusLabel}
        </p>
        <Divider />
        <p>Причина: {recipient.reason}</p>
        <Divider />
        <p>
          <PushpinFilled /> Возраст: {pet.age} лет
        </p>
        <p>
          <PushpinFilled /> Вес: {pet.weight} кг
        </p>
        <p>
          <PushpinFilled /> Порода: {pet.breed_type?.title || 'Не указано'}
        </p>
      </div>

      {needsDeleteButton && (
        <>
          <Divider />
          <Popconfirm
            title="Отозвать заявку?"
            description="Вы уверены, что хотите отозвать заявку на донорство?"
            onConfirm={() => handleDelete(donorData.id)}
            okText="Да"
            cancelText="Отмена"
          >
            <Button type="primary" danger block loading={loading}>
              Отозвать
            </Button>
          </Popconfirm>
        </>
      )}
    </Card>
  );
};

export default DonorCard;
