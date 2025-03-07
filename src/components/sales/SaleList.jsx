import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Typography, DatePicker } from 'antd';
import SaleCreate from './SaleCreate';
import SaleEdit from './SaleEdit';
import moment from 'moment/moment'
moment.locale('es');

const { Text } = Typography;
const { confirm } = Modal;

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const loadSales = async () => {
    try {
      const saleList = await window.api.loadSales();
      setSales(saleList);
      setFilteredSales(saleList);
      const total = saleList.reduce((sum, sale) => sum + sale.totalAmount, 0);
      setTotalSales(total);
    } catch (error) {
      console.error('Error loading sales:', error);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  const handleSaleAdded = async () => {
    await loadSales();
  };

  const handleSaleUpdated = async () => {
    await loadSales();
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setFilteredSales(sales);
    const total = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    setTotalSales(total);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setFilteredSales(sales);
    const total = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    setTotalSales(total);
  };

  const onMonthChange = (date, dateString) => {
    if (dateString) {
      const filtered = sales.filter(sale =>
        moment(sale.date, 'YYYY-MM-DD HH:mm:ss.SSS Z').format('YYYY-MM') === dateString
      );
      setFilteredSales(filtered);
      const total = filtered.reduce((sum, sale) => sum + sale.totalAmount, 0);
      setTotalSales(total);
    } else {
      setFilteredSales(sales);
      const total = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
      setTotalSales(total);
    }
  };

  const handleDeleteSale = async (saleId) => {
    try {
      const deletedSale = await window.api.deleteSale(saleId);
      if (deletedSale) {
        await loadSales();
      }
    } catch (error) {
      console.error('Error al borrar la venta:', error);
    }
  };

  const showDeleteConfirm = (saleId) => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar esta venta?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        handleDeleteSale(saleId);
      },
      onCancel() {
        console.log('Cancelado');
      },
    });
  };

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        const formattedDate = new Date(text).toLocaleDateString();
        return <span style={{ fontWeight: 'bold', color: '#333' }}>{formattedDate}</span>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      sortOrder: sortedInfo.columnKey === 'totalAmount' ? sortedInfo.order : null,
      render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>$ {text}</span>,
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <SaleEdit sale={record} onSaleEdit={handleSaleUpdated} />
          <Button onClick={() => showDeleteConfirm(record.id)} danger>
            Borrar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <SaleCreate onSaleAdded={handleSaleAdded} />
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <DatePicker
          picker="month"
          onChange={onMonthChange}
          placeholder="Seleccionar mes"
        />
        <Button onClick={clearFilters}>Limpiar filtros</Button>
        <Button onClick={clearAll}>Limpiar todo</Button>
      </Space>
      <br />
      <Text strong style={{ paddingInline: 10, fontSize: 20 }}>
        Total ventas: ${totalSales.toFixed(2)}
      </Text>
      <Table
        columns={columns}
        dataSource={filteredSales}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 20 }}
        onChange={handleChange}
      />
    </>
  );
};

export default SaleList;
