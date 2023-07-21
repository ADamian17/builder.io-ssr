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
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/blogs">blogs</a>
          </li>
          <li>
            <a href="/contact">Contacts</a>
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