import React from 'react';
import { Checkbox, Button, Typography } from 'antd';

const { Text } = Typography;

const TodoItem = ({ task, deleteTask, toggleCompleted }) => {
    const handleChange = () => {
        toggleCompleted(task.id);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <Checkbox checked={task.completed} onChange={handleChange}>
                <Text
                    style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#888' : 'inherit',
                    }}
                >
                    {task.description}
                </Text>
            </Checkbox>
            <Button type="primary" danger size="small" onClick={() => deleteTask(task.id)}>
                Delete
            </Button>
        </div>
    );
};

export default TodoItem;
