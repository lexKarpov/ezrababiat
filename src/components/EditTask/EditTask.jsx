import React, {useState, useEffect, useContext} from "react";
import Header from '../Header/Header';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {useForm} from "react-hook-form";
import {useParams, useNavigate} from "react-router-dom";

export default function EditTask({isLogged, editCard}) {
  let navigate = useNavigate();
  const user = useContext(CurrentUserContext)
  const params = useParams();
  const id = +params.id;

  const title = user.tasks.filter((el, index) => index === id)[0]

  const {register, handleSubmit, watch, formState: {errors}} = useForm(
    {
      defaultValues: {
        title: title ? title : '',
      }
    }
  );
  watch('title')

  function editTask(data) {
    editCard(data, id)
  }

  return (
    <div className="editProfile__container">
      <Header isLogged={isLogged}/>
      <main>
        <section className="editProfile">
          <div className="editProfile__wrapper">
            <h1 className='editProfile__title'>Редактировать доброе дело</h1>

            {errors.exampleRequired && <span className='label__error'>This field is required</span>}
            <form className="editProfile__form" onSubmit={handleSubmit(editTask)}>
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
                <button type='submit' className="editProfile__button">Сохранить</button>
                <button type='button' className="editProfile__button" onClick={()=> navigate('/')}>На главную</button>
              </div>
            </form>

          </div>
        </section>
      </main>
    </div>

  )
}

