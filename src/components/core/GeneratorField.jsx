import { h } from 'preact';

import utils from '../../services/utils';

const GeneratorField = props => {
  const { generator, showRemoveButton, onRemove } = props;

  return (
    <>
      <label className="label is-size-7 is-marginless">{utils.camelCaseToTitleCase(generator.generator)}</label>
      <div className={`field ${showRemoveButton ? 'is-grouped' : ''}`}>
        <div className={`control ${showRemoveButton ? 'is-expanded' : ''}`}>
          <input className="input is-small" type="text" value={generator.value || ''} readOnly />
        </div>
        <div className={`control ${showRemoveButton ? '' : 'is-hidden'}`}>
          <button className="button is-text is-small" type="button" onClick={() => onRemove(generator)}>Remove</button>
        </div>
      </div>
    </>
  );
};

export default GeneratorField;
