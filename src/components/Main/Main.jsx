import React, {useEffect, useState} from 'react'
import './Main.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";
import Header from "../Header/Header";

export default function Main({cards}) {
  const currentUser = React.useContext(CurrentUserContext)
  console.log(currentUser)
  return (
    <main className="main">
      <Header isLogged={true} name={currentUser.name}/>
        <ul className="cards">
          {cards.map(el =>
            <Card key={el._id}
                  data={el}
                  // owner={currentUser._id}
                  // onCardClick={props.onPopupWithImage}
                  // onCardLike = {props.onCardLike}
                  // onCardDelete = {props.onCardDelete}
            />
          )}
      </ul>
    </main>
  )
}

