import { h } from 'preact';
import ResultItem from './ResultItem';

const ResultList = props => {
  const { data } = props;

  return (
    <>
      <ResultItem label="UUID" value={data.uuid} />

      <hr />

      <ResultItem label="Name" value={data.name} />
      <ResultItem label="Email" value={data.email} />
    </>
  );
};

export default ResultList;
