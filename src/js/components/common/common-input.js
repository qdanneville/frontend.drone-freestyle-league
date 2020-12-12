import React, { useState } from 'react'
import SearchIcon from '../../../assets/svg/search.svg';

const Input = (props) => {

    const { value, type, required, placeholder, className, name, icon, handleChange } = props;

    const [onFocus, setOnFocus] = useState(false);

    let iconComponent = inputIconSwitch(icon);

    return (
        <div className={`input w-full flex align-center ${className} ${onFocus ? 'on-focus' : ''} ${icon ? 'icon' : ''}`}>
            {iconComponent && iconComponent}
            {
                type !== "textarea"
                    ?
                    <input
                        value={value}
                        className="w-full"
                        type={type ? type : 'text'}
                        required={required}
                        placeholder={placeholder}
                        name={name}
                        onChange={(e) => handleChange(e.target.value)}
                        onFocus={() => setOnFocus(true)}
                        onBlur={() => setOnFocus(false)}
                    />
                    :
                    <textarea
                        value={value}
                        className="w-full resize-0 h-full"
                        required={required}
                        placeholder={placeholder}
                        name={name}
                        onChange={(e) => handleChange(e.target.value)}
                        onFocus={() => setOnFocus(true)}
                        onBlur={() => setOnFocus(false)}
                    />
            }
        </div>)
}

const inputIconSwitch = (icon) => {
    switch (icon) {
        case 'search':
            return <SearchIcon />
        default:
            return null
    }
}

export default Input