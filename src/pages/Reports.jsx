import React, { useEffect, useState } from 'react';
import { Card, Space, Statistic } from 'antd';
import {
  DollarCircleOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function Reports() {
  const [countProducts, setCountProducts] = useState(0);

  const loadCountProducts = async () => {
    try {
      const response = await window.api.countProducts();
      //console.log(response);
      setCountProducts(response.count);
    } catch (error) {
      console.error('Error al contar productos:', error);
    }
  };

  useEffect(() => {
    loadCountProducts();
  }, []); 

  return (

      <>
      <h1 style={{ textAlign: 'center' }}>Reportes / Detalles</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Space direction="horizontal">
        <DashboardCard
          icon={<ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgba(0,255,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }} />}
          title={"Compras"} />
        <DashboardCard
          icon={<DollarCircleOutlined
            style={{
              color: "blue",
              backgroundColor: "rgba(0,0,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }} />}
          title={"Ventas"} />
        <DashboardCard
          icon={<UserOutlined
            style={{
              color: "purple",
              backgroundColor: "rgba(0,255,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }} />}
          title={"Proveedores"} />
        <DashboardCard
          icon={<ShoppingOutlined
            style={{
              color: "red",
              backgroundColor: "rgba(255,0,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }} />}
          title={"Productos"}
          value={countProducts} />
      </Space>
    </div>
    </>

  );
}

export default Reports;
