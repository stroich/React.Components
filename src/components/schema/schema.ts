import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least 8 characters, including 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed<FileList>()
    .test('is-file-uploaded', 'Please upload an image', (value) => {
      return value instanceof FileList && value.length !== 0;
    })
    .test('fileSize', 'Image size should be less than 1 MB', (value) => {
      if ((value as FileList).length !== 0) {
        return (value as FileList)[0].size <= 1024 * 1024;
      }
    })
    .test(
      'fileType',
      'Only files with .png, .jpeg, .jpg extensions are allowed',
      (value) => {
        if ((value as FileList).length !== 0) {
          return ['image/png', 'image/jpeg', 'image/jpg'].includes(
            (value as FileList)[0].type
          );
        }
      }
    ),
  country: yup.string().required('Country is required'),
});
