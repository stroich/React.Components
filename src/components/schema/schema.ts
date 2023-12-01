import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .required('Age is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .required('Please upload an image')
    .test('fileSize', 'Image size should be less than 1 MB', (value) => {
      return (value as File).size <= 1024 * 1024;
    })
    .test(
      'fileType',
      'Only files with .png, .jpeg, .jpg extensions are allowed',
      (value) => {
        return ['image/png', 'image/jpeg', 'image/jpg'].includes(
          (value as File).type
        );
      }
    ),
  country: yup.string().required('Country is required'),
});
