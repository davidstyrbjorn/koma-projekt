import React from 'react';

import "../style/HeaderStartPage.css";
import {menubutton} from './../assets/images/menyknapp.png';
import {logo} from './../assets/images/logo.png';

function HeaderStartPage(props){

  return(
  

    <div className="WrapperHeader">
        <header>
          <nav className="nav_wrapper">
            <li><img className="menu_pic" src={menubutton} alt="menu button"/></li>
            <li><img className="logo_pic" src={logo} alt="menu button" /></li>
          </nav>
        </header>
    </div>

    );

}
export default HeaderStartPage;
