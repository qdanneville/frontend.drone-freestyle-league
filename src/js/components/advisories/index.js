import React, { useState } from 'react'
import WarningIcon from '../../../assets/svg/warning.svg';

const Advisories = ({ advisories, color, lng, lat }) => {
    return (
        <div className="flex flex-col br-4 overflow-hidden">
            <header className="px-2 py-3 flex justify-between align-center bg-grey-dark-light bt-w-0 bl-w-0 br-w-0 bs-solid br-4">
                <i className="w-6 h-6 block br-5 bw-2 bc-dark-5 bs-solid" style={{ backgroundColor: color }}></i>
                <span className="f6 font-bold text-grey">Coords : {lng.toFixed(4)},{lat.toFixed(4)}</span>
            </header>
            <div className="flex-1">
                <ul className="flex flex-col overflow-y-scroll max-height-210-px">
                    {
                        advisories && advisories.length > 0 ?
                            (
                                advisories.map(advisory => {
                                    return (<li className="flex align-start bg-dark-5 bb-w-1 bt-w-0 bl-w-0 br-w-0 bs-solid bc-grey-dark py-3 px-2" key={advisory.id}>
                                        <div className="mr-3">
                                            <WarningIcon />
                                        </div>
                                        <div className="flex-1 flex flex-col pr-4">
                                            <span className="text-grey-light f5 font-bold mb-2 capitalize">{`${advisory.properties.type}`}</span>
                                            <span className="text-grey f5 lh-4 mb-0">{advisory.name}</span>
                                            {advisory.requirements.notice.phone && <span className="text-grey f5 mt-3">{advisory.requirements.notice.phone}</span>}
                                            <span className="text-dark f7 bg-grey br-50 py-1 px-2 text-align-center mt-3">{advisory.last_updated}</span>
                                        </div>
                                    </li>)
                                })
                            ) :
                            (
                                <div className="flex flex-col flex-1 justify-center align-center px-2">
                                    <span className="text-white good-times f6 font-bold pt-4 text-align-center w-full px-4">It seems like you're good to go !</span>
                                    <span className="text-grey f5 block pt-2 pb-2">Remember: Do not fly over people. Respect other's privacy. And dont loose your craft!</span>
                                </div>
                            )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Advisories