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
      editMode: false,
    };
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

  onEnterEditMode = () => {
    this.setState({ editMode: true });
  };

  onExitEditMode = () => {
    this.setState({ editMode: false });
  };

  onRemoveGenerator = generatorToRemove => {
    storage.get({ generators: [] })
      .then(result => {
        const toRemoveIndex = result.generators.findIndex(generator => {
          return (
            generator.category === generatorToRemove.category
            && generator.generator === generatorToRemove.generator
          );
        });
        result.generators.splice(toRemoveIndex, 1);
        this.setState({ generators: result.generators });
        return storage.set({ generators: result.generators });
      });
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
            <input className="input is-small" type="number" placeholder="Seed (optional)" onChange={this.onChangeSeed} />
          </div>
        </div>
        <button className="button is-primary is-fullwidth is-small dg-generate-button" onClick={this.onGenerate}>Generate</button>

        <hr />

        {this.state.generators.map(generator => <GeneratorField generator={generator} showRemoveButton={this.state.editMode} onRemove={this.onRemoveGenerator} />)}
        <button className={`button is-fullwidth is-small ${this.state.editMode ? '' : 'is-hidden'}`} onClick={() => route(paths.addGenerator)}>Add Field</button>
        <button className={`button is-text is-fullwidth is-small ${this.state.editMode ? '' : 'is-hidden'}`} onClick={this.onExitEditMode}>Save Changes</button>
        <button className={`button is-text is-fullwidth is-small ${this.state.editMode ? 'is-hidden' : ''}`} onClick={this.onEnterEditMode}>Customize</button>
      </Page>
    );
  }
}

export default GeneratorPage;
