import React, {useState, useEffect, useContext} from "react";
import './SearchFriend.css'
import Header from '../Header/Header';
import {useForm} from "react-hook-form";
import {regExpEmail} from '../../constants/constants.js'


export default function SearchFriend({logOut, isLogged, pageLogin, updateUser}) {

  const {register, handleSubmit, watch, formState: {errors}} = useForm(
    {
      defaultValues: {
        email: ''
      }
    }
  );
  watch('email')

  function submitEditProfile({email}) {
    console.log(email)
  }

  return (
    <div className="editProfile__container">
      <Header isLog={isLogged} pageLogin={pageLogin}/>
      <main>
        <section className="search">
          <div className="search__wrapper">
            <h1 className='search__title'>{`Найти друга по email`}</h1>

            {errors.exampleRequired && <span className='label__error'>This field is required</span>}
            <form className="search__form" onSubmit={handleSubmit(submitEditProfile)}>
              <label className="search__label">
                {errors.email?.message ? <span className='label__error'>{errors.email.message}</span> : 'E-mail'}
                <input
                  className="search__input"
                  {...register("email", {
                    required: 'это поле обязательно',
                    pattern: {
                      value: regExpEmail,
                      message: 'это поле для email'
                    }
                  })}/>
              </label>

              <div className='search__buttons'>
                  <button type='submit' className="search__button">Найти</button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>

  )
}

