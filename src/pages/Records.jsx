import React, { useState, useEffect } from 'react';
import { Badge, Calendar, Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const Records = () => {
    const [reminders, setReminders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [form] = Form.useForm();

    const loadReminders = async () => {
        try {
            const remindersData = await window.api.loadReminders();
            //console.log('Recordatorios cargados:', remindersData);
            setReminders(remindersData);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    useEffect(() => {
        loadReminders();
    }, []);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleAddReminder = async (values) => {
        const newReminder = {
            title: values.title,
            description: values.description,
            due_date: selectedDate.toISOString(),
            status: values.status,
        };

        const response = await window.api.addReminder(newReminder);

        if (!response.error) {
            setReminders([...reminders, { ...newReminder, id: response.id }]);
        }

        setIsModalOpen(false);
        form.resetFields();
    };

    const getListData = (value) => {
      return reminders.filter(reminder => {
          const reminderDate = new Date(reminder.due_date).toLocaleDateString('en-CA');
          const calendarDate = value.format('YYYY-MM-DD');
          return reminderDate === calendarDate;      
      });
    };
  
    const dateCellRender = (current) => {
        const listData = getListData(current);
        return (
            <ul className="events" style={{listStyle: 'none', margin: 0, padding: 0}}>
                {listData.map(item => (
                    <li key={item.id}>
                        <Badge status={item.status === 'pending' ? 'warning' : 'success'} text={item.description} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Recordatorios</h1>
            <Calendar cellRender={dateCellRender} onSelect={handleDateClick} />
            <Modal
                title="Agregar Recordatorio"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddReminder}>
                    <Form.Item name="title" label="Título" rules={[{ required: true, message: 'Por favor ingrese un título' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Descripción">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="status" label="Estado" rules={[{ required: true, message: 'Seleccione el estado' }]}>
                        <Select>
                            <Option value="pending">Pendiente</Option>
                            <Option value="done">Completado</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Agregar Recordatorio
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Records;
