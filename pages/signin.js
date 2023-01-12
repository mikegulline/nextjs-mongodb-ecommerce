import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Input from '../components/inputs/Input';
import { getProviders, signIn } from 'next-auth/react';

const initialValues = {
  login_email: '',
  login_password: '',
};

export default function SignIn({ providers }) {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email.'),
    login_password: Yup.string().required('Please enter a strong password'),
  });

  return (
    <>
      <h1>Sign In</h1>
      <Formik
        enableReinitialize
        initialValues={{
          login_email,
          login_password,
        }}
        validationSchema={loginValidation}
      >
        {(form) => (
          <Form>
            <Input
              type='text'
              name='login_email'
              icon='email'
              placeholder='Email Address'
              onChange={handleChange}
              value={login_email}
            />
            <Input
              type='password'
              name='login_password'
              icon='password'
              placeholder='Password'
              onChange={handleChange}
              value={login_password}
            />
          </Form>
        )}
      </Formik>
      <br />
      <div>Or sign in with…</div>
      {providers.map(({ name, id }) => {
        if (name === 'Credentials') return;

        return (
          <span key={id}>
            <button onClick={() => signIn(id)}>{name}</button>{' '}
          </span>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());

  return {
    props: { providers },
  };
}
