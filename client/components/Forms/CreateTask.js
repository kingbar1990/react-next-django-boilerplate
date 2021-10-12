import { useState } from 'react';
import { useSWRConfig } from 'swr';

import { BACKEND_URL } from '../../constants/index';

const create = async (name) =>
    await fetch(`${BACKEND_URL}/api/tasks/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            name: name,
            description: 'description',
            estimated_time: 1,
            status: 1,
            due_date: new Date().toISOString().split('T')[0],
            assigned_to_user: 1,
        }),
    });

const CreateTask = () => {
    const { mutate } = useSWRConfig();

    const [name, setName] = useState('');

    const createTask = async () => {
        try {
            const response = await create(name);
            const data = await response.json();

            if (data) {
                mutate(`${BACKEND_URL}/api/tasks/?all`);
                setName('');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div style={{ marginBottom: 10 }}>
            <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={createTask}>Create</button>
        </div>
    );
};

export default CreateTask;
