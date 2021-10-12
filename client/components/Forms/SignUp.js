import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BACKEND_URL } from '../../constants/index';

export const REGISTER = BACKEND_URL + '/auth/registration/';

const signUp = async (values) =>
    await fetch(REGISTER, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
    });

const SignUp = () => {
    const router = useRouter();

    const [form, setForm] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signUp(form);
            if (response.status === 201) {
                router.push('/sign-in');
            } else {
                alert('Ooops something wrong! Please try again');
            }
        } catch (error) {
            return null;
        }
    };

    const handleChange = (name) => (e) => {
        setForm((state) => ({
            ...state,
            [name]: e.target.value,
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <input placeholder="username" onChange={handleChange('username')} />
            <br />
            <input
                type="email"
                placeholder="email"
                onChange={handleChange('email')}
            />
            <br />
            <input
                type="password"
                placeholder="password1"
                onChange={handleChange('password1')}
            />
            <br />
            <input
                type="password"
                placeholder="password2"
                onChange={handleChange('password2')}
            />
            <br />
            <button>Submit</button>
            <br />
            <Link href="/sign-in">Already have an account?</Link>
        </form>
    );
};

export default SignUp;
