import { h } from 'preact';

const ResultItem = props => {
  const { label, value } = props;

  return (
    <div className="columns is-vcentered is-mobile">
      <div className="column is-one-fifth is-paddingless">
        <p className="has-text-right has-text-weight-bold is-size-7">{label}</p>
      </div>
      <div className="column">
        <input className="input is-small" type="text" value={value || ""} readonly />
      </div>
    </div>
  );
};

export default ResultItem;
