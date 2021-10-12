import useSWR from 'swr';

import CreateTask from '../../components/Forms/CreateTask';

const BACKEND_URL = 'http://localhost:8000';
const GET_ALL_TASKS = BACKEND_URL + '/api/tasks/?all';

const fetcher = (url) =>
    fetch(url, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    }).then((res) => res.json());

function Posts() {
    const { data, error } = useSWR(GET_ALL_TASKS, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="app posts">
            {data.length > 1 ? (
                <>
                    <div>
                        <CreateTask />
                        Tasks
                    </div>
                    {data.map((item) => (
                        <ul key={item.id}>
                            <li>{item.name}</li>
                        </ul>
                    ))}
                </>
            ) : (
                <>
                    <div>
                        <CreateTask />
                    </div>
                    There is no data
                </>
            )}
        </div>
    );
}

export default Posts;
