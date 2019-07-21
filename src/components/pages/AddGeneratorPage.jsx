import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';

import paths from '../../routePaths';
import Page from '../core/Page';

const AddGeneratorPage = props => {
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

  const onAdd = () => {
    console.log(selectedCategory, selectedGenerator);
  };

  return (
    <Page>
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
      <button className="button" onClick={onAdd}>Add</button>
      <button className="button is-text" onClick={() => route(paths.generator)}>Back</button>
    </Page>
  );
};

export default AddGeneratorPage;
