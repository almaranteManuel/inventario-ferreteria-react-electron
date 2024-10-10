import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import ProductSearch from './ProductSearch';
import ProductForm from './ProductCreate';
import ProductEdit from './ProductEdit';

const { confirm } = Modal;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });

  // Función para cargar productos desde la API de Electron
  const loadProducts = async () => {
    try {
      const productList = await window.api.loadProducts();
      setProducts(productList);
      setFilteredProducts(productList); // Inicialmente muestra todos los productos
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleProductAdded = async () => {
    await loadProducts();
  };

  const handleProductUpdated = async () => {
    await loadProducts();
  };

  // Actualiza los resultados de la búsqueda
  const handleSearchResults = (results) => {
    //console.log('Resultados de la búsqueda:', results);
  
    if (results.length === 0) {
      setFilteredProducts([]); // Si no hay resultados, muestra una lista vacía
    } else {
      const formattedResults = results.map((product) => ({
        ...product.dataValues,  // Accede a los datos dentro de `dataValues`
        key: product.dataValues.id, // Asegúrate de que cada fila tenga un `key` único
        retail_price: product.dataValues.price * (product.dataValues.variant || 1.7), // Calcula el precio minorista
      }));
      setFilteredProducts(formattedResults); // Actualiza la lista filtrada
    }
  
    setPagination({ ...pagination, current: 1 }); // Reiniciar la paginación al realizar una búsqueda
  };
  

  // Manejar la eliminación de productos
  const handleDeleteProduct = async (productId) => {
    try {
      await window.api.deleteProduct(productId);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Confirmación de eliminación
  const showDeleteConfirm = (productId) => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar este producto?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        handleDeleteProduct(productId); // Eliminar el producto si se confirma
      },
      onCancel() {
        console.log('Cancelado');
      },
    });
  };

  // Define las columnas de la tabla
  const columns = [
    {
      title: 'Código',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>{text}</span>,
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>{text}</span>,
    },
    {
      title: 'Precio Mayorista',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span style={{ fontWeight: 'bold', color: '#333' }}>$ {text}</span>,
    },
    {
      title: 'Precio Minorista',
      dataIndex: 'retail_price',
      key: 'retail_price',
      render: (text) => (
        <span style={{ fontWeight: 'bold', color: '#333' }}>
          $ {parseFloat(text).toFixed(2)}
        </span>
      ),
    },
    {
      title: 'Precio Propio',
      key: 'own_price',
      render: (text, record) => (
        <span style={{ fontWeight: 'bold', color: '#333' }}>
          {record.own_price ? ('$ ' + record.own_price) : 'No definido'}
        </span>
      ),
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <ProductEdit product={record} onProductUpdate={handleProductUpdated} />
          <Button onClick={() => showDeleteConfirm(record.id)} danger>
            Borrar
          </Button>
        </Space>
      ),
    },
  ];

  // Maneja la paginación de la tabla
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Total productos: {products.length}</h2>

      <ProductForm onProductAdded={handleProductAdded} />

      <ProductSearch onSearchResults={handleSearchResults} />

      <Table
        columns={columns}
        dataSource={filteredProducts}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default ProductList;
