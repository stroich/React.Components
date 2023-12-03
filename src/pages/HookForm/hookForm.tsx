import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './HookForm.module.css';
import { schema } from '../../components/schema/schema.ts';
import { useDispatch } from 'react-redux';
import { addForm } from '../../store/actions/formsSlice.ts';
import { IHookForms, IUpdatedValues } from '../../types/types.ts';
import { useNavigate } from 'react-router-dom';
import CountryInput from '../../components/CountryInput/CountryInput.tsx';
import Star from '../../components/Star/Star.tsx';
import { ChangeEvent, useState } from 'react';
import { getPasswordStrength } from '../../helpers/getPasswordStrength.ts';

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IHookForms>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState(0);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const strength = getPasswordStrength(value);
    if (e.target.id === 'password') {
      setPasswordStrength(strength);
    } else {
      setConfirmPasswordStrength(strength);
    }
  };

  const onSubmit: SubmitHandler<IHookForms> = (data) => {
    if (data.picture) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedValues = { ...data, picture: reader.result };
        dispatch(addForm(updatedValues as IUpdatedValues));
      };
      reader.readAsDataURL(data.picture[0]);
      navigate(`/`);
    }
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
          <input
            type="password"
            id="password"
            {...register('password')}
            onChange={handlePasswordChange}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
          <Star passwordStrength={passwordStrength} />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword')}
            id="confirmPassword"
            onChange={handlePasswordChange}
          />
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
          <Star passwordStrength={confirmPasswordStrength} />
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

        <CountryInput
          register={register}
          errorMessage={errors.country?.message}
        />

        <div className={styles.buttonWrapper}>
          <button className={styles.submit} type="submit" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HookForm;
