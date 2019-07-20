import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

const Redirect = props => {
  const { to } = props;

  useEffect(() => {
    route(to, true);
  });

  return null;
};

export default Redirect;
