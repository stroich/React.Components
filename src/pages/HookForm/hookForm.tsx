import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './HookForm.module.css';
import { schema } from '../../components/schema/schema.ts';
import { useSelector } from 'react-redux';
import { selectCountries } from '../../store/actions/countriesSlice.ts';

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const countries = useSelector(selectCountries);
  const onSubmit = () => {
    console.log(1);
  };
  return (
    <div className={styles.pageWrapper}>
      <h1>The form, but created with the help of the React Hook Form</h1>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Name:</label>
          <input {...register('name')} />
          {errors.name && (
            <p className={styles.errorMessage}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="age">Age:</label>
          <input type="number" {...register('age')} />
          {errors.age && (
            <p className={styles.errorMessage}>{errors.age.message}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email:</label>
          <input type="email" {...register('email')} />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="password">Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              {...register('gender', { required: true })}
              value="male"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              {...register('gender', { required: true })}
              value="female"
            />
            Female
          </label>
          {errors.gender && (
            <p className={styles.errorMessage}>{errors.gender.message}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label>
            <input type="checkbox" {...register('acceptTerms')} />
            Accept Terms & Conditions
          </label>
          {errors.acceptTerms && (
            <p className={styles.errorMessage}>{errors.acceptTerms.message}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="picture">Upload Picture:</label>
          <input type="file" {...register('picture')} name="picture" />
          {errors.picture && (
            <p className={styles.errorMessage}>{errors.picture.message}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="country">Country:</label>
          <input list="countries" {...register('country')} />
          <datalist id="countries">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country.message}</p>
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

export default HookForm;
