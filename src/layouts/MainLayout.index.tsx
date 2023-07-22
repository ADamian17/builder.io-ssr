import { Link } from 'gatsby'
import React from 'react'

type MainLayoutType = {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutType> = (props) => {
  return (
    <>
      <nav>
        <ul style={{ display: "flex", gap: 24 }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contacts</Link>
          </li>
          <li>
            <Link to="/page-no-ssr">Page No Ssr</Link>
          </li>
        </ul>
      </nav>

      {props.children}
    </>
  )
}

export default MainLayout