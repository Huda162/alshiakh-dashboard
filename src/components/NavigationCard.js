/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import { Theme } from 'src/constants/colors'
import './test.css'
import React from 'react'

const NavigationCard = ({ path, title, icon, color = Theme.white }) => {
  return (
    <div
      className="col md-2 navigationCard"
      style={{
        border: 'none',
        boxShadow: '0px 2px 3px #c8c8c8',
        width: '20%',
        borderRadius: 5,
        marginLeft: 5,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: color,
      }}
      onClick={() => {}}
    >
      <NavLink
        style={{
          textDecoration: 'none',
          color: 'black',
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '1rem 0.5rem',
        }}
        exact
        to={path}
      >
        {icon}
        <h5 className="mx-1">{title}</h5>
      </NavLink>
    </div>
  )
}

export default NavigationCard
