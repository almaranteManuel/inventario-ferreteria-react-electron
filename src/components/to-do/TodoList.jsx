import React, { useState, useEffect } from 'react';
import { Input, Card, message, Button } from 'antd';
import TodoItem from './TodoItem';

const { Search } = Input;

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const reminders = await window.api.loadReminders();
            setTasks(reminders);
        } catch (error) {
            message.error('Error al cargar los recordatorios.');
            console.error(error);
        }
    };

    const addTask = async (text) => {
        if (!text.trim()) {
            message.warning('El recordatorio no puede estar vacío.');
            return;
        }

        try {
            const newTask = { description: text, completed: false };
            const { id } = await window.api.addReminder(newTask);
            setTasks([...tasks, { id, description: text, completed: false }]);
            setText('');
            message.success('Recordatorio agregado.');
        } catch (error) {
            message.error('Error al agregar el recordatorio.');
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await window.api.deleteReminder(id);
            setTasks(tasks.filter((task) => task.id !== id));
            message.success('Recordatorio eliminado.');
        } catch (error) {
            message.error('Error al eliminar el recordatorio.');
            console.error(error);
        }
    };

    const toggleCompleted = async (id) => {
        try {
            const task = tasks.find((task) => task.id === id);
            const updatedTask = { ...task, completed: !task.completed };
            await window.api.updateReminder(id, { completed: updatedTask.completed });
            setTasks(
                tasks.map((task) =>
                    task.id === id ? updatedTask : task
                )
            );
            message.success('Recordatorio actualizado.');
        } catch (error) {
            message.error('Error al actualizar el recordatorio.');
            console.error(error);
        }
    };
    
    const toggleHideCompleted = () => {
        setHideCompleted(!hideCompleted);
    };

    return (
        <><Button
            type="primary"
            onClick={toggleHideCompleted}
            style={{ marginBottom: '10px', marginLeft: '15px' }}
        >
            {hideCompleted ? 'Mostrar completados' : 'Ocultar completados'}
        </Button>
        <Card
            title="Lista de Notas/Recordatorios"
            style={{ maxWidth: '90%', margin: '20px auto' }}
        >
                {tasks
                    .filter(task => !hideCompleted || !task.completed)
                    .map((task) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            toggleCompleted={toggleCompleted} />
                    ))}
                <Search
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    enterButton="Agregar nota/recordatorio"
                    onSearch={addTask}
                    placeholder="Ingresa tu recordatorio"
                    style={{ marginTop: '16px' }} />
            </Card></>
    );
}

export default TodoList;
