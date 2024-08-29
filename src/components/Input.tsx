import React from "react";

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string | number | readonly string[] | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    id?: string;
    name?: string;
    required?: boolean;checked?: boolean;
}

export const Input = ({
                          type , placeholder, value, onChange, className = "", id, name, required = false, checked
                      }: InputProps) => {
    return (<input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`p-2 border rounded-md bg-gray-100 text-gray-700 ${className}`}
            id={id}
            checked={checked}
            name={name}
            required={required}
        />);
};
