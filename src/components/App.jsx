import { h } from 'preact';
import { Router } from 'preact-router';
import faker from 'faker';

import paths from '../routePaths';
import NavTabs from './core/NavTabs';
import Redirect from './core/Redirect';
import GeneratorPage from './pages/GeneratorPage';
import SettingsPage from './pages/SettingsPage';
import AddGeneratorPage from './pages/AddGeneratorPage';

const App = props => {
  // TODO: for development, remove
  window.faker = faker;

  return (
    <div id="app">
      <Router>
        <AddGeneratorPage path={paths.addGenerator} />
        <GeneratorPage path={paths.generator} />
        <SettingsPage path={paths.settings} />
        <Redirect default to={paths.generator} />
      </Router>
      <NavTabs />
    </div>
  );
}

export default App;
