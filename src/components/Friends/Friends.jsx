import React from 'react'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";
import Header from "../Header/Header";

export default function Friends() {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <Header isLogged={true} name={currentUser.name}/>
      <ul className="cards">
        {currentUser.friends.map((el, index) =>{
          return (
            <div className="friends">
              <h2 className="cards__user">{el.name}</h2>
              {
                el.tasks.map((task, i) =>
                  <Card key={i}
                        title={task}
                        noOwn ={true}
                  />)
              }

          </div>
          )
          }
        )}
      </ul>
    </main>
  )
}

