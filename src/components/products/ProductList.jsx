import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import ProductSearch from './ProductSearch';
import ProductForm from './ProductCreate';
import ProductEdit from './ProductEdit';

const { confirm } = Modal;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const productList = await window.api.loadProducts();
      setProducts(productList);
      setFilteredProducts(productList); // Inicialmente muestra todos los productos
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };
  
  // Función para cargar productos desde la API de Electron
  useEffect(() => {
    loadProducts();
  }, []);

  const handleProductAdded = async () => {
    await loadProducts(); // Recargar la lista de productos después de agregar uno nuevo
  };

  const handleSearchResults = (results) => {
    if (results.length === 0 ) {
      setFilteredProducts([]);
    } else {
      const formattedResults = results.map((product) => ({
        ...product.dataValues,
        key: product.dataValues.id, // Añade un `key` único para cada fila
      }));
      setFilteredProducts(formattedResults);
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await window.api.deleteProduct(productId);
      loadProducts(); // Recargar la lista de productos después de eliminar uno
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
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
      key: 'retailPrice',
      render: (text, record) => (
        <span style={{ fontWeight: 'bold', color: '#333' }}>
          $ {(record.price * record.variant).toFixed(2)}
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
          <ProductEdit />
          <Button onClick={() => showDeleteConfirm(record.key)} danger>
            Borrar
          </Button>
        </Space>
      ),
    },
  ];

  return (
  <>
  <h2 style={{textAlign: 'center', fontSize: 'bold'}}>Total productos: {products.length}</h2>

  <ProductForm onProductAdded={handleProductAdded} />

  <ProductSearch onSearchResults={handleSearchResults} />

  <Table columns={columns} dataSource={filteredProducts} pagination={{ pageSize: 20 }} rowHoverable={true} />
  </>
  );
};

export default ProductList;
