import classNames from 'classnames';
import '../../css/components.css';

export default function Input({ 
    id,
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    error,
    required = false,
    className,
    ...props 
}) {
    const inputClasses = classNames(
        'input',
        {
            'error': error
        },
        className
    );

    return (
        <div className="form-group">
            {label && (
                <label htmlFor={id} className="form-label">
                    {label}
                    {required && <span style={{ color: '#dc3545' }}>*</span>}
                </label>
            )}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={inputClasses}
                {...props}
            />
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    );
}