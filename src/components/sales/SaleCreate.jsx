import { Button, Form, Input, Tag, Modal, DatePicker } from "antd";
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

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const SaleCreate = ({onSaleAdded}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleCreate, setSaleCreate] = useState(false);
  const [form] = Form.useForm();

  const handleAddSale = async (values) => {
    try {
      const formattedValues = {
        ...values,
        date: values.date ? values.date.toISOString() : null,
      };

      const createSale = await window.api.addSale(formattedValues);
      if (createSale) {
        setIsModalOpen(false);
        setSaleCreate(true);
        form.resetFields();
        if (onSaleAdded) {
          onSaleAdded();
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
        Agregar venta
      </Button>
      <Modal
        title="Agregar venta"
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
          onFinish={handleAddSale}
        >
          <Form.Item
            label="Fecha de la venta"
            name="date"
            required
            tooltip="Fecha en que se hizo la venta"
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Monto total"
            name="totalAmount"
            required
            tooltip="Monto que se gasta en la venta"
          >
            <Input placeholder="Monto" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SaleCreate;
