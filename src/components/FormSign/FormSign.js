import { Link, useLocation } from 'react-router-dom';
import './FormSign.css';
import { useForm } from "react-hook-form";
import {regExpEmail} from '../../constants/constants.js'

function Form({ submitRegisterForm }) {
  const location = useLocation();
  let buttonSubmit, redirect, redirectTo, desc, nameForm

  if (location.pathname === '/signin') {
    desc = 'Ещё не зарегистрированы?'
    buttonSubmit = 'Войти'
    redirect = 'Регистрация'
    redirectTo = '/signup'
    nameForm = 'sign'
  }
  if (location.pathname === '/signup') {
    desc = 'Уже зарегистрированы?'
    buttonSubmit = 'Зарегистрироваться'
    redirect = 'Войти'
    redirectTo = '/signin'
    nameForm = 'signup'
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  watch('name')

  function goSign(data) {
    submitRegisterForm(data, nameForm)
  }

  return (
    <form className='form' name="register-form" onSubmit={handleSubmit(goSign)}>
      <div className='form__wrapper'>
        {location.pathname === '/signup' &&
          <div className='label'>
            <label className='label__title'>Имя
              <input
                {...register("name", {
                  required: 'это поле обязательно.',
                  minLength: {
                    value: 2,
                    message: "Введите от 2х до 32 символов"
                  },
                  maxLength: {
                    value: 30,
                    message: "Введите от 2х до 32 символов"
                  }
                }) }
                className='label__input'/>
            </label>
            {errors.name?.message ? <span className='label__error'>{errors.name.message}</span> : <span className='label__error'/>}
          </div>
        }
        <div className='label'>
          <label className='label__title'>E-mail
            <input
              {...register("email", {
                required: 'это поле обязательно',
                pattern: {
                  value: regExpEmail,
                  message: 'это поле для емайла'
                }
              })}
              className='label__input'/>
          </label>
          {errors.email?.message ? <span className='label__error'>{errors.email.message}</span> : <span className='label__error'/>}
        </div>

        <div className='label'>
          <label className='label__title'>Пароль
            <input
              {...register("password", {
                required: 'это поле обязательно',
              })}
              className='label__input'
              type='password'/>
          </label>
          {errors.password?.message ? <span className='label__error'>{errors.password.message}</span> : <span className='label__error'/>}
        </div>
        <button type="submit" className='form__button'>{buttonSubmit}</button>
        <div className='redirect'>
          <p className='redirect__desc'>{desc}</p>
          <Link className='redirect__to' to={redirectTo}>{redirect}</Link>
        </div>
      </div>
    </form >
  )
}
export default Form;
