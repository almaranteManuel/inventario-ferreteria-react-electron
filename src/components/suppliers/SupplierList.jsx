import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);


  // Función para cargar productos desde la API de Electron
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const SupplierList = await window.api.loadSuppliers();
        //console.log(SupplierList);
        setSuppliers(SupplierList);

      } catch (error) {
        console.error('Error loading suppliers:', error);
      }
    };

    loadSuppliers();
  }, []);

  // Define las columnas de la tabla
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>{text}</span>,
    },
    {
      title: 'Telefono',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>{text}</span>,
    },
    {
        title: 'Direccion',
        dataIndex: 'address',
        key: 'address',
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
  <Table columns={columns} dataSource={suppliers} pagination={{ pageSize: 20 }} rowHoverable={true} />
  </>
  );
};

export default SupplierList;
