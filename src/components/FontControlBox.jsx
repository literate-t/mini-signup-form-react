import React, { useEffect, useState } from 'react'

const $html = document.documentElement
const getHtmlFontSize = () => {
    return parseFloat(getComputedStyle($html).fontSize)
}
const setHtmlFontSize = (size) => {
    $html.style.fontSize = `${size}px`
}

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const FontControlBox = () => {
    const [fontSize, setFontSize] = useState(getHtmlFontSize())

    const handleFontSize = (type) => {
        type === 'increase'
            ? setFontSize((size) => size + 1)
            : setFontSize((size) => size - 1)
    }

    useEffect(() => {
        setHtmlFontSize(fontSize)
    }, [fontSize])
    return (
        <aside id="font-control-box" className="flex fixed bottom-0 right-0">
            <button
                id="increase-font-btn"
                className="bg-white text-gray-500 border border-gray-300 hover:bg-red-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
                onClick={() => handleFontSize('increase')}
                disabled={MAX_FONT_SIZE <= fontSize}
            >
                +
            </button>
            <button
                id="decrease-font-btn"
                className="bg-white text-gray-500 border border-gray-300 hover:bg-blue-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
                onClick={() => handleFontSize('decrease')}
                disabled={fontSize <= MIN_FONT_SIZE}
            >
                -
            </button>
        </aside>
    )
}

export default FontControlBox
