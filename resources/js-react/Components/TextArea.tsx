import { FC, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import '../../css/components.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label?: string;
    error?: string;
    required?: boolean;
}

const TextArea: FC<TextAreaProps> = ({ 
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
}) => {
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
};

export default TextArea;