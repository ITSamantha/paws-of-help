import { useEffect, useState } from 'react';
import {
  Table,
  Typography,
  Layout,
  Spin,
  Row,
  Col,
  Divider,
  Image,
  Input,
  Select,
  Space,
} from 'antd';
import { getClinics } from '../../services/api';

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

export default function ClinicsPage() {
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const data = await getClinics();
        setClinics(data);
        setFilteredClinics(data);

        // Получаем уникальные города и регионы
        const uniqueCities = [...new Set(data.map(c => c.city?.title).filter(Boolean))];
        const uniqueRegions = [...new Set(data.map(c => c.city?.region?.title).filter(Boolean))];

        setCities(uniqueCities);
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('Ошибка при загрузке клиник:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  useEffect(() => {
    let result = clinics;

    if (searchTitle) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (selectedCity) {
      result = result.filter(c => c.city?.title === selectedCity);
    }

    if (selectedRegion) {
      result = result.filter(c => c.city?.region?.title === selectedRegion);
    }

    setFilteredClinics(result);
  }, [searchTitle, selectedCity, selectedRegion, clinics]);

  const columns = [
    { title: 'Название', dataIndex: 'title', key: 'title' },
    { title: 'Город', dataIndex: ['city', 'title'], key: 'city' },
    { title: 'Регион', dataIndex: ['city', 'region', 'title'], key: 'region' },
    { title: 'Адрес', dataIndex: 'address', key: 'address' },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => <a href={`mailto:${email}`}>{email}</a>,
    },
    { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Сайт',
      dataIndex: 'url',
      key: 'url',
      render: url => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
  ];

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Content style={{ padding: '40px 80px' }}>
        <Row gutter={[32, 32]} style={{ marginTop: 30 }}>
          <Col span={24}>
            <Row justify="space-between" align="middle">
              <Col xs={12}>
                <Title level={1}>Клиники-партнеры</Title>
                <Paragraph style={{ fontSize: '18px', lineHeight: '1.8', textAlign: 'justify' }}>
                  Партнёрские клиники — это проверенные ветеринарные учреждения, которые поддерживают инициативу донорства среди животных.
                  Благодаря их профессионализму и заботе мы обеспечиваем безопасность и комфорт как донорам, так и реципиентам.
                  Здесь Вы можете найти ближайшую клинику, узнать контактную информацию и обратиться за консультацией или сдачей крови.
                </Paragraph>
              </Col>
              <Col xs={10}>
                <Image
                  src="/static/clinics.jpg"
                  alt="Главное изображение"
                  width="100%"
                  height={500}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '32px',
                  }}
                  preview={false}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Divider style={{ margin: '48px 0' }} />

        <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 24 }} size="large">
            <Col>
                <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <Search
                    placeholder="Поиск по названию"
                    allowClear
                    onChange={e => setSearchTitle(e.target.value)}
                    style={{ width: 250 }}
                />
                </div>
            </Col>
            <Col>
                <Select
                placeholder="Город"
                allowClear
                style={{ width: 200 }}
                onChange={value => setSelectedCity(value)}
                >
                {cities.map(city => (
                    <Option key={city} value={city}>
                    {city}
                    </Option>
                ))}
                </Select>
            </Col>
            <Col>
                <Select
                placeholder="Регион"
                allowClear
                style={{ width: 200 }}
                onChange={value => setSelectedRegion(value)}
                >
                {regions.map(region => (
                    <Option key={region} value={region}>
                    {region}
                    </Option>
                ))}
                </Select>
            </Col>
            </Row>



        {loading ? (
          <Spin size="large" style={{ marginTop: 50 }} />
        ) : (
          <Table
            dataSource={filteredClinics}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 10 }}
            style={{ marginTop: 24 }}
          />
        )}
      </Content>
    </Layout>
  );
}
