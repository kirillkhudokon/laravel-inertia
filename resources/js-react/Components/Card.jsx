import classNames from 'classnames';
import '../../css/app.css';

export default function Card({ 
    children, 
    variant = 'default',
    padding = 'normal',
    className,
    ...props 
}) {
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
}