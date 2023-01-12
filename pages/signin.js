import { Formik, Form } from 'formik';

export default function SignIn() {
  return (
    <>
      <h1>Sign In</h1>
      <Formik>
        {(form) => (
          <Form>
            <input />
          </Form>
        )}
      </Formik>
    </>
  );
}
