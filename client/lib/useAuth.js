import { useEffect, useState } from 'react';

import { BACKEND_URL } from '../constants/index';

export function useAuth() {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const result = await fetch(
                `${BACKEND_URL}/api/users/me/?format=json`,
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (result.ok) {
                setIsAuth(true);
                return;
            }
            setLoading(false);
        })();
    }, []);

    return [isAuth, loading];
}
