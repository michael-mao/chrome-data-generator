import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route, getCurrentUrl } from 'preact-router';

const NavTabs = props => {
  const [currentPath, setCurrentPath] = useState(getCurrentUrl());

  const linkTo = path => {
    route(path);
    setCurrentPath(path);
  };

  const isActive = path => {
    return currentPath === path ? "is-active" : "";
  };

  return (
    <div className="tabs is-fullwidth is-centered is-large">
      <ul>
        <li className={isActive('/')}>
          <a onClick={() => linkTo('/')}>Generator</a>
        </li>
        <li className={isActive('/settings')}>
          <a onClick={() => linkTo('/settings')}>Settings</a>
        </li>
      </ul>
    </div>
  )
};

export default NavTabs;
