import classNames from 'classnames';
import '../../css/components.css';

export default function Button({ 
    children, 
    variant = 'primary', 
    size = 'normal',
    disabled = false,
    type = 'button',
    onClick,
    className,
    ...props 
}) {
    const classes = classNames(
        'btn',
        `btn-${variant}`,
        {
            [`btn-${size}`]: size !== 'normal',
        },
        className
    );

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}