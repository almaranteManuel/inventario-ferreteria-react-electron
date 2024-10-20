import React, { useEffect, useState } from 'react';
import { Card, Space, Statistic } from 'antd';
import {
  DollarCircleOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SalesBalance from '../components/sales/SalesBalance';

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
  const [countSuppliers, setCountSuppliers] = useState(0);
  const [totalSalesYear, setTotalSalesYear] = useState(0);
  const [totalPurchasesYear, setTotalPurchasesYear] = useState(0);
  const currentYear = new Date().getFullYear();

  const loadCountProducts = async () => {
    try {
      const response = await window.api.countProducts();
      setCountProducts(response.count);
    } catch (error) {
      console.error('Error al contar productos:', error);
    }
  };

  const loadCountSuppliers = async () => {
    try {
      const response = await window.api.countSuppliers();
      setCountSuppliers(response.count);
    } catch (error) {
      console.error('Error al contar proveedores:', error);
    }
  };

  const loadTotalSalesYear = async () => {
    const year = new Date().getFullYear();
    try {
      const response = await window.api.getSaleByYear(year);
      setTotalSalesYear(response.totalYearlySales);
    } catch (error) {
      console.error('Error al obtener el total de ventas del año:', error);
    }
  };

  const loadTotalPurchasesYear = async () => {
    const year = new Date().getFullYear();
    try {
      const response = await window.api.getPurchaseByYear(year);
      setTotalPurchasesYear(response.totalYearlyPurchases);
    } catch (error) {
      console.error('Error al obtener el total de compras del año:', error);
    }
  }

  useEffect(() => {
    loadCountProducts();
    loadCountSuppliers();
    loadTotalSalesYear();
    loadTotalPurchasesYear();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Inicio</h1>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          justifyContent: 'center',
          margin: '16px',
        }}
      >
        <DashboardCard
          icon={<ShoppingCartOutlined
            style={{
              color: "green",
              backgroundColor: "rgba(0,255,0,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }} />}
          title={`Total compras del año ${currentYear}`}
          value={typeof totalPurchasesYear === 'number' ? totalPurchasesYear.toFixed(2) : '0.00'} />
        <DashboardCard
          icon={<DollarCircleOutlined
            style={{
              color: "blue",
              backgroundColor: "rgba(0,0,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }} />}
          title={`Total ventas del año ${currentYear}`}
          value={typeof totalSalesYear === 'number' ? totalSalesYear.toFixed(2) : '0.00'} />
        <DashboardCard
          icon={<UserOutlined
            style={{
              color: "purple",
              backgroundColor: "rgba(0,255,255,0.25)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8,
            }} />}
          title={"Proveedores"}
          value={countSuppliers} />
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
      </div>

      <SalesBalance />
    </>
  );
}

export default Reports;
