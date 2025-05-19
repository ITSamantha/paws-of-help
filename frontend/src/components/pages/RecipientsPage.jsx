import {
  Layout,
  Spin,
  Col,
  Row,
  Image,
  Typography,
  Divider,
  Form,
  Select,
  DatePicker,
  Pagination,
} from 'antd';
import { useEffect, useState } from 'react';
import RecipientCard from '../cards/RecipientCard';
import { getRecipients, getClinics, getBloodComponents } from '../../services/api';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { Option } = Select;

const PAGE_SIZE = 20;

export default function RecipientsPage() {
  const [form] = Form.useForm();
  const [recipients, setRecipients] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [bloodComponents, setBloodComponents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [clinicsData, bloodComponentsData] = await Promise.all([
          getClinics(),
          getBloodComponents(),
        ]);
        setClinics(clinicsData);
        setBloodComponents(bloodComponentsData);

        const uniqueRegions = [
          ...new Set(clinicsData.map((c) => c.city?.region?.title).filter(Boolean)),
        ];
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('Ошибка при загрузке справочников:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchRecipients(currentPage, filters);
  }, [currentPage, filters]);

  const fetchRecipients = async (page, appliedFilters) => {
    
    setLoading(true);
    try {
      const limit = PAGE_SIZE;
      const offset = (page - 1) * PAGE_SIZE;

      const rawFilters = {
        ...appliedFilters
      };

      const { region, ...cleanedFilters } = rawFilters;

      const formattedFilters = Object.fromEntries(
        Object.entries(cleanedFilters).filter(([_, v]) => v !== undefined)
      );

      const allDataResponse = await getRecipients(1000, 0, formattedFilters);
      setTotal(allDataResponse.length);

      const paginatedData = allDataResponse.slice(offset, offset + limit);
      setRecipients(paginatedData);
    } catch (error) {
      console.error('Ошибка при загрузке реципиентов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (region) => {
    form.setFieldsValue({ city_id: undefined, clinic_id: undefined });

    const regionCities = [
      ...new Map(
        clinics
          .filter((c) => c.city?.region?.title === region)
          .map((c) => [c.city.id, { id: c.city.id, title: c.city.title }])
      ).values(),
    ];
    setCities(regionCities);
  };

  const handleFilter = (values) => {
    setFilters(values);
    setCurrentPage(1);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#fdfdfd' }}>
      <Content style={{ padding: '40px 80px' }}>
        <Row gutter={[32, 32]} style={{ marginTop: 30 }}>
          <Col span={24}>
            <Row justify="space-between" align="middle">
              <Col xs={10}>
                <Image
                  src="/static/index.jpg"
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

              <Col xs={12}>
                <Title level={1}>Реципиенты</Title>
                <Paragraph style={{ fontSize: '18px', lineHeight: '1.8', textAlign: 'justify' }}>
                  Каждый день сотни питомцев по всей стране нуждаются в переливании крови из-за
                  травм, операций или хронических заболеваний. Ваш питомец может стать героем и
                  подарить шанс на спасение другому животному!
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>

        <Divider style={{ margin: '48px 0 48px 0' }} />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFilter}
          onValuesChange={() => form.submit()}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="blood_component_id" label="Тип крови">
                <Select allowClear placeholder="Выберите компонент">
                  {bloodComponents.map((bc) => (
                    <Option key={bc.id} value={bc.id}>
                      {bc.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="region" label="Регион">
                <Select allowClear placeholder="Выберите регион" onChange={handleRegionChange}>
                  {regions.map((r) => (
                    <Option key={r} value={r}>
                      {r}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="city_id" label="Город">
                <Select allowClear placeholder="Выберите город">
                  {cities.map((city) => (
                    <Option key={city.id} value={city.id}>
                      {city.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="clinic_id" label="Клиника">
                <Select allowClear placeholder="Выберите клинику">
                  {clinics.map((clinic) => (
                    <Option key={clinic.id} value={clinic.id}>
                      {clinic.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {loading ? (
          <Spin size="large" style={{ marginTop: '100px' }} />
        ) : (
          <>
            <Row gutter={[24, 24]}>
              {recipients.map((recipient) => (
                <Col xs={24} sm={12} md={8} lg={6} key={recipient.id}>
                  <RecipientCard recipientData={recipient}  needsHelpButton={true} />
                </Col>
              ))}
            </Row>

            <Row justify="center" style={{ marginTop: 40 }}>
              <Pagination
                current={currentPage}
                total={total}
                pageSize={PAGE_SIZE}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </Row>
          </>
        )}
      </Content>
    </Layout>
  );
}
