import './Button.css';

function Button({children, onClick, type, buttonStyle, id, disabled}) {
    return (
        <button className={buttonStyle} disabled={Boolean(disabled)}
        onClick={onClick}
        type={type}
        id={id}
        >
            {children}
        </button>
    )
}

export default Button;