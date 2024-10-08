import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);


  // Función para cargar productos desde la API de Electron
  useEffect(() => {
    const loadPurchases = async () => {
      try {
        const PurchaseList = await window.api.loadPurchases();
        //console.log(PurchaseList);
        setPurchases(PurchaseList);

      } catch (error) {
        console.error('Error loading suppliers:', error);
      }
    };

    loadPurchases();
  }, []);

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
      render: () => (
        <Space size="middle">
          <Button>Editar</Button>
          <Button>Borrar</Button>
        </Space>
      ),
    },
  ];

  return (
  <>
  <Table columns={columns} dataSource={purchases} pagination={{ pageSize: 20 }} rowHoverable={true} />
  </>
  );
};

export default PurchaseList;
