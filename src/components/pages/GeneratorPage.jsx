import { h } from 'preact';
import { useState } from 'preact/hooks';
import faker from 'faker';

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
      name: faker.name.findName(),
      email: faker.internet.exampleEmail(),
    });
  };

  return (
    <div className="container">
      <div className="columns is-vcentered is-mobile">
        <div className="column">
          <LocaleSelect selected={DEFAULT_LOCALE} onChange={onChangeLocale} />
        </div>
        <div className="column">
          <input className="input" type="number" placeholder="Seed" onChange={onChangeSeed} />
        </div>
      </div>
      <button className="button is-primary is-fullwidth dg-generate-button" onClick={onGenerate}>Generate</button>

      <ResultList data={results} />
    </div>
  );
};

export default GeneratorPage;
