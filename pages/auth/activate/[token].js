import jwt from 'jsonwebtoken';
import db from '../../../utils/db';
import User from '../../../models/User';
import { ObjectId } from 'mongodb';

export default function Confirm({ email, error }) {
  return (
    <>
      {email && <div>{email}</div>}
      {error && <div>{error}</div>}
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.query;
  const { id } = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);

  db.connectDB();

  const getUser = await User.findById(ObjectId(id));

  if (!getUser) {
    return {
      props: {
        email: '',
        error: 'Can not verify user.',
      },
    };
  }

  await getUser.updateOne({ emailVerified: true });

  db.disconnectDB();

  return {
    props: {
      email: getUser.email,
      error: '',
    },
  };
}
