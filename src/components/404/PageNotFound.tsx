import Link from 'next/link';

import styles from './PageNotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>404 - Page Not Found</h2>
      <h4 className={styles.subtitle}>
        Sorry, the requested page does not exist.
      </h4>
      <Link className={styles.link} href="/">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
