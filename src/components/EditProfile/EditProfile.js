import React, {useState, useEffect, useContext} from "react";
import './EditProfile.css';
import Header from '../Header/Header';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {useForm} from "react-hook-form";
import {regExpEmail} from '../../constants/constants.js'


function EditProfile({logOut, isLogged, pageLogin, updateUser}) {
  const user = useContext(CurrentUserContext)
  const beforeValueOfInputs = {
    name: user ? user.name : '',
    email: user ? user.email : '',
  }

  const [isEdit, setIsEdit] = useState(true)
  const {register, handleSubmit, watch, formState: {errors}} = useForm(
    {
      defaultValues: {
        name: user.name || '',
        email: user.email || ''
      }
    }
  );
  watch('email')

  function editProfile() {
    setIsEdit(false)
  }

  function submitEditProfile(data) {
    updateUser(data, beforeValueOfInputs)
    setIsEdit(true)
  }

  return (
    <div className="editProfile__container">
      <Header isLog={isLogged} pageLogin={pageLogin}/>
      <main>
        <section className="editProfile">
          <div className="editProfile__wrapper">
            <h1 className='editProfile__title'>{`Привет, ${user?.name}!`}</h1>

            {errors.exampleRequired && <span className='label__error'>This field is required</span>}
            <form className="editProfile__form" onSubmit={handleSubmit(submitEditProfile)}>
              <label className="editProfile__label editProfile__label_type_whith-line">
                {errors.name?.message ? <span className='label__error'>{errors.name.message}</span> : 'Имя'}

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
                  })}
                  disabled={isEdit}
                  className="editProfile__input"/>
              </label>
              <label className="editProfile__label">
                {errors.email?.message ? <span className='label__error'>{errors.email.message}</span> : 'E-mail'}
                <input
                  disabled={isEdit}
                  className="editProfile__input"
                  {...register("email", {
                    required: 'это поле обязательно',
                    pattern: {
                      value: regExpEmail,
                      message: 'это поле для email'
                    }
                  })}/>
              </label>

              <div className='editProfile__buttons'>
                {isEdit ? null
                  :
                  <button type='submit' className="editProfile__button">Сохранить</button>}
              </div>
            </form>
            {isEdit ?
              <button
                type="button"
                className="editProfile__button editProfile__button_type_edit"
                onClick={editProfile}>Редактировать</button>
              : null
            }
            <button type="button" className="editProfile__button editProfile__button_color_red" onClick={logOut}>Выйти
              из аккаунта
            </button>
          </div>
        </section>
      </main>
    </div>

  )
}

export default EditProfile;
