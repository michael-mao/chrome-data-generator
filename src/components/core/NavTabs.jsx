import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import paths from '../../routePaths';

const NavTabs = props => {
  const { tabs } = props;

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
        {tabs.map(tab => (
          <li className={isActive(tab.path)}>
            <a onClick={() => linkTo(tab.path)}>
              {tab.icon && (
                <span className="icon is-small">
                  <FontAwesomeIcon icon={tab.icon} />
                </span>
              )}
              <span>{tab.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default NavTabs;
