import "../styles/Button.css";

function Button(props){
    return (
        <button 
            className={`button ${props.className || ""}`}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default Button;