import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';

// Functions
import { modalAction } from '../../../functions/SettingsFunctions';

// Hooks
import { modalContext } from '../../../hooks/useContext/ModalContext';

// Styles
const responsiveStyles = {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
}

export default function OptionButton({ icon, action, langMessageTitle, title, langMessageDescription, description, rightSide, responsive }) {
    // eslint-disable-next-line
    const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
    const modalContextBuild = useContext(modalContext);

    const clickAction = () => {
        switch (action) {
            case "language":
                modalAction(0);
                modalContextBuild.setModalType(action)
                break;
            case "theme":
                modalAction(0);
                modalContextBuild.setModalType(action)
                break;

            default:
                break;
        }
    }

    return <div className="button-option" onClick={() => clickAction()} style={displayWidth <= 480 ? responsive ? responsiveStyles : null : null}>
        <div className="button-information-container">
            <div className="button-header">
                <span className="button-header-icon">{icon}</span>
                <span className="button-header-title">
                    <FormattedMessage id={langMessageTitle} defaultMessage={title} />
                </span>
            </div>
            <span className="button-description">
                <FormattedMessage id={langMessageDescription} defaultMessage={description} />
            </span>
        </div>
        <div className='button-right-side'>
            {rightSide}
        </div>
    </div>;
}
