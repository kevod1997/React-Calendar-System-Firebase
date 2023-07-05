import React from 'react'

export default function Button({ dia, button, setButton }) {
    const { id, name } = dia
    return ( 
        <input
            key={id}
            type="button"
            value={name}
            className={`
                     p-3 uppercase cursor-pointer shadow font-semibold rounded transition-colors duration-500 
                     ${button === name
                    ? 'bg-blue-600 text-white '
                    : 'bg-white text-blue-600 cursor-pointer'}
                     `}
            onClick={() => setButton(name)}
        />
    )
}
