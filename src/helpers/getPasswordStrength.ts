export const getPasswordStrength = (password: string) => {
  let strength = 0;
  const criteria = [/.*\d/, /.*[a-z]/, /.*[A-Z]/, /.*\W/];

  criteria.forEach((criterion) => {
    if (criterion.test(password)) {
      strength++;
    }
  });

  return strength;
};
