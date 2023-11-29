const TextInput = ({ id, name, value, onChange, disabled, required, maxLength }) => {
    return (
        <div className="form-control w-80">
            <label htmlFor={id} className="label">
                {name}
            </label>
            <input
                id={id}
                disabled={disabled}
                type="text"
                className="input input-bordered"
                autoComplete="off"
                value={value}
                onChange={onChange}
                required={required}
                maxLength={maxLength}
            />
        </div>
    );
};

export default TextInput;
