import Ad from './Ad';
import Top from './TOP';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Ad />
      <Top />
      <h1>next header</h1>
    </header>
  );
}
