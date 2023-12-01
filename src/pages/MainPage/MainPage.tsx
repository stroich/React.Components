import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';
import { useSelector } from 'react-redux';
import { selectForms } from '../../store/actions/formsSlice.ts';
import FormDataDisplay from '../../components/Form/Form.tsx';

const MainPage = () => {
  const forms = useSelector(selectForms);
  return (
    <div className={styles.wrapper}>
      <h1>Main Page</h1>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link className={styles.link} to="/uncontrolledComponents">
              Uncontrolled components
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/hookForm">
              React Hook Form
            </Link>
          </li>
        </ul>
      </nav>
      {forms.length !== 0 && <FormDataDisplay />}
    </div>
  );
};

export default MainPage;
