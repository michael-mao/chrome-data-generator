import { h, Component } from 'preact';
import faker from 'faker';

import Page from '../core/Page';
import LocaleSelect from '../core/LocaleSelect';
import GeneratorField from '../core/GeneratorField';
import AddGeneratorPage from './AddGeneratorPage';
import storage from '../../services/storageService';
import utils from '../../services/utilsService';

const DEFAULT_LOCALE = 'en';

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
    const updatedGenerators = utils.deepCopy(this.state.generators);
    updatedGenerators.push(generatorToAdd);
    this.setState({ generators: updatedGenerators });
    this.onHideAddGeneratorPage();
  };

  onRemoveGenerator = generatorToRemove => {
    const updatedGenerators = utils.deepCopy(this.state.generators);
    const toRemoveIndex = updatedGenerators.findIndex(generator => {
      return (
        generator.category === generatorToRemove.category
        && generator.generator === generatorToRemove.generator
      );
    });
    updatedGenerators.splice(toRemoveIndex, 1);
    this.setState({ generators: updatedGenerators });
  };

  onSaveChanges = () => {
    storage.set({ generators: this.state.generators });
    this.onExitEditMode();
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
        <button className="button is-primary is-fullwidth is-small dg-generate-button" disabled={this.state.generators.length ? undefined : "disabled"} onClick={this.onGenerate}>Generate</button>

        <hr />

        <div className="dg-generator-page-content">
          {this.state.generators.length ?
            this.state.generators.map(generator => <GeneratorField generator={generator} showRemoveButton={this.state.editMode} onRemove={this.onRemoveGenerator} />)
            :
            <p className="is-size-7 is-italic has-text-centered">You have no generators.</p>
          }
          <button className={`button is-fullwidth is-small ${this.state.editMode ? '' : 'is-hidden'}`} onClick={this.onShowAddGeneratorPage}>Add Field</button>
          <button className={`button is-text is-fullwidth is-small ${this.state.editMode ? '' : 'is-hidden'}`} onClick={this.onSaveChanges}>Save Changes</button>
          <button className={`button is-text is-fullwidth is-small ${this.state.editMode ? 'is-hidden' : ''}`} onClick={this.onEnterEditMode}>Customize</button>
        </div>

        <AddGeneratorPage isVisible={this.state.showAddGeneratorPage} onHide={this.onHideAddGeneratorPage} onAdd={this.onAddGenerator} />
      </Page>
    );
  }
}

export default GeneratorPage;
