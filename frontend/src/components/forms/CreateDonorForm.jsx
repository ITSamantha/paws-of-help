import PetSelect from "../select/PetSelect";
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio, Select, Spin, DatePicker, message } from 'antd';
import RecipientCard from "../cards/RecipientCard";
import { useNavigate, useLocation  } from "react-router-dom";
import { getRecipientById, meUser, postDonor } from "../../services/api";
import dayjs from 'dayjs';

const formStyle = {
  width: '100%',
  marginTop: "48px"
};

export default function CreateDonorForm(){
    const [form] = Form.useForm();

    const [user, setUser] = useState(null);

    const [recipient, setRecipient] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const recipientId = location.state?.recipientId;

    useEffect(() => {

        if (!recipientId) {
            navigate('/recipients');
            return;
        }

        const fetchRecipient = async () => {
            const currentUser = await meUser();
            setUser(currentUser);

            if (!currentUser) {
                    navigate('/auth');
                    return;
            }

            try {
                const data = await getRecipientById(recipientId);

                if (!data) {
                    console.warn('Реципиент не найден');
                    navigate('/recipients');
                    return;
                }

                setRecipient(data);
                console.log(data)
                form.setFieldsValue({ recipient_id: recipientId });
                
            } catch (error) {
                console.error("Ошибка при загрузке реципиента:", error);
                navigate('/recipients');
            } finally {
                setLoading(false);
            }
        };

    fetchRecipient();
    }, [recipientId]);

    const handleFinish = async (values) => {
        try {
            const cleanedValues = {
            ...values,
            donation_date: dayjs(values.donation_date).toDate(), 
            };

            const response = await postDonor(cleanedValues);

            if (response && response.status === 200) {
            message.success('Заявка успешно отправлена! В личном кабинете ожидайте подтверждение клиники.');
            navigate('/profile'); 
            } else {
            message.error('Что-то пошло не так при отправке формы. Попробуйте ещё раз.');
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            message.error('Произошла ошибка. Попробуйте позже.');
        }
        };

    if (loading) return <Spin />;

    return (
    <>
      <RecipientCard recipientData={recipient} needsHelpButton={false}  />
      

      <Form layout="vertical" form={form} style={formStyle} size="large" onFinish={handleFinish}>
        <Form.Item name="recipient_id" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="Питомец" name="pet_id" rules={[{ required: true, message: 'Выберите питомца' }]}>
          <PetSelect
            userId={user.id}
            value={form.getFieldValue('pet_id')}
            onChange={(value) => form.setFieldsValue({ pet_id: value })}
          />
        </Form.Item>

        <Form.Item
          label="Дата записи"
          name="donation_date"
          rules={[{ required: true, message: 'Выберите дату' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="DD.MM.YYYY"
            showTime={{ format: 'HH:mm' }}
            disabledDate={(current) => {
                return current && current > dayjs(recipient.due_date);
            }}
            />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Стать донором
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
