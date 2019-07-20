import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';

import paths from '../../routePaths';

const NavTabs = props => {
  const [currentPath, setCurrentPath] = useState(paths.generator);

  const linkTo = path => {
    route(path);
    setCurrentPath(path);
  };

  const isActive = path => {
    return currentPath === path ? "is-active" : "";
  };

  return (
    <div className="tabs is-fullwidth is-centered dg-nav-tabs">
      <ul>
        <li className={isActive(paths.generator)}>
          <a onClick={() => linkTo(paths.generator)}>Generator</a>
        </li>
        <li className={isActive(paths.settings)}>
          <a onClick={() => linkTo(paths.settings)}>Settings</a>
        </li>
      </ul>
    </div>
  )
};

export default NavTabs;
