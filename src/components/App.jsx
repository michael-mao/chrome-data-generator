import { h } from 'preact';
import { Router } from 'preact-router';

import paths from '../routePaths';
import NavTabs from './core/NavTabs';
import Redirect from './core/Redirect';
import GeneratorPage from './pages/GeneratorPage';
import SettingsPage from './pages/SettingsPage';

const App = props => {
	return (
		<div id="app">
			<Router>
				<GeneratorPage path={paths.generator} />
				<SettingsPage path={paths.settings} />
				<Redirect default to={paths.generator} />
			</Router>
			<NavTabs />
		</div>
	);
}

export default App;
