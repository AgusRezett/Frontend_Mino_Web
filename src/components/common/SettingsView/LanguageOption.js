import React, { useContext } from 'react';

// Components
import { FormattedMessage } from 'react-intl';
import { langContext } from '../../../hooks/useContext/LangContext';

export default function LanguageOption({ flag, language, region, code }) {
    const idioma = useContext(langContext);

    return <div className='language-option-container'
        onClick={() => {
            idioma.changeLang({ code });
            localStorage.setItem("language", language);
            localStorage.setItem("region", region);

            window.navigator.vibrate(50);
            window.location.reload();
        }}
    >
        <div className='language-option-content'>
            <div className='language-option-title'>
                <b><FormattedMessage id={language} defaultMessage="Error" /> </b>
                (<FormattedMessage id={region} defaultMessage="Error" />)
            </div>
            <div className='language-option-flag'>
                <img src={flag} alt={language} />
            </div>
        </div>
    </div>;
}