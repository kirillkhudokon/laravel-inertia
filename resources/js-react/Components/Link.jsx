import { Link as InertiaLink } from '@inertiajs/react';
import classNames from 'classnames';
import '../../css/components.css';

export default function Link({ 
    children, 
    href, 
    variant = 'default',
    as = 'a',
    method = 'get',
    onBefore,
    className,
    ...props 
}) {
    const classes = classNames(
        {
            'link': variant === 'default',
            'link-button': variant === 'button',
        },
        className
    );

    if (method !== 'get' || as === 'button') {
        return (
            <InertiaLink
                href={href}
                method={method}
                as={as}
                className={classes}
                onBefore={onBefore}
                {...props}
            >
                {children}
            </InertiaLink>
        );
    }

    return (
        <InertiaLink
            href={href}
            className={classes}
            {...props}
        >
            {children}
        </InertiaLink>
    );
}