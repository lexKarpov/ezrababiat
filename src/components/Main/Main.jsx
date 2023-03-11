import React from 'react'
import './Main.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";
import Header from "../Header/Header";

export default function Main({onCardDelete, editCard}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <Header isLogged={true} name={currentUser.name}/>
        <ul className="cards">
          {currentUser.tasks.map((el, index) =>
            <Card key={index}
                  title={el}
                  onCardDelete = {onCardDelete}
                  index={index}
                  editCard={editCard}
            />
          )}
      </ul>
    </main>
  )
}

