import { h } from 'preact';

const GeneratorField = props => {
  const { generator } = props;

  return (
    <div class="field">
      <label class="label is-size-7 is-marginless">{generator.generator}</label>
      <div class="control">
        <input class="input is-small" type="text" value={generator.value || ""} readonly />
      </div>
    </div>
  );
};

export default GeneratorField;
