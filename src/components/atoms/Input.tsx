"use client"

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
}

export default function Input({ value, onChange, placeholder, className = "" }: InputProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border border-gray-300 rounded px-3 py-2 ${className}`}
        />
    );
}
