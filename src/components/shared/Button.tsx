type ButtonProps = {
    text: string,
    onClick?: () => void,
    disabled?: boolean,
    loading?: boolean,
    type?: "button" | "submit" | "reset",
    size?: "small" | "medium" | "large",
    color?: "default" | "primary" | "secondary" | "warning"
}

const Button = ({ 
    text, 
    onClick, 
    disabled = false, 
    loading = false, 
    type = "button", 
    size = "large",
    color = 'default'
}: ButtonProps) => {
    const sizeClasses = {
        small: "py-1 px-2 text-xs w-16",
        medium: "py-2 px-4 text-sm",
        large: "py-3 px-6 text-lg w-full",
    };

    const colors = {
        default: "bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-70 transition-colors",
        primary: "bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-70 transition-colors",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white rounded disabled:opacity-70 transition-colors",
        warning: "bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-70 transition-colors",
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${colors[color]} ${sizeClasses[size]}`}
        >
            {text}
        </button>
    )
}

export default Button;