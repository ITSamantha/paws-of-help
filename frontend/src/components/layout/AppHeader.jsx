import { Layout, Button, Image } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AppMenu from './AppMenu';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingInline: 50,
  width: '100%',
  color: '#fff',
  height: 'auto',
  lineHeight: '64px',
  backgroundColor: '#fff',
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
};

export default function AppHeader() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth'); 
    window.location.reload(); 
  };

  return (
    <Layout.Header style={headerStyle}>
      <div style={logoContainerStyle}>
        <a href="/">
          <Image src="/static/logo.png" alt="Логотип" preview={false} height="60px" />
        </a>
        <AppMenu />
      </div>
      <div style={buttonGroupStyle}>
        {!isAuthenticated ? (
          <Link to="/auth">
            <Button type="primary" style={{ backgroundColor: '#fff', color: 'black', height: '46px' }}>
              Войти
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/profile">
              <Button
                type="primary"
                icon={<UserOutlined />}
                style={{
                  backgroundColor: '#fff',
                  color: 'black',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              />
            </Link>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              style={{ backgroundColor: '#fff', color: 'black', height: '46px' }}
              onClick={handleLogout}
            />
          </>
        )}
      </div>
    </Layout.Header>
  );
}
