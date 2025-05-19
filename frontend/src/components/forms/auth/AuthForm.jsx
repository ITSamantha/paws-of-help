import React, { useState } from 'react';
import { Card, Button } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <Card title={isLogin ? 'Вход' : 'Регистрация'} style={{ width: 400, margin: '50px auto' }}>
      {isLogin
        ? <LoginForm onSuccess={() => window.location.reload()} />
        : <RegisterForm onSuccess={() => setIsLogin(true)} />
      }
      <Button type="link" onClick={toggleForm} style={{ marginTop: 10 }}>
        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войти'}
      </Button>
    </Card>
  );
}