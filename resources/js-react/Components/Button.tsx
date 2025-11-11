import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import '../../css/components.css';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'link' | 'success';
    size?: 'small' | 'normal' | 'large' | 'sm' | 'md';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
}
const Button: FC<PropsWithChildren<ButtonProps>> = ({ 
    children, 
    variant = 'primary', 
    size = 'normal',
    disabled = false,
    type = 'button',
    onClick,
    className,
    ...props 
}) => {
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

export default Button