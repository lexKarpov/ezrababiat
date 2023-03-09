import React, {useState, useEffect} from 'react';
import FormSign from '../FormSign/FormSign';
import Header from '../Header/Header'

export default function Login({pageLogin, isLogged, submitRegisterForm, preloader}) {
  return (
    <div className='register'>
      <Header isLog={isLogged} pageLogin={pageLogin}/>
      <main className="main">
        <FormSign submitRegisterForm={submitRegisterForm}/>
      </main>

    </div>
  )
}
