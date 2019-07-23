import { h, Component } from 'preact';
import { route } from 'preact-router';
import faker from 'faker';

import paths from '../../routePaths';
import Page from '../core/Page';
import LocaleSelect from '../core/LocaleSelect';
import GeneratorField from '../core/GeneratorField';
import storage from '../../services/storageService';

const DEFAULT_LOCALE = 'en';

class GeneratorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: DEFAULT_LOCALE,
      seed: null,
      generators: [],
    }
  }

  onChangeLocale = event => {
    this.setState({ locale: event.target.value });
  }

  onChangeSeed = event => {
    this.setState({ seed: event.target.valueAsNumber });
  }

  onGenerate = () => {
    faker.locale = this.state.locale;
    if (this.state.seed !== null) {
      faker.seed(this.state.seed);
    }

    const generatorsWithValue = this.state.generators.map(generator => {
      return {
        ...generator,
        value: faker[generator.category][generator.generator](),
      }
    });
    this.setState({ generators: generatorsWithValue });
  };

  componentDidMount() {
    storage.get({ generators: [] })
      .then(result => {
        this.setState({ generators: result.generators });
      });
  }

  render() {
    return (
      <Page>
        <div className="columns is-vcentered is-mobile">
          <div className="column">
            <LocaleSelect selected={DEFAULT_LOCALE} onChange={this.onChangeLocale} />
          </div>
          <div className="column">
            <input className="input is-small" type="number" placeholder="Seed" onChange={this.onChangeSeed} />
          </div>
        </div>
        <button className="button is-primary is-fullwidth dg-generate-button" onClick={this.onGenerate}>Generate</button>

        <hr />

        {this.state.generators.map(generator => <GeneratorField generator={generator} />)}
        <button className="button is-fullwidth is-small" onClick={() => route(paths.addGenerator)}>Add Field</button>
      </Page>
    );
  }
}

export default GeneratorPage;
