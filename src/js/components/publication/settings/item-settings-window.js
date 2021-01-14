import React from 'react'
import BackIcon from '../../../../assets/svg/arrow-w.svg'

const ItemSettingsWindow = (props) => {
    const { window, active, resetSettingsWindow } = props;

    return (
        <div className={`absolute t-0 l-0 w-full h-full transition bg-dark z-index-2 ${active ? 'translate-reset-position' : 'translate-x-100-per'}`}>
            <header className="relative bb-w-1 bl-w-0 bt-w-0 br-w-0 bc-grey-dark-light w-full bs-solid flex items-center justify-center">
                <BackIcon className="absolute t-0 l-4 w-8 h-8 fill-grey cursor-pointer bg-grey-dark-light p-2 br-50 hover:bg-dark-3" onClick={resetSettingsWindow} />
                <h4 className="f3 text-grey-light mb-0 -mt-2 pt-3 pb-5">{window && window.title && window.title}</h4>
            </header>
            <main className="w-full h-full">
                {window && window.component && window.component}
            </main>
        </div>
    )
}

export default ItemSettingsWindow