"use client"

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "danger" | "text" | "icon";
    className?: string;
    type?: "button" | "submit";
}

export default function Button({ children, onClick, variant = "primary", className = "", type = "button" }: ButtonProps) {
    const base = {
        primary: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
        danger: "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",
        text: "px-4 py-2 text-gray-500 hover:text-gray-700",
        icon: "absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs leading-none",
    };

    return (
        <button type={type} onClick={onClick} className={`${base[variant]} ${className}`}>
            {children}
        </button>
    );
}
