// import styles from '../styles/Home.module.scss';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <h1>next home</h1>
    </>
  );
}
