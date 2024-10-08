import { InfoCircleOutlined } from "@ant-design/icons";
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

const PurchaseCreate = () => {
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
        >
          <Form.Item
            label="Fecha de la compra"
            required
            tooltip="Fecha en que se hizo la compra"
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Monto total"
            required
            tooltip="Monto que se gasta en la compra"
          >
            <Input placeholder="Monto" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PurchaseCreate;
