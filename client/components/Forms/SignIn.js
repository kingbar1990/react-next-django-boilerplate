import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { BACKEND_URL } from '../../constants/index';

export const LOGIN = BACKEND_URL + '/auth/login/';

const signIn = async (values) =>
    await fetch(LOGIN, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values }),
    });

const SignInForm = () => {
    const router = useRouter();

    const [form, setForm] = useState(null);
    const [errors, setErrors] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signIn(form);
            setErrors(null);
            if (response.status === 200) {
                const data = await response.json();
                localStorage.setItem('token', data.key);
                router.push('/posts');
            } else {
                const data = await response.json();
                setErrors(data.non_field_errors.toString());
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
        <div className="app">
            <form onSubmit={onSubmit}>
                <input
                    placeholder="username"
                    onChange={handleChange('username')}
                />
                <br />
                <input
                    type="password"
                    placeholder="password"
                    onChange={handleChange('password')}
                />
                <br />
                <button>Submit</button>
                <br />
                <Link href="/sign-up">Don't have an account?</Link>
                {errors && <p className="error-validation">{errors}</p>}
            </form>
        </div>
    );
};

export default SignInForm;
