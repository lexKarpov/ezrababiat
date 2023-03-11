import React, {useState, useEffect, useContext} from "react";
import './SearchFriend.css'
import Header from '../Header/Header';
import {useForm} from "react-hook-form";
import {regExpEmail} from '../../constants/constants.js'
import InfoTooltip from "../InfoTool/InfoTool";
import {getAllUsers} from "../../utils/api";

export default function SearchFriend({isLogged, addUser}) {
  const [isOpen, setisOpen] = useState(false)
  const [data, setData] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  useEffect(()=>{
    getAllUsers().then(res => setAllUsers(res))
  })

  const {register, handleSubmit, watch, formState: {errors}} = useForm(
    {
      defaultValues: {
        email: ''
      }
    }
  );
  watch('email')

  function submitEditProfile({email}) {
    setisOpen(true)
    let user
    for (const resKey in allUsers) {
      if(allUsers[resKey].email === email){
        user = allUsers[resKey]
      }
    }
    setData(user)
  }

  function onClose() {
    setisOpen(false)
  }

  return (
    <div className="editProfile__container">
      <Header isLogged={isLogged}/>
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
          <InfoTooltip isOpen={isOpen} onClose={onClose} data={data} addUser={addUser}/>
        </section>
      </main>
    </div>
  )
}
