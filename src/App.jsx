import React, { useState } from 'react';
import {
  BarsOutlined,
  CreditCardOutlined,
  TruckOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, ConfigProvider } from 'antd';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import Reports from './pages/Reports';
import locale from 'antd/es/locale/es_ES';
import 'moment/locale/es';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const { Header, Content, Footer, Sider } = Layout;

// Estilos para el Sider (barra lateral)
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
};

// Función para crear ítems del menú
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Ítems del menú
const items = [
  getItem(<Link to="/Products">Productos</Link>, '1', <BarsOutlined />),
  getItem(<Link to="/Suppliers">Proveedores</Link>, '2', <TruckOutlined />),
  getItem(<Link to="/Sales">Ventas</Link>, '3', <CreditCardOutlined />),
  getItem(<Link to="/Purchases">Compras</Link>, '4', <ShoppingCartOutlined />),
  getItem(<Link to="/Reports">Reportes</Link>, '5', <ShoppingCartOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider locale={locale}>
      <Router>
        <Layout hasSider>
          {/* Sider (barra lateral) */}
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={siderStyle}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Sider>

          <Layout style={{ marginLeft: collapsed ? 80 : 200, minHeight: '100vh' }}>
            {/* Header */}
            <Header style={{ padding: 0, background: colorBgContainer }} />

            {/* Content principal */}
            <Content
              style={{
                padding: 24,
                background: colorBgContainer,
                flexGrow: 1, // Para que ocupe todo el espacio restante
              }}
            >
              {/* Rutas del contenido */}
              <Routes>
                <Route path="/Products" element={<Products />} />
                <Route path="/Suppliers" element={<Suppliers />} />
                <Route path="/Sales" element={<Sales />} />
                <Route path="/Purchases" element={<Purchases />} />
                <Route path="/Reports" element={<Reports />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;