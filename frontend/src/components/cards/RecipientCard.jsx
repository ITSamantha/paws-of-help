import { Card, Avatar, Divider, Button, Tag, Popconfirm, message} from 'antd';
import { CalendarFilled, PushpinFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { deleteRecipient } from '../../services/api';

const cardStyle = {
  textAlign: 'left',
};


const RecipientCard = ({ recipientData, needsHelpButton, needsDeleteButton}) => {

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteRecipient(id);
      message.success('Заявка успешно отозвана!');
    } catch (error) {
      message.error('Ошибка при отзыве заявки!');
    } 
  };

  return (
    <Card
      hoverable
      cover={<img src={recipientData.image || 'https://cdn.ren.tv/cache/1200x630/media/img/2d/11/2d112f34c2bb298c9c49a0db357c38588881e586.jpg'} />}
      style={cardStyle}
    >
      <Card.Meta 
        title={`${recipientData.pet.pet_type.title} ${recipientData.pet.name}`}  
        description={`Группа крови: ${recipientData.pet.blood_group.title} ${recipientData.pet.blood_rhesus.title}`} />
        <div style={{marginTop:"10px"}}>
            <Divider />
            <p>   Причина поиска: {recipientData.reason}</p>
            <p>   Поиск до: {recipientData.due_date}</p>
            <Divider />
            <p>  Количество требуемых доноров: {recipientData.donor_amount}</p>
            <p>  Компонент крови: {recipientData.blood_component.title}</p>
            <Divider />
            <p> <PushpinFilled /> Возраст: {recipientData.pet.age} лет</p>
            <p> <PushpinFilled /> Вес: {recipientData.pet.weight} кг</p>
            <p> <PushpinFilled /> Порода: {recipientData.pet.breed_type.title || 'Не указано'}</p>
        </div>
        

        {needsHelpButton && (
            <>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                    type="primary"
                    style={{backgroundColor:"#c0cdf0", color: "#000"}}
                    onClick={() =>
                        navigate('/donor', {
                        state: { recipientId: recipientData.id },
                        })
                    }
                    >
                    Помочь
                    </Button>
                </div>
            </>
        )}
        {needsDeleteButton && (
            <>
                <Divider />
                <Popconfirm
                    title="Отозвать заявку?"
                    description="Вы уверены, что хотите отозвать заявку?"
                    onConfirm={() => handleDelete(recipientData.id)}
                    okText="Да"
                    cancelText="Отмена"
                    >
                    <Button type="primary" danger block style={{ marginTop: 12 }}>
                        Отозвать
                    </Button>
                    </Popconfirm>
            </>
        )}
    </Card>
  );
};

export default RecipientCard;