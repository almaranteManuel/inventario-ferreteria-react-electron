import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal } from 'antd'; // Importa Modal para usar confirm
import SaleCreate from './SaleCreate';
import SaleEdit from './SaleEdit';

const { confirm } = Modal;

const SaleList = () => {
  const [sales, setSales] = useState([]);

  // Función para cargar ventas desde la API de Electron
  const loadSales = async () => {
    try {
      const SaleList = await window.api.loadSales();
      setSales(SaleList);
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

  const handleDeleteSale = async (saleId) => {
    try {
      const deletedSale = await window.api.deleteSale(saleId);
      
      if (deletedSale) {
        await loadSales(); // Recargar ventas después de eliminar una
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
        handleDeleteSale(saleId); // Eliminar la venta si se confirma
      },
      onCancel() {
        console.log('Cancelado');
      },
    });
  };

  // Define las columnas de la tabla
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
      render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>{text}</span>,
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
      <Table columns={columns} dataSource={sales} pagination={{ pageSize: 20 }} rowKey="id" />
    </>
  );
};

export default SaleList;
