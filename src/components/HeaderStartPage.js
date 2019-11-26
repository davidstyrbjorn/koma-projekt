import React from 'react';

import "../style/HeaderStartPage.css";

function HeaderStartPage(props){

  return(
    <div className="WrapperHeader">
        <header>
          <nav className="nav_wrapper">
            <li><img className="menu_pic" src={'./menyknapp.png'} alt="menu button"/></li>
            <li><img className="logo_pic" src={'./logo.png'} alt="logo" /></li>
          </nav>
        </header>
      </div>
    );
}
export default HeaderStartPage;