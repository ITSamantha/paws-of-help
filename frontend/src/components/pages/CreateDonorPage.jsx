import {
  Typography,
  Divider,
} from 'antd';
import CreateDonorForm from "../forms/CreateDonorForm";

const { Title, Text } = Typography;

export default function CreateDonorPage() {
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
      <Title level={1} style={{ textAlign: 'center' }}>Стать донором</Title>
      <Text type="secondary" style={{ fontSize: 16, textAlign: 'center', maxWidth: 600 }}>
        Один донор может спасти не одну жизнь — подарите надежду уже сегодня.
      </Text>

      <Divider style={{ margin: '48px 0', width: '100%' }} />

      <div style={{ width: '60%'}}>
        <CreateDonorForm />
      </div>
    </div>
  );
}
