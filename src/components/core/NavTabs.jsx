import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faSlidersH } from '@fortawesome/free-solid-svg-icons';

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
    <div className="tabs is-small is-fullwidth is-centered dg-nav-tabs">
      <ul>
        <li className={isActive(paths.generator)}>
          <a onClick={() => linkTo(paths.generator)}>
            <span className="icon is-small">
              <FontAwesomeIcon icon={faToolbox} />
            </span>
            <span>Generator</span>
          </a>
        </li>
        <li className={isActive(paths.settings)}>
          <a onClick={() => linkTo(paths.settings)}>
            <span className="icon is-small">
              <FontAwesomeIcon icon={faSlidersH} />
            </span>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </div>
  )
};

export default NavTabs;
