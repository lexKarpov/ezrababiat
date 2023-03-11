import React from 'react'
import './InfoTool.css'
import {XCircle} from 'react-bootstrap-icons';
import {FilePlusFill} from 'react-bootstrap-icons';
import {Link} from "react-router-dom";

export default function InfoTooltip({isOpen, onClose, data, addUser}) {
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__window-wrap">
        <div className="info">
          <XCircle
            color="white"
            size={30}
            className="popup__button-close"
            onClick={onClose}
          />
          {data ?
            <div className="info__searched">
              <h2 className="popup__title">{data.name}</h2>
              <FilePlusFill
                size={40}
                color="green"
                className="info__add"
                onClick={()=> addUser(data)}
              />
            </div>
            :
            <div className="info__searched info__searched_type_not-found">
              <h2 className="popup__title">Пользователь не наден</h2>
              <Link to='/' className="info__to-main">На главную</Link>
            </div>
          }

        </div>



      </div>
    </div>
  )
}
