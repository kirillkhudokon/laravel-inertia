import { FC, PropsWithChildren, HTMLAttributes } from 'react';
import classNames from 'classnames';
import '../../css/app.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'featured';
    padding?: 'small' | 'normal' | 'large';
    className?: string;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ 
    children, 
    variant = 'default',
    padding = 'normal',
    className,
    ...props 
}) => {
    const cardClasses = classNames(
        'post-card',
        {
            'post-card--featured': variant === 'featured',
            'post-card--compact': padding === 'small',
            'post-card--spacious': padding === 'large',
        },
        className
    );

    return (
        <div className={cardClasses} {...props}>
            {children}
        </div>
    );
};

export default Card;