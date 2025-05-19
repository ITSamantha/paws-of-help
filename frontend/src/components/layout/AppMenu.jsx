import { Menu, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { meUser } from '../../services/api'; // не забудь подключить

const menuStyle = {
  backgroundColor: "transparent",
  width: "40%",
  fontSize: '18px',
};

export default function AppMenu() {
  const [current, setCurrent] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndBuildMenu = async () => {
      try {
        const user = await meUser();

        const baseMenu = [
          {
            label: 'Информация о донорстве',
            key: 'main_information',
            children: [
              {
                label: <Link to="/donor/how-to">Как стать донором?</Link>,
                key: 'donor_information',
              },
              {
                label: <Link to="/donor/faq">Часто задаваемые вопросы</Link>,
                key: 'donor_faq',
              },
              {
                label: <Link to="/donor/success-stories">Истории успеха</Link>,
                key: 'success_stories',
              },
              {
                label: <Link to="/clinics">Клиники-партнеры</Link>,
                key: 'clinics',
                children: [
                  {
                    label: <Link to="/clinic">Стать партнером</Link>,
                    key: 'become_partner',
                  },
                ],
              },
            ],
          },
          {
            label: <Link to="/donor/find">Найти донора</Link>,
            key: 'find_donor',
          },
          {
            label: <Link to="/recipients">Реципиенты</Link>,
            key: 'recipients',
          },
          {
            label: <Link to="/donation">Поддержать проект</Link>,
            key: 'donation',
          },
        ];

        // Добавляем пункт меню для клиники, если у пользователя есть клиника
        if (user && user.clinic) {
          baseMenu.push({
            label: 'Управление клиникой',
            key: 'clinic_management',
            children: [
              {
                label: <Link to="/clinics/requests">Запросы клиники</Link>,
                key: 'clinic_requests',
              },
              {
                label: <Link to="/analytics">Аналитика</Link>,
                key: 'analytics',
              }
            ]
          });
        }

        if (user && user.user_role?.id === 1) {
          baseMenu.push({
            label: <Link to="/admin">Администраторская панель</Link>,
            key: 'admin_panel',
          });
        }

        // Обновляем раздел "Информация о донорстве"
        const informationIndex = baseMenu.findIndex(item => item.key === 'main_information');
        if (informationIndex !== -1) {
        }

        setMenuItems(baseMenu);
      } catch (error) {
        console.error('Ошибка при получении пользователя:', error);
        // пользователь не авторизован — показываем только базовое меню
        setMenuItems([
          {
            label: 'Информация о донорстве',
            key: 'main_information',
            children: [
              {
                label: <Link to="/donor/how-to">Как стать донором?</Link>,
                key: 'donor_information',
              },
              {
                label: <Link to="/donor/faq">Часто задаваемые вопросы</Link>,
                key: 'donor_faq',
              },
              {
                label: <Link to="/donor/success-stories">Истории успеха</Link>,
                key: 'success_stories',
              },
              {
                label: <Link to="/clinics">Клиники-партнеры</Link>,
                key: 'clinics',
                children: [
                  {
                    label: <Link to="/clinic">Стать партнером</Link>,
                    key: 'become_partner',
                  },
                ],
              },
            ],
          },
          {
            label: <Link to="/donor/find">Найти донора</Link>,
            key: 'find_donor',
          },
          {
            label: <Link to="/recipients">Реципиенты</Link>,
            key: 'recipients',
          },
          {
            label: <Link to="/donation">Поддержать проект</Link>,
            key: 'donation',
          },
        ]);
      }
    };

    fetchUserAndBuildMenu();
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={menuItems}
      style={menuStyle}
    />
  );
}
