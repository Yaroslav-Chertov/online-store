import React from "react";
import './style.css';
import { NavLink } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';

function Menu() {
  const cn = bem('Menu')
  return (
    <nav className={cn()}>
      <NavLink className={cn('link')} to={'/'}>Главная</NavLink>
    </nav>
  )
;}

export default Menu
