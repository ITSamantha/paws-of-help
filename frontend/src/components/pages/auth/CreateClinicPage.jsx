import React from 'react';
import CreateClinicForm from '../../forms/auth/CreateClinicForm';
import {
  Typography,
  Divider,
} from 'antd';

const { Title, Text } = Typography;

export default function CreateClinicPage() {
  return (
    <div
            style={{
                padding: '40px 16px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Title level={1} style={{ textAlign: 'center' }}>Стать партнером</Title>
            <Text type="secondary" style={{ fontSize: 16, textAlign: 'center', maxWidth: 600 }}>
                В экстренной ситуации важна каждая минута — найдите донора, который сможет спасти вашего питомца.
            </Text>

            <Divider style={{ margin: '48px 0', width: '100%' }} />

            <div style={{ width: '60%'}}>
                <CreateClinicForm />
            </div>
        </div>
  );
}
