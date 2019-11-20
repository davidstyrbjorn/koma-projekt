import React from 'react';
import { BrowserRouter as Switch, Redirect, Link,Router } from "react-router-dom";

import "../style/HeaderStartPage.css";
import{menubutton, logo} from "./images.js";

function HeaderStartPage(props){

return(
  <div class="WrapperHeader">
      <header>
        <nav class="nav_wrapper">
          <li><img class="menu_pic" src={menubutton} alt="menu button"/></li>
          <li><img class="logo_pic" src={logo} alt="menu button" /></li>
        </nav>
      </header>
  </div>

  );

}
export default HeaderStartPage;
