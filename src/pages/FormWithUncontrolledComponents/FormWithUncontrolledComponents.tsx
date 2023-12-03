import { FormEvent, useRef, useState } from 'react';
import styles from '../HookForm/HookForm.module.css';
import { schema } from '../../components/schema/schema.ts';
import { IHookForms, IUpdatedValues } from '../../types/types.ts';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountries } from '../../store/actions/countriesSlice.ts';
import { addForm } from '../../store/actions/formsSlice.ts';
import { useNavigate } from 'react-router-dom';

const FormWithUncontrolledComponents = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const maleRadioRef = useRef<HTMLInputElement>(null);
  const femaleRadioRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const navigate = useNavigate();

  const handleImageChange = () => {
    const imageFile = imageRef.current?.files?.[0];
    console.log('Выбрано изображение:', imageFile);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const values: Partial<IHookForms> = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      gender: maleRadioRef.current?.checked
        ? 'male'
        : femaleRadioRef.current?.checked
          ? 'female'
          : '',
      picture: imageRef.current?.files || undefined,
      country: countryRef.current?.value || '',
    };

    schema
      .validate(values, { abortEarly: false })
      .then(() => {
        if (values.picture) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const updatedValues = { ...values, picture: reader.result };
            dispatch(addForm(updatedValues as IUpdatedValues));
          };
          reader.readAsDataURL(values.picture[0]);
        }
        navigate(`/`);
      })
      .catch((validationErrors) => {
        const newErrors: Record<string, string> = {};
        validationErrors.inner.forEach((error: yup.ValidationError) => {
          newErrors[error.path as string] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <div className={styles.pageWrapper}>
      <h1>The form created using uncontrolled components approach</h1>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Name:</label>
          <input ref={nameRef} type="text" id="name" />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="age">Age:</label>
          <input type="number" ref={ageRef} id="age" />
          {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email:</label>
          <input type="email" ref={emailRef} id="email" />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password:</label>
          <input type="password" ref={passwordRef} id="password" />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            ref={confirmPasswordRef}
            id="confirmPassword"
          />
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label>Gender:</label>
          <label>
            <input type="radio" ref={maleRadioRef} value="male" />
            Male
          </label>
          <label>
            <input type="radio" ref={femaleRadioRef} value="female" />
            Female
          </label>
          {errors.gender && (
            <p className={styles.errorMessage}>{errors.gender}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label>
            <input type="checkbox" ref={acceptTermsRef} id="acceptTerms" />
            Accept Terms & Conditions
          </label>
          {errors.acceptTerms && (
            <p className={styles.errorMessage}>{errors.acceptTerms}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            ref={imageRef}
            onChange={handleImageChange}
          />
          {errors.picture && (
            <p className={styles.errorMessage}>{errors.picture}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="country">Country:</label>
          <input list="countries" id="country" ref={countryRef} />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country}</p>
          )}
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormWithUncontrolledComponents;
