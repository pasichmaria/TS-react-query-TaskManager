import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    disabled? : boolean
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    color: "blue" | "cyan" | "transparent" | "red"
}

export const Button = ({
    disabled,
    type,
    onClick,
    children,
    className,
    color
}: ButtonProps) => {
    const colors = {
        blue: "bg-blue-500 hover:bg-blue-700",
        cyan: "bg-cyan-500 hover:bg-cyan-700",
        transparent: "bg-transparent hover:bg-gray-800",
        red: "bg-red-500 hover:bg-red-700",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${colors[color]} text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 ${className}`}
            type={type}
        >
            {children}
        </button>
    );
}