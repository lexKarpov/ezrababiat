import React, {useState, useEffect} from 'react';
import FormSign from '../FormSign/FormSign';
import Header from '../Header/Header'

function Login({pageLogin, isLogged, submitRegisterForm, preloader}) {
  return (
    <div className='register'>

      <Header isLog={isLogged} pageLogin={pageLogin}/>
      <main>
        <FormSign submitRegisterForm={submitRegisterForm}/>
      </main>

    </div>
  )
}

export default Login
