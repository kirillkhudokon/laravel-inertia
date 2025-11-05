import classNames from 'classnames';
import '../../css/components.css';

export default function TextArea({ 
    id,
    label,
    value,
    onChange,
    placeholder,
    rows = 5,
    error,
    required = false,
    className,
    ...props 
}) {
    const textareaClasses = classNames(
        'textarea',
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
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={textareaClasses}
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