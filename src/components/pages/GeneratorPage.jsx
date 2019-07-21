import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import faker from 'faker';

import paths from '../../routePaths';
import Page from '../core/Page';
import LocaleSelect from '../core/LocaleSelect';
import ResultList from '../core/ResultList';

const DEFAULT_LOCALE = 'en';

const GeneratorPage = props => {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [seed, setSeed] = useState(null);
  const [results, setResults] = useState({});

  const onChangeLocale = event => {
    setLocale(event.target.value);
  }

  const onChangeSeed = event => {
    setSeed(event.target.valueAsNumber);
  }

  const onGenerate = () => {
    faker.locale = locale;
    if (seed !== null) {
      faker.seed(seed);
    }

    setResults({
      uuid: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.exampleEmail(),
    });
  };

  return (
    <Page>
      <div className="columns is-vcentered is-mobile">
        <div className="column">
          <LocaleSelect selected={DEFAULT_LOCALE} onChange={onChangeLocale} />
        </div>
        <div className="column">
          <input className="input is-small" type="number" placeholder="Seed" onChange={onChangeSeed} />
        </div>
      </div>
      <button className="button is-primary is-fullwidth dg-generate-button" onClick={onGenerate}>Generate</button>

      <hr />

      <ResultList data={results} />
      <button className="button is-fullwidth is-small" onClick={() => route(paths.addGenerator)}>Add Field</button>
    </Page>
  );
};

export default GeneratorPage;
