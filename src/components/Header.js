import React from 'react'

const Header = () => {
  // Set header title
  let title=''
  // ???
  switch (true) {

    case RegExp('#/labels/add').test(window.location.hash):
      title='New label'
      break;

    case RegExp('#/labels').test(window.location.hash):
      title='Labels'
      break;

    case RegExp('#/products/add').test(window.location.hash):
      title='New Product'
      break;

    case RegExp('#/products').test(window.location.hash):
      title='Products'
      break;

    case RegExp('#/providers/add').test(window.location.hash):
      title='New provider'
      break;

    case RegExp('#/providers').test(window.location.hash):
      title='Providers'
      break;

    case RegExp('#/scanner').test(window.location.hash):
      title='Scanner'
      break;

    case RegExp('#/').test(window.location.hash):
      title='Control panel'
      break;

    default:
      // TODO
      title='name'
      break;
  }

  const showBar = () => {
    // TODO - Resolver problema MDL
    let sidebar = document.getElementById('sidebar')
    sidebar.classList.add('is-visible')
  }

  return (
    <header className="demo-header mdl-layout__header" style={{
      color: 'black',
      background: 'rgb(245, 245, 245)'
    }}>
      <div aria-expanded="false" role="button" tabIndex="0" className="mdl-layout__drawer-button">
        <i className="material-icons" onClick={() => showBar() }></i>
      </div>
      <div className="mdl-layout__header-row">
        <div className="mdl-layout-spacer"></div>

        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <span className="mdl-layout-title">{title}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
