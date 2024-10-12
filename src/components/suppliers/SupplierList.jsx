import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import SupplierCreate from './SupplierCreate';
import SupplierEdit from './SupplierEdit';

const { confirm } = Modal;

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);


  // Función para cargar productos desde la API de Electron
  const loadSuppliers = async () => {
    try {
      const SupplierList = await window.api.loadSuppliers();
      //console.log(SupplierList);
      setSuppliers(SupplierList);

    } catch (error) {
      console.error('Error loading suppliers:', error);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleSupplierCreated = async () => {
    await loadSuppliers();
  };

  const handleUpdateSupplier = async () => {
    await loadSuppliers();
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      const deletedSupplier = await window.api.deleteSupplier(supplierId);
      
      if (deletedSupplier) {
        await loadSuppliers();
      }
    } catch (error) {
      console.error('Error deleting purchase:', error);
    }
  };

  const showDeleteConfirm = (supplierId) => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar esta venta?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        handleDeleteSupplier(supplierId);
      },
      onCancel() {
        console.log('Cancelado');
      },
    });
  };

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
      render: (text, record) => (
        <Space size="small">
          <SupplierEdit supplier={record} onSupplierEdit={handleUpdateSupplier} />
          <Button onClick={() => showDeleteConfirm(record.id)} danger>
            Borrar
          </Button>
        </Space>
      ),
    },
  ];

  return (
  <>
  <SupplierCreate onSupplierAdded={handleSupplierCreated} />
  <Table columns={columns} dataSource={suppliers} rowKey={(record) => record.id} pagination={{ pageSize: 20 }} rowHoverable={true} />
  </>
  );
};

export default SupplierList;
