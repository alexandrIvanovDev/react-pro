import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { classNames } from 'shared/lib/classNames';

import s from './LoginForm.module.css';
import { loginFormSchema, type LoginFormType } from './validation';
import { Tooltip } from 'shared/ui/Tooltip/Tooltip';

type Props = {
  submit: (data: LoginFormType) => void;
};

export const LoginForm = ({ submit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormType) => {
    submit(data);
    reset();
  };

  return (
    <div className={s.formWrapper}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={s.form}>
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
          <Tooltip text='It is password'>
            <input
              id='password'
              type='password'
              {...register('password')}
              className={classNames(s.input, [errors.password && s.errorInput])}
            />
          </Tooltip>
          {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}
        </div>

        <Tooltip text='Some tooltip' position='bottom'>
          <button type='submit' disabled={isSubmitting}>
            Вход
          </button>
        </Tooltip>
      </form>
    </div>
  );
};
