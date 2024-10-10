import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tag, Modal, DatePicker } from "antd";
import { useState } from "react";
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

const SaleEdit = ({sale, onSaleEdit}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleUpdateSale = async (values) => {
    try {
      const updatedValues = {
        ...values,
        date: values.date ? values.date.toISOString() : null,
      };
      const updatedSale = await window.api.editSale(sale.id, updatedValues);
      if (updatedSale) {
        setIsModalOpen(false);
        if (onSaleEdit) {
          onSaleEdit();
        }
      }
    } catch (error) {
      console.error("Error al actualizar la venta:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
      ...sale,
      date: sale.date ? dayjs(sale.date) : null
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
      <Button onClick={showModal} style={{ margin: 10 }}>
        Editar
      </Button>
      <Modal
        title="Editar venta"
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
          onFinish={handleUpdateSale}
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

export default SaleEdit;
