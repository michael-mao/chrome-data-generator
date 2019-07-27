import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import Page from '../core/Page';
import LocaleSelect from '../core/LocaleSelect';
import storage from '../../services/storage';
import { DEFAULT_LOCALE } from '../../constants';

const SettingsPage = _props => {
  const [userLocale, setUserLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    storage.get({ userLocale: DEFAULT_LOCALE })
      .then(result => setUserLocale(result.userLocale));
  });

  const onSelectLocale = event => {
    storage.set({ userLocale: event.target.value });
  };

  const onResetSettings = () => {
    storage.clear();
  };

  return (
    <Page>
      <LocaleSelect onChange={onSelectLocale} selected={userLocale} fieldLabel="Default Locale" />

      <hr />

      <button className="button is-danger is-small is-fullwidth" type="button" onClick={onResetSettings}>Reset All Settings</button>
    </Page>
  );
};

export default SettingsPage;
