import { h } from 'preact';

const GeneratorField = props => {
  const { generator, showRemoveButton, onRemove } = props;

  return (
    <>
    <label className="label is-size-7 is-marginless">{generator.generator}</label>
    <div className={`field ${showRemoveButton ? 'is-grouped': ''}`}>
      <div className={`control ${showRemoveButton ? 'is-expanded' : ''}`}>
        <input className="input is-small" type="text" value={generator.value || ""} readonly />
      </div>
      <div className={`control ${showRemoveButton ? '' : 'is-hidden'}`}>
        <button className="button is-text is-small" onClick={() => onRemove(generator)}>Remove</button>
      </div>
    </div>
    </>
  );
};

export default GeneratorField;
