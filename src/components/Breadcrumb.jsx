import React from 'react';
import { Link } from 'react-router-dom';

const Miga = ({ route }) => {
  return <li className={`breadcrumb-item ${route.isLink ? '' : 'active'}`}>
    {
      route.isLink ?
        <Link to={route.link}> {route.name} </Link>
        : route.name
    }
  </li>
}

export const Breadcrumb = ({ routes }) => {

  return (
    <nav aria-label="breadcrumb" className="col-12">
      <ol className="breadcrumb">
        {
          routes.map((route, index) => <Miga route={route} key={index} />)
        }
      </ol>
    </nav>
  )
}