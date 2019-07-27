import { h, Component } from 'preact';
import faker from 'faker';

import Page from '../core/Page';
import LocaleSelect from '../core/LocaleSelect';
import GeneratorField from '../core/GeneratorField';
import AddGeneratorPage from './AddGeneratorPage';
import storage from '../../services/storage';
import utils from '../../services/utils';
import { DEFAULT_LOCALE } from '../../constants';

class GeneratorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: DEFAULT_LOCALE,
      seed: null,
      generators: [],
      showAddGeneratorPage: false,
      editMode: false,
    };
  }

  componentDidMount() {
    storage.get({ generators: [], userLocale: DEFAULT_LOCALE })
      .then(result => {
        this.setState({ generators: result.generators, locale: result.userLocale });
      });
  }

  onChangeLocale = event => {
    this.setState({ locale: event.target.value });
  }

  onChangeSeed = event => {
    this.setState({ seed: event.target.valueAsNumber });
  }

  onGenerate = () => {
    const { locale, seed, generators } = this.state;
    faker.locale = locale;
    if (seed !== null) {
      faker.seed(seed);
    }

    const generatorsWithValue = generators.map(generator => {
      return {
        ...generator,
        value: faker[generator.category][generator.generator](),
      };
    });
    this.setState({ generators: generatorsWithValue });
  };

  onShowAddGeneratorPage = () => {
    this.setState({ showAddGeneratorPage: true });
  };

  onHideAddGeneratorPage = () => {
    this.setState({ showAddGeneratorPage: false });
  };

  onEnterEditMode = () => {
    this.setState({ editMode: true });
  };

  onExitEditMode = () => {
    this.setState({ editMode: false });
  };

  onAddGenerator = generatorToAdd => {
    const { generators } = this.state;
    const updatedGenerators = utils.deepCopy(generators);
    updatedGenerators.push(generatorToAdd);
    this.setState({ generators: updatedGenerators });
    this.onHideAddGeneratorPage();
  };

  onRemoveGenerator = generatorToRemove => {
    const { generators } = this.state;
    const updatedGenerators = utils.deepCopy(generators);
    const toRemoveIndex = updatedGenerators.findIndex(generator => (
      generator.category === generatorToRemove.category
      && generator.generator === generatorToRemove.generator
    ));
    updatedGenerators.splice(toRemoveIndex, 1);
    this.setState({ generators: updatedGenerators });
  };

  onSaveChanges = () => {
    const { generators } = this.state;
    storage.set({ generators });
    this.onExitEditMode();
  };

  render() {
    const {
      locale,
      generators,
      editMode,
      showAddGeneratorPage,
    } = this.state;

    return (
      <Page>
        <div className="columns is-vcentered is-mobile">
          <div className="column">
            <LocaleSelect selected={locale} onChange={this.onChangeLocale} />
          </div>
          <div className="column">
            <input className="input is-small" type="number" placeholder="Seed (optional)" onChange={this.onChangeSeed} />
          </div>
        </div>
        <button className="button is-primary is-fullwidth is-small dg-generate-button" type="button" disabled={generators.length ? undefined : 'disabled'} onClick={this.onGenerate}>Generate</button>

        <hr />

        <div className="dg-generator-page-content">
          {generators.length
            ? generators.map(generator => <GeneratorField generator={generator} showRemoveButton={editMode} onRemove={this.onRemoveGenerator} />)
            : <p className="is-size-7 is-italic has-text-centered">You have no generators.</p>
          }
          <button className={`button is-fullwidth is-small ${editMode ? '' : 'is-hidden'}`} type="button" onClick={this.onShowAddGeneratorPage}>Add Field</button>
          <button className={`button is-text is-fullwidth is-small ${editMode ? '' : 'is-hidden'}`} type="button" onClick={this.onSaveChanges}>Save Changes</button>
          <button className={`button is-text is-fullwidth is-small ${editMode ? 'is-hidden' : ''}`} type="button" onClick={this.onEnterEditMode}>Customize</button>
        </div>

        <AddGeneratorPage isVisible={showAddGeneratorPage} onHide={this.onHideAddGeneratorPage} onAdd={this.onAddGenerator} />
      </Page>
    );
  }
}

export default GeneratorPage;
