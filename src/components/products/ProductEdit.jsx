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

const ProductEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        color="primary"
        variant="solid"
        onClick={showModal}
        style={{ margin: 10 }}
      >
        Editar
      </Button>
      <Modal
        title="Editar producto"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={customizeRequiredMark}
        >
          <Form.Item
            label="Código del Producto"
            required
            tooltip="Código de identificación del producto"
          >
            <Input placeholder="Código" />
          </Form.Item>
          <Form.Item
            label="Nombre/Descripción"
            required
            tooltip="Ingresá el detalle del producto"
          >
            <Input placeholder="Nombre/Descripción" />
          </Form.Item>
          <Form.Item
            label="Precio Mayorista"
            required
            tooltip="Ingresá el precio de lista"
          >
            <Input placeholder="Precio Mayorista" />
          </Form.Item>
          <Form.Item
            label="Precio Propio"
            tooltip={{
              title: "Ingresá el precio de venta por unidad",
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input placeholder="Precio Propio" />
          </Form.Item>
          <Form.Item
            label="Stock"
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

export default ProductEdit;
