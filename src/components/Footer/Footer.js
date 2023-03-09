import React from 'react'
import './Footer.css'

function Footer (){
  const date = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__author">© {date} Карпов А.</p>
      <a href="https://t.me/llyoly" className="footer__social">telegram</a>
    </footer>
  )
}

export default Footer
