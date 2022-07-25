import React, { useContext, useEffect, useRef } from 'react'
import { FormContext } from '../App'

const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidConfirmPw: '비밀번호가 일치하지 않습니다.',
}
const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const FormField = ({ id, label, inputProps, errorData, setErrorData }) => {
    const { formData, setFormData } = useContext(FormContext)
    const inputElem = useRef()

    const checkRegex = (inputId) => {
        const value = formData[inputId]
        let result
        if (value.length === 0) {
            result = 'required'
        } else {
            switch (inputId) {
                case 'id':
                    result = ID_REGEX.test(value) ? true : 'invalidId'
                    break
                case 'pw':
                    result = PW_REGEX.test(value) ? true : 'invalidPw'
                    checkRegex('confirmPw')
                    break
                case 'confirmPw':
                    result =
                        value === formData['pw'] ? true : 'invalidConfirmPw'
                    break
                default:
                    throw new Error('invalid id')
            }
        }
        // setState는 비동기적으로 실행
        // 1. 비밀번호 유효성 검사 후
        // 2. 비밀번호 확인을 해야 함
        // 이 두 동작이 동기적이지 않음
        // 상태값 갱신을 함수형으로 하지 않으면 최신 값을 참조할 수 없어짐
        setErrorData((errorData) => ({ ...errorData, [inputId]: result }))
    }
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
                onBlur={() => checkRegex(id)}
            />
            <div className="mt-1 mb-3 text-xs text-red-500">
                {ERROR_MSG[errorData[id]]}
            </div>
        </div>
    )
}

export default FormField
