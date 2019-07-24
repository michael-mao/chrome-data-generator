import { h } from 'preact';

const Page = props => {
  const { children } = props;

  return (
    <div className="dg-page">
      {children}
    </div>
  );
};

export default Page;
