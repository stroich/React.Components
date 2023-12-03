import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './CountryInput.module.css';
import { useSelector } from 'react-redux';
import { selectCountries } from '../../store/actions/countriesSlice.ts';
import { IHookForms } from '../../types/types.ts';

interface CountryInputProps {
  register?: UseFormRegister<IHookForms>;
  ref?: React.RefObject<HTMLInputElement>;
  errorMessage: string | undefined;
}

const CountryInput: React.FC<CountryInputProps> = ({
  register,
  errorMessage,
  ref,
}) => {
  const countries = useSelector(selectCountries);
  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    const filtered = countries.filter((country) =>
      country.toLowerCase().includes(inputValue)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="country">Country:</label>
      {ref && (
        <input
          type="text"
          list={`country-datalist`}
          ref={ref}
          onChange={handleInputChange}
        />
      )}
      {register && (
        <input
          type="text"
          list={`country-datalist`}
          {...register('country')}
          onChange={handleInputChange}
        />
      )}
      <datalist id={`country-datalist`}>
        {filteredCountries.map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default CountryInput;
