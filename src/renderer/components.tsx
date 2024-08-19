import {BiSolidHide, BiSolidShow} from "react-icons/bi";
import React, {useState} from "react";

interface InputPasswordProps {
    inputRef?: React.RefObject<HTMLInputElement>

    onChange?(e: React.ChangeEvent<HTMLInputElement>): void

    value?: string
}

const InputPassword: React.FC<InputPasswordProps> = ({inputRef, onChange, value}) => {
    const [showPassword, setShowPassword] = useState(false);
    return <div className="relative">
        <input
            ref={inputRef}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600"
            value={value}
            onChange={onChange}
            placeholder="Enter your password"
            required
        />
        <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ?
                <BiSolidShow size={16}/>
                :
                <BiSolidHide size={16}/>
            }
        </button>
    </div>
}
export default InputPassword