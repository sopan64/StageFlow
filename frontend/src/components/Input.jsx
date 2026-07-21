import "../styles/Input.css";

function Input(props) {
    return (
        <input className={`input-field ${props.className || ""}`}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export default Input;