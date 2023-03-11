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
              <Link to="/search" className="header__button header__button_type_addUser">Найти пользователя</Link>
              <Link to="/addTask" className="header__button header__button_type_addTask">Добавить доброе дело</Link>
              <Link to="/friends" className="header__button header__button_type_addTask">Друзья</Link>
            </nav>
            <Link className="header__user" to="/editProfile">
              <p className="header__userName">{name}</p>
              <PersonCircle
                color="white"
                size={30}/>
            </Link>
          </>
        :
        null
      }

    </header>
  )
}

export default Header
