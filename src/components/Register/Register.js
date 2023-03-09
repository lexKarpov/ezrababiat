import './Register.css'
import FormSign from '../FormSign/FormSign'
import Header from '../Header/Header'

export default function Register({isLogged, pageLogin, submitRegisterForm}) {
  return (
    <div className='register'>
      <Header isLog={isLogged} pageLogin={pageLogin}/>
      <main className="main">
        <FormSign submitRegisterForm={submitRegisterForm}/>
      </main>
    </div>
  )
}


