import { h } from 'preact';
import { useState } from 'preact/hooks';

import OverlayPage from '../core/OverlayPage';

const AddGeneratorPage = props => {
  const { isVisible, onHide, onAdd } = props;

  const generatorOptions = [{
    category: "address",
    generators: [
      "zipCode",
      "city",
      "cityPrefix",
      "citySuffix",
      "streetName",
      "streetAddress",
      "streetSuffix",
      "streetPrefix",
      "secondaryAddress",
      "county",
      "country",
      "countryCode",
      "state",
      "stateAbbr",
      "latitude",
      "longitude",
    ],
  }];

  const [selectedCategory, setSelectedCategory] = useState(generatorOptions[0].category);
  const [selectedGenerator, setSelectedGenerator] = useState(generatorOptions[0].generators[0]);

  const onChangeCategory = event => {
    setSelectedCategory(event.target.value);
  };

  const onChangeGenerator = event => {
    setSelectedGenerator(event.target.value);
  }

  return (
    <OverlayPage isVisible={isVisible}>
      <h1 className="title is-4">Add Generator</h1>
      <div className="field">
        <label className="label">Category</label>
        <div className="control">
          <div className="select is-small is-fullwidth">
            <select onChange={onChangeCategory}>
              {generatorOptions.map(generator => (
                <option value={generator.category}>{generator.category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Generator</label>
        <div className="control">
          <div className="select is-small is-fullwidth">
            <select onChange={onChangeGenerator}>
              {generatorOptions.find(g => g.category === selectedCategory).generators.map(generator => (
                <option value={generator}>{generator}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button className="button is-small" onClick={() => onAdd({ category: selectedCategory, generator: selectedGenerator })}>Add</button>
      <button className="button is-text is-small" onClick={onHide}>Back</button>
    </OverlayPage>
  );
};

export default AddGeneratorPage;
