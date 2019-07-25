import { h } from 'preact';

import Page from '../core/Page';
import storage from '../../services/storageService';

const SettingsPage = props => {
  const onRemoveAll = () => {
    storage.set({ generators: [] });
  };

  return (
    <Page>
      <button className="button is-danger is-small is-fullwidth" onClick={onRemoveAll}>Remove All Generators</button>
    </Page>
  );
};

export default SettingsPage;
