import { h } from 'preact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const LocaleSelect = props => {
  const { onChange, selected } = props;

  const localeOptions = [
    'az',
    'cz',
    'de',
    'de_AT',
    'de_CH',
    'en',
    'en_AU',
    'en_BORK',
    'en_CA',
    'en_GB',
    'en_IE',
    'en_IND',
    'en_US',
    'en_ZA',
    'en_au_ocker',
    'es',
    'es_MX',
    'fa',
    'fr',
    'fr_CA',
    'ge',
    'id_ID',
    'it',
    'ja',
    'ko',
    'nb_NO',
    'nep',
    'nl',
    'pl',
    'pt_BR',
    'pt_PT',
    'ru',
    'sk',
    'sv',
    'tr',
    'uk',
    'vi',
    'zh_CN',
    'zh_TW',
  ];

  return (
    <div className="field">
      <div className="control has-icons-left">
        <div className="select is-small">
          <select onChange={onChange}>
            {localeOptions.map(locale => (
              <option selected={selected === locale} value={locale}>{locale}</option>
            ))}
          </select>
        </div>
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faGlobe} />
        </span>
      </div>
    </div>
  );
};

export default LocaleSelect;
