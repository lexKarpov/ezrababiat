import React, {useState, useEffect, useContext} from "react";
import './AddTask.css';
import Header from '../Header/Header';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {useForm} from "react-hook-form";



export default function AddTask({isLogged, pageLogin, writeTask}) {
  const user = useContext(CurrentUserContext)
  const beforeValueOfInputs = {
    name: user ? user.name : '',
    email: user ? user.email : '',
  }

  const {register, handleSubmit, watch, formState: {errors}} = useForm(
    {
      defaultValues: {
        name: user.name || '',
        email: user.email || ''
      }
    }
  );
  watch('name')

  function addTask(data) {
    writeTask(data)
  }

  return (
    <div className="editProfile__container">
      <Header isLogged={isLogged} pageLogin={pageLogin}/>
      <main>
        <section className="editProfile">
          <div className="editProfile__wrapper">
            <h1 className='editProfile__title'>Добавьте доброе дело</h1>

            {errors.exampleRequired && <span className='label__error'>This field is required</span>}
            <form className="editProfile__form" onSubmit={handleSubmit(addTask)}>
              <label className="editProfile__label editProfile__label_type_whith-line">
                {errors.name?.message ? <span className='label__error'>{errors.name.message}</span> : 'Заголовок'}

                <input
                  {...register("title", {
                    required: 'это поле обязательно.',
                    minLength: {
                      value: 2,
                      message: "Введите от 2х символов"
                    },
                  })}
                  className="editProfile__input"/>
              </label>
              <div className='editProfile__buttons'>
                  <button type='submit' className="editProfile__button">Добавить</button>
              </div>
            </form>

          </div>
        </section>
      </main>
    </div>

  )
}

