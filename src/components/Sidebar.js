import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { Auth } from '../context/AuthContext'
// import firebaseConfig from '../firebaseConfig';

const Sidebar = () => {

    const { user } = useContext(Auth)

    let hashPath = window.location.hash;

    const hiddenSidebar = () => {
      // TODO - Resolver los problemas con MDL o implementar Material UI
      let sidebar = document.getElementById('sidebar')
      if ( sidebar.classList.contains('is-visible') ) {
        sidebar.classList.remove('is-visible')
      }
    }

    return (
      <div className='demo-drawer mdl-layout__drawer'
         id='sidebar' aria-hidden='true'  onFocus={() => hiddenSidebar() }  >
        <header className='demo-drawer-header' style={{background: '#3f51b5'}}>
          <div className='demo-avatar-dropdown' style={{fontWeight: 'bold', color: 'white'}}>
            <span>{ user.email }</span>
          </div>
        </header>
        <nav className='demo-navigation mdl-navigation' style={{background: 'white'}}>
          <NavLink exact to='/labels' style={{color: 'black'}}
            className={`mdl-navigation__link ${ (hashPath.match('#/labels/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i style={{color: 'black'}} className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>label</i>
            Labels
          </NavLink>

          <NavLink exact to='/products' style={{color: 'black'}}
            className={`mdl-navigation__link ${ (hashPath.match('#/products/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i style={{color: 'black'}} className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>extension</i>
            Products
          </NavLink>

          <NavLink exact to='/providers' style={{color: 'black'}}
            className={`mdl-navigation__link ${ ( hashPath.match('#/providers/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i style={{color: 'black'}} className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>store</i>
            Providers
          </NavLink>

          <NavLink exact to='/scanner' style={{color: 'black'}}
            className={`mdl-navigation__link ${ ( hashPath.match('#/scanner/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i style={{color: 'black'}} className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>qr_code_scanner</i>
            Scanner
          </NavLink>
          <div className='mdl-layout-spacer'></div>
          <NavLink style={{color: 'black'}} exact to='/logout' className='mdl-navigation__link'><i style={{color: 'black'}} className=' material-icons' role='presentation'>logout</i>Logout</NavLink>
        </nav>
      </div>
    )
}

export default Sidebar
