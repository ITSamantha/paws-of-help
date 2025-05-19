import { Card, Avatar, Popconfirm, Button, message, Divider } from 'antd';
import { CalendarFilled, PushpinFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  textAlign: 'left',
  cursor: 'pointer'
};

const PetCard = ({ petData, needsDeleteButton }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    message.success(`Питомец с ID ${id} удалён (заглушка).`);
  };

  const handleCardClick = (e) => {
    // Предотвращаем переход если кликнули по кнопке удаления
    if (e.target.closest('.delete-button')) {
      return;
    }
    navigate(`/pet/profile/${petData.id}`);
  };

  return (
    <Card
      hoverable
      cover={<img src={petData.image || 'https://cdn.ren.tv/cache/1200x630/media/img/2d/11/2d112f34c2bb298c9c49a0db357c38588881e586.jpg'} />}
      style={cardStyle}
      onClick={handleCardClick}
    >
      <Card.Meta 
        title={`${petData.pet_type.title} ${petData.name}`}  
        description={`Группа крови: ${petData.blood_group.title} ${petData.blood_rhesus.title}`} />
      <div style={{marginTop:"10px"}}>
        <p> <PushpinFilled /> Возраст: {petData.age}</p>
        <p> <PushpinFilled /> Вес: {petData.weight}</p>
        <p> <PushpinFilled /> Порода: {petData.breed_type.title || 'Не указано'}</p>
      </div>

      {needsDeleteButton && (
        <>
          <Divider />
          <Popconfirm
            title="Удалить питомца?"
            description="Вы уверены, что хотите удалить этого питомца?"
            onConfirm={() => handleDelete(petData.id)}
            okText="Да"
            cancelText="Отмена"
          >
            <Button 
              type="primary" 
              danger 
              block 
              style={{ marginTop: 12 }}
              className="delete-button"
            >
              Удалить
            </Button>
          </Popconfirm>
        </>
      )}
    </Card>
  );
};

export default PetCard;