import React from 'react';
import { BrowserRouter as Switch, Redirect, Link,Router } from "react-router-dom";

import "../style/HeaderStartPage.css";
import{menubutton, logo} from "./images.js";

function HeaderStartPage(props){

return(
  <div class="WrapperHeader">
      <head>
        <meta name="description" content="Dungeons and Dragons character creation"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>Scroll</title>
      </head>
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
