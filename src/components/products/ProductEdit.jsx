import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tag, Modal } from "antd";
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

const ProductEdit = ({ product, onProductUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleUpdateProduct = async (values) => {
    //console.log('Producto actual antes de enviar:', { ...product, ...values });
    const updatedValues = {
      ...values,
      price: parseFloat(values.price),
      own_price: values.own_price ? parseFloat(values.own_price) : null,
      stock: parseInt(values.stock),
      variant: parseFloat(values.variant),
    };
    try {
      const updatedProduct = await window.api.editProduct(product.id, updatedValues);
      //console.log('Respuesta del servidor:', updatedProduct);
      if (updatedProduct && !updatedProduct.error) {
        setIsModalOpen(false);
        if (onProductUpdate) {
          onProductUpdate();
        }
      } else {
        console.error('Error al actualizar el producto:', updatedProduct.error);
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(product);
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
      <Button onClick={showModal} style={{ margin: 10 }}>
        Editar
      </Button>
      <Modal
        title="Editar producto"
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
          onFinish={handleUpdateProduct}
        >
          <Form.Item
            label="Variante del Producto"
            name="variant"
            required
            rules={[{ required: true, message: 'Por favor ingrese la Variante' }]}
            tooltip="Variante de identificación del producto"
          >
            <Input placeholder="Variante" />
          </Form.Item>
          <Form.Item
            label="Código del Producto"
            name="code"
            required
            rules={[{ required: true, message: 'Por favor ingrese el código' }]}
            tooltip="Código de identificación del producto"
          >
            <Input placeholder="Código" />
          </Form.Item>
          <Form.Item
            label="Nombre/Descripción"
            name="description"
            required
            rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
            tooltip="Ingresá el detalle del producto"
          >
            <Input placeholder="Nombre/Descripción" />
          </Form.Item>
          <Form.Item
            label="Precio Mayorista"
            name="price"
            required
            rules={[{ required: true, message: 'Por favor ingrese el precio mayorista' }]}
            tooltip="Ingresá el precio de lista"
          >
            <Input placeholder="Precio Mayorista" type="number" />
          </Form.Item>
          <Form.Item
            label="Precio Propio"
            name="own_price"
            tooltip="Ingresá el precio de venta por unidad"
          >
            <Input placeholder="Precio Propio" type="number" />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock"
            tooltip="Ingresá la cantidad de artículos por producto"
          >
            <Input placeholder="Cantidad" type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductEdit;
