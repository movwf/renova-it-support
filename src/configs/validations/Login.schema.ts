import yup from './_yup';

const loginSchema = yup.object().shape({
  username: yup.string().min(4).max(32).required(),
  password: yup.string().min(4).max(32).required(),
});

export default loginSchema;
