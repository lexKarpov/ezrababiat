import {CardList} from 'react-bootstrap-icons';
import {PersonCircle} from 'react-bootstrap-icons';

import './Header.css'
import {Link} from "react-router-dom";

function Header({isLogged, name}) {
  return (
    <header className="header">
      <Link to="/">
        <CardList
          color="white"
          size={30}
        />
      </Link>
      {
        isLogged ?
          <>
            <nav className="header__navigation">
              <button className="header__button header__button_type_addUser">Найти пользователя</button>
              <button className="header__button header__button_type_addTask">Добавить доброе дело</button>
              <button className="header__button header__button_type_addTask">Друзья</button>
            </nav>
            <div className="header__user">
              <p className="header__userName">{name}</p>
              <PersonCircle
                color="white"
                size={30}/>
            </div>
          </>
        :
        null
      }

    </header>
  )
}

export default Header
