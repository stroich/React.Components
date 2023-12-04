import React from 'react';
import { useSelector } from 'react-redux';
import { selectForms } from '../../store/actions/formsSlice.ts';
import styles from './FormData.module.css';
import { ImageDisplay } from '../ImageDisplay/ImageDispay.tsx';
import ElementForm from '../ElementForm/ElementForm.tsx';

const FormDataDisplay: React.FC = () => {
  const forms = useSelector(selectForms);

  return (
    <div className={styles.wrapperList}>
      <h2 className={styles.title}>List of Submitted Forms</h2>
      <div className={styles.listOfForm}>
        {forms.map((form, index) => (
          <div key={index}>
            <h3>Form {index + 1}</h3>
            <ul>
              {Object.entries(form).map(([key, value]) => (
                <li key={key}>
                  {key === 'picture' ? (
                    <ImageDisplay image={value} />
                  ) : (
                    <ElementForm id={key} value={value.toString()} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormDataDisplay;
