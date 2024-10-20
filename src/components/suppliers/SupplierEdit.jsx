import { Button, Form, Input, Tag, Modal } from "antd";
import { useState, useEffect } from "react";

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

const SupplierEdit = ({supplier, onSupplierEdit}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierEdit, setSupplierEdit] = useState(false);
  const [form] = Form.useForm();

  const handleUpdateSupplier = async (values) => {
    try {
      const updateSupplier = await window.api.editSupplier(
        supplier.id,
        values
    );
      if (updateSupplier) {
        setSupplierEdit(true);
        form.resetFields();
        if (onSupplierEdit) {
          onSupplierEdit();
        }
      }
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(supplier);
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
        onClick={showModal}
        style={{ margin: 10 }}
      >
        Editar
      </Button>
      <Modal
        title="Editar proveedor"
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
          onFinish={handleUpdateSupplier}
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

export default SupplierEdit;
