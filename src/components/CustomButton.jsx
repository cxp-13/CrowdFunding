import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles }) => {
    return (
        <button
            type={btnType}
            onClick={handleClick}
            className={`px-4 rounded-[10px] font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] ${styles}`}
        >
            {title}
        </button>
    )
}

export default CustomButton