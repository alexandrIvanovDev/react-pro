import * as yup from 'yup';

export const registryFormSchema = yup
  .object({
    username: yup.string().required('Имя пользователя обязательно').min(2, 'Минимум 2 символа'),

    email: yup.string().required('Email обязателен').email('Введите корректный email'),

    password: yup
      .string()
      .required('Пароль обязателен')
      .min(4, 'Пароль должен быть не менее 4 символов'),

    confirmPassword: yup
      .string()
      .required('Подтверждение пароля обязательно')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),

    socialLinks: yup
      .array()
      .optional()
      .of(yup.string().url('Некорректный URL').required('Ссылка обязательна')),
  })
  .required();
