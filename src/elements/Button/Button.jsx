import './Button.css';

function Button({children, onClick, type, buttonStyle, id}) {
    return (
        <button className={buttonStyle}
        onClick={onClick}
        type={type}
        id={id}
        >
            {children}
        </button>
    )
}

export default Button;