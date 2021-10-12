import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Posts from './posts';

import { useAuth } from '../lib/useAuth';

export default function Index() {
    const [isAuth, loading] = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuth && !loading) {
            router.push('/sign-in');
        }
    }, [isAuth, loading]);

    return <Posts />;
}
