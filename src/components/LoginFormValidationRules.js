export default function validate(register) {
  let errors = {};
  if (!register.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(register.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!register.password) {
    errors.password = 'Password is required';
  } else if (register.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }
  return errors;
}
