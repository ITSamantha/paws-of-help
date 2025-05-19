import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Select, DatePicker } from 'antd';
import { Line, Pie, Bar } from '@ant-design/plots';
import { getDonors } from '../../services/api';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const { RangePicker } = DatePicker;

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [donors, setDonors] = useState([]);
  const [dateRange, setDateRange] = useState([moment().subtract(30, 'days'), moment()]);
  const [selectedView, setSelectedView] = useState('month');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getDonors();
      setDonors(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDonorsOverTime = () => {
    const groupedData = donors.reduce((acc, donor) => {
      const date = moment(donor.created_at).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(groupedData).map(([date, count]) => ({
      date,
      count
    }));
  };

  const getPetTypeDistribution = () => {
    const distribution = donors.reduce((acc, donor) => {
      const petType = donor.pet?.pet_type?.title || 'Неизвестно';
      acc[petType] = (acc[petType] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(distribution).map(([type, count]) => ({
      type,
      value: count
    }));
  };

  const getStatusDistribution = () => {
    const distribution = donors.reduce((acc, donor) => {
      const status = donor.donor_status?.title || 'Неизвестно';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(distribution).map(([status, count]) => ({
      status,
      count
    }));
  };

  const donorsConfig = {
    data: getDonorsOverTime(),
    xField: 'date',
    yField: 'count',
    smooth: true,
    meta: {
      date: {
        range: [0, 1],
        formatter: (v) => moment(v).format('DD MMM YYYY')
      }
    },
    tooltip: {
      formatter: (data) => {
        return { name: 'Количество доноров', value: data.count };
      }
    }
  };

  const petTypeConfig = {
    data: getPetTypeDistribution(),
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name}: {percentage}'
    },
    interactions: [{ type: 'element-active' }]
  };

  const statusConfig = {
    data: getStatusDistribution(),
    xField: 'status',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    meta: {
      status: {
        alias: 'Статус'
      },
      count: {
        alias: 'Количество'
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          
        </Col>

        <Col span={24}>
          <Card 
            title="Динамика регистрации доноров" 
            style={{ marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <Line {...donorsConfig} />
          </Card>
        </Col>

        <Col span={12}>
          <Card 
            title="Распределение по типам животных" 
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <Pie {...petTypeConfig} />
          </Card>
        </Col>

        <Col span={12}>
          <Card 
            title="Распределение по статусам" 
            style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <Bar {...statusConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 