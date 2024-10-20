import { Button, Form, Input, Tag, Modal, DatePicker, Select } from "antd";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';

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

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const PurchaseUpdate = ({ purchase, onPurchaseEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [form] = Form.useForm();

  const loadSuppliers = async () => {
    try {
      const supplierList = await window.api.loadSuppliers();
      setSuppliers(supplierList);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleUpdatePurchase = async (values) => {
    try {
      const updatedValues = {
        ...values,
        date: values.date ? values.date.toISOString() : null,
      };
      const updatedPurchase = await window.api.editPurchase(
        purchase.id,
        updatedValues
      );
      if (updatedPurchase) {
        setIsModalOpen(false);
        if (onPurchaseEdit) {
          onPurchaseEdit();
        }
      }
    } catch (error) {
      console.error("Error al actualizar la compra:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
        ...purchase,
        date: purchase.date ? dayjs(purchase.date) : null
    });
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
        title="Editar compra"
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
          onFinish={handleUpdatePurchase}
        >
          <Form.Item
            label="Fecha de la compra"
            name="date"
            required
            tooltip="Fecha en que se hizo la compra"
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Monto total"
            name="totalAmount"
            required
            tooltip="Monto que se gasta en la compra"
          >
            <Input placeholder="Monto" />
          </Form.Item>
          <Form.Item
            label="Proveedor"
            name="supplier_id"
            required
            tooltip="Selecciona el proveedor"
          >
            <Select placeholder="Selecciona un proveedor">
              {suppliers.map((supplier) => (
                <Select.Option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        
      </Modal>
    </>
  );
};

export default PurchaseUpdate;
