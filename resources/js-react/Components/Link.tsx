import { FC } from 'react';
import { Link as InertiaLink, InertiaLinkProps } from '@inertiajs/react';
import classNames from 'classnames';
import '../../css/components.css';

interface LinkProps extends InertiaLinkProps {
    variant?: 'default' | 'button';
    className?: string;
}

const Link: FC<LinkProps> = ({ 
    children, 
    href, 
    variant = 'default',
    method = 'get',
    as = 'a',
    onBefore,
    className,
    ...props 
}) => {
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
};

export default Link;