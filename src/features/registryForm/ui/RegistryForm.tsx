import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { classNames } from 'shared/lib/classNames';

import s from './RegistryForm.module.css';
import { registryFormSchema } from '../model/validation';

export const RegistryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(registryFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      socialLinks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const onSubmit = (data) => {
    console.log('data', data);
    reset();
  };

  return (
    <div className={s.formWrapper}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={s.form}>
        <div className={s.element}>
          <label htmlFor='username'>Имя пользователя</label>
          <input
            id='username'
            {...register('username')}
            className={classNames(s.input, [errors.username && s.errorInput])}
          />
          {errors.username && <span className={s.errorMessage}>{errors.username.message}</span>}
        </div>

        <div className={s.element}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            {...register('email')}
            className={classNames(s.input, [errors.email && s.errorInput])}
          />
          {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
        </div>

        <div className={s.element}>
          <label htmlFor='password'>Пароль</label>
          <input
            id='password'
            type='password'
            {...register('password')}
            className={classNames(s.input, [errors.password && s.errorInput])}
          />
          {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
        </div>

        <div className={s.element}>
          <label htmlFor='confirmPassword'>Подтвердите пароль</label>
          <input
            id='confirmPassword'
            type='password'
            {...register('confirmPassword')}
            className={classNames(s.input, [errors.confirmPassword && s.errorInput])}
          />
          {errors.confirmPassword && (
            <span className={s.errorMessage}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className={s.socialLinksSection}>
          <h3>Социальные профили</h3>

          {fields.map((field, index) => (
            <div key={field.id} className={s.socialLinkRow}>
              <div className={s.element}>
                <input
                  placeholder='https://...'
                  {...register(`socialLinks.${index}`)}
                  className={classNames(s.input, [errors.socialLinks?.[index] && s.errorInput])}
                />
                {errors.socialLinks?.[index] && (
                  <span className={s.errorMessage}>{errors.socialLinks[index].message}</span>
                )}
              </div>

              <button onClick={() => remove(index)} type='button'>
                ✕
              </button>
            </div>
          ))}

          <button onClick={() => append('')} type='button'>
            + Добавить ссылку
          </button>
        </div>

        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};
