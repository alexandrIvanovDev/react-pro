import * as yup from 'yup';

export type LoginFormType = yup.InferType<typeof loginFormSchema>;

export const loginFormSchema = yup
  .object({
    email: yup.string().required('Email обязателен').email('Введите корректный email'),
    password: yup
      .string()
      .required('Пароль обязателен')
      .min(6, 'Пароль должен быть не менее 6 символов'),
  })
  .required();
