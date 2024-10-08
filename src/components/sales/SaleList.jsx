import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';

const SaleList = () => {
  const [sales, setSales] = useState([]);


  // Función para cargar productos desde la API de Electron
  useEffect(() => {
    const loadSales = async () => {
      try {
        const SaleList = await window.api.loadSales();
        //console.log(SaleList);
        setSales(SaleList);

      } catch (error) {
        console.error('Error loading suppliers:', error);
      }
    };

    loadSales();
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
  <Table columns={columns} dataSource={sales} pagination={{ pageSize: 20 }} rowHoverable={true} />
  </>
  );
};

export default SaleList;
