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

const SupplierCreate = ({onSupplierAdded}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierCreate, setSupplierCreate] = useState(false);
  const [form] = Form.useForm();

  const handleAddSupplier = async (values) => {
    try {
      const createSupplier = await window.api.addSupplier(values);
      if (createSupplier) {
        setSupplierCreate(true);
        form.resetFields();
        if (onSupplierAdded) {
          onSupplierAdded();
        }
      }
    } catch (error) {
      console.error("Error al agregar proveedor:", error);
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
        Agregar proveedor
      </Button>
      <Modal
        title="Agregar proveedor"
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
          onFinish={handleAddSupplier}
        >
          <Form.Item
            label="Nombre del proveedor"
            name="name"
            required
            tooltip="Nombre del proveedor"
          >
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            required
            tooltip="Email"
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Teléfono"
            name="phone"
            required
            tooltip="Teléfono"
          >
            <Input placeholder="Teléfono" />
          </Form.Item>
          <Form.Item
            label="Dirección"
            name="address"
            required
            tooltip="Dirección"
          >
            <Input placeholder="Dirección" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SupplierCreate;
