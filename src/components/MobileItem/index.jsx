import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MobileItem = ({ menu, home }) => menu.map(({ division, to, icon, title }) => division ? (
  <NavDropdown.Divider key={division} />
) : (
  <Link key={to} to={`${home}${to}`}>
    <NavDropdown.Item className="menu-mobile" as="button">
      <i className="material-icons icon">
        {icon}
      </i>
      {title}
    </NavDropdown.Item>
  </Link>
));

MobileItem.propTypes = {
  menu: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    const prop = propValue[key];
    if (!(prop instanceof Object)) {
      return new Error(`Invalid prop \`${propFullName}\`, is not an Object.`);
    }
    if (!prop.hasOwnProperty('division')) {
      let missing = 3;
      const keys = ['to', 'icon', 'title'];
      Object.keys(prop).forEach((key) => {
        if (keys.includes(key)) {
          missing -= 1;
        }
      });
      if (missing) {
        return new Error(`Invalid prop \`${propFullName}\`, must include key \`division\` OR keys \`to\`, \`icon\`, \`title\`.`);
      }
    }
  }),
  home: PropTypes.string.isRequired,
};

export default MobileItem;
