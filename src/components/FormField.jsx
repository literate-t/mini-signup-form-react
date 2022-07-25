import React, { useContext, useEffect, useRef } from 'react'
import { FormContext } from '../App'

const FormField = ({ id, label, inputProps }) => {
    const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
    const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')
    const checkRegex = () => {
        const value = formData[id]
        if (value.length === 0) {
            return 'required'
        } else {
            switch (id) {
                case 'id':
                    return ID_REGEX.test(value) ? true : 'invalidId'
                case 'pw':
                    return PW_REGEX.test(value) ? true : 'invalidPw'
                case 'confirmPw':
                    return value === formData['pw'] ? true : 'invalidPwCheck'
                default:
                    throw new Error('invalid id')
            }
        }
    }
    const { formData, setFormData } = useContext(FormContext)
    const inputElem = useRef()
    useEffect(() => {
        if (id === 'id') {
            inputElem.current.focus()
        }
    }, [id])
    return (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                id={id}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                {...inputProps}
                ref={inputElem}
                value={formData[id]}
                onChange={(e) =>
                    setFormData((formData) => ({
                        ...formData,
                        [id]: e.target.value,
                    }))
                }
                onBlur={() => console.log(checkRegex())}
            />
            <div className="mt-1 mb-3 text-xs text-red-500"></div>
        </div>
    )
}

export default FormField
