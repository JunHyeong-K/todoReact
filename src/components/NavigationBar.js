import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Clock from '../components/Clock';
import { signout } from '../service/ApiService';
import '../styles/NavigationBar.css'; // NavigationBar CSS 파일 임포트
import cat from '../images/cat.jpg'

const NavigationBar = ({ username }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

// 시계, 사용자 환영 메시지, todo list 페이지 & 회원 정보 페이지 이동 버튼 추가  
  return (
    <nav className="navbar-todo" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
      <Link to="/todo" className="navbar-item title">Todo List</Link>
        <div className="navbar-item">
          <Clock />
        </div>
        <div>
        <img src={cat} style={{ width: "80px", height: "80px"}} />
        </div>
        <div className="navbar-item">
          안녕하세요, {username || "사용자"}님!
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/todo" id="button-todo" className="button"> ☑️Todo List</Link>
            <Link to="/auth/userinfo" id="button-userinfo" className="button">🔒회원정보</Link>
            <button id="button-logout" className="button" onClick={signout}>⭐Logout</button>
            <button id="button-dark-mode" className="button" onClick={toggleDarkMode}>
              {darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
