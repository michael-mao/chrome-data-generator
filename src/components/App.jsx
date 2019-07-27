import { h } from 'preact';
import { Router } from 'preact-router';
import { faToolbox, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import faker from 'faker';

import paths from '../routePaths';
import NavTabs from './core/NavTabs';
import Redirect from './core/Redirect';
import GeneratorPage from './pages/GeneratorPage';
import SettingsPage from './pages/SettingsPage';

const App = _props => {
  // TODO: for development, remove
  window.faker = faker;

  const tabs = [{
    name: 'Generator',
    path: paths.generator,
    icon: faToolbox,
  }, {
    name: 'Settings',
    path: paths.settings,
    icon: faSlidersH,
  }];

  return (
    <div id="app">
      <Router>
        <GeneratorPage path={paths.generator} />
        <SettingsPage path={paths.settings} />
        <Redirect default to={paths.generator} />
      </Router>
      <NavTabs tabs={tabs} />
    </div>
  );
};

export default App;
