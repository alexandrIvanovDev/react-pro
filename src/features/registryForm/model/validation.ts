import * as yup from 'yup';

export type RegistryFormType = yup.InferType<typeof registryFormSchema>;

export const registryFormSchema = yup
  .object({
    username: yup.string().required('Имя пользователя обязательно').min(2, 'Минимум 2 символа'),

    email: yup.string().required('Email обязателен').email('Введите корректный email'),

    password: yup
      .string()
      .required('Пароль обязателен')
      .min(4, 'Пароль должен быть не менее 6 символов'),

    confirmPassword: yup
      .string()
      .required('Подтверждение пароля обязательно')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать'),

    socialLinks: yup
      .array()
      .of(yup.string().url('Некорректный URL').required('Ссылка обязательна')),
  })
  .required();
