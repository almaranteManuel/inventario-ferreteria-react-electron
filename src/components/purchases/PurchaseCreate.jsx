import { Button, Form, Input, Tag, Modal, DatePicker, Select } from "antd";
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

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const PurchaseCreate = ({ onPurchaseAdded }) => {
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

  const handleAddPurchase = async (values) => {
    try {
      const formattedValues = {
        ...values,
        date: values.date ? values.date.toISOString() : null,
      };

      const createSale = await window.api.addPurchase(formattedValues);
      if (createSale) {
        setIsModalOpen(false);
        form.resetFields();
        if (onPurchaseAdded) {
          onPurchaseAdded();
        }
      }
    } catch (error) {
      console.error("Error al agregar venta:", error);
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
        Agregar compra
      </Button>
      <Modal
        title="Agregar compra"
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
          onFinish={handleAddPurchase}
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

export default PurchaseCreate;
