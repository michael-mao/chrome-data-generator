import { h } from 'preact';

const OverlayPage = props => {
  const { children, isVisible } = props;

  return (
    <div className={`is-overlay dg-page dg-overlay ${isVisible ? '' : 'is-hidden'}`}>
      {children}
    </div>
  );
};

export default OverlayPage;
