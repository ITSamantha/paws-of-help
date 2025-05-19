import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { getRegions } from '../../services/api';

const { Option } = Select;

export default function RegionSelect(){
    const [regions, setRegions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRegions = async () => {
        try {
            const types = await getRegions();
            setRegions(types);
        } catch (err) {
            setError('Не удалось загрузить города.');
        }
        };

        loadRegions();
    }, []);

    return (
          <Select
            style={{ width: '100%' }}
            placeholder="Выберите резус крови"
          >
            {regions.map(type => (
              <Option key={type.id} value={type.id}>
                {type.title}
              </Option>
            ))}
          </Select>
    );
};