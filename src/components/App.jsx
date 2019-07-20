import { h } from 'preact';
import { Router } from 'preact-router';

import NavTabs from './core/NavTabs';
import Redirect from './core/Redirect';
import GeneratorPage from './pages/GeneratorPage';
import SettingsPage from './pages/SettingsPage';

const App = props => {
	return (
		<div id="app">
			<Router>
				<GeneratorPage path="/generator" />
				<SettingsPage path="/settings" />
				<Redirect default to="/generator" />
			</Router>
			<NavTabs />
		</div>
	);
}

export default App;
