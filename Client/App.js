import React from "react";
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import Login from './Components/Login' ;
import Register from './Components/Register' ;
import Home from './Components/Home' ;
import Search from './Components/Search';
import Inventory from './Components/Inventory';
import Favorites from './Components/Favorites'
import Cash from './Components/Cash'


export default class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Appnav/>
    );
  }
}


const Drawer = createDrawerNavigator({
  Home: Home,
  Search: Search,
  menu:Inventory,
  Cash:Cash,
  Favorites:Favorites,
})

const Appnav= createSwitchNavigator({
  Login:Login,
  Drawer:Drawer,
  Register:Register,
})




