import { InfoCircleOutlined } from "@ant-design/icons";
import create from "@ant-design/icons/lib/components/IconFont";
import { Button, Form, Input, Tag, Modal, Alert } from "antd";
import { useState } from "react";

const customizeRequiredMark = (label, { required }) => (
  <>
    {required ? (
      <Tag color="error">Obligatorio</Tag>
    ) : (
      <Tag color="warning">Opcional</Tag>
    )}
    {label}
  </>
);

const ProductForm = ({onProductAdded}) => {
  const [productCreate, setProductCreate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddProduct = async (values) => {
    try {
      const createProduct = await window.api.addProduct(values);
      if (createProduct) {
        setIsModalOpen(false);
        setProductCreate(true);
        form.resetFields(); // Limpia el formulario
        if (onProductAdded) {
          onProductAdded(); // Llama la función para actualizar la lista de productos
        }
      } else {
        productCreate(false);
        console.error('Error al agregar el producto');
      }
    } catch (error) {
      productCreate(false);
      console.error('Error en la comunicación con el backend:', error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        color="default"
        variant="solid"
        onClick={showModal}
        style={{ margin: 10 }}
      >
        Agregar producto
      </Button>
      {
        productCreate && (
          <Alert message="Producto creado correctamente!" type="success" showIcon closable />
        )
      }
      <Modal
        title="Agregar producto"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={customizeRequiredMark}
          onFinish={handleAddProduct}
          initialValues={{
            variant: 1.7,
          }}
        >
          <Form.Item
            label="Variante de venta"
            name="variant"
            tooltip="Variante que se aplica para determinar precio de venta"
          >
            <Input placeholder="Variante" />
          </Form.Item>
          <Form.Item
            label="Código del Producto"
            name="code"
            required
            tooltip="Código de identificación del producto"
          >
            <Input placeholder="Código" />
          </Form.Item>
          <Form.Item
            label="Nombre/Descripción"
            name="description"
            required
            tooltip="Ingresá el detalle del producto"
          >
            <Input placeholder="Nombre/Descripción" />
          </Form.Item>
          <Form.Item
            label="Precio Mayorista"
            name="price"
            required
            tooltip="Ingresá el precio de lista"
          >
            <Input placeholder="Precio Mayorista" />
          </Form.Item>
          <Form.Item
            label="Precio Propio"
            name="own_price"
            tooltip={{
              title: "Ingresá el precio de venta por unidad",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input placeholder="Precio Propio" />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock"
            tooltip={{
              title: "Ingresá la cantidad de artículos por producto",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input placeholder="Cantidad" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductForm;
