import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import '../../css/app.css';

interface AlertProps {
    variant?: 'danger'
    type?: 'success' | 'error' | 'warning' | 'info' | 'danger';
    className?: string;
}

const Alert: FC<PropsWithChildren<AlertProps>> = ({ children, type = 'success', className }) => {
    const alertClasses = classNames(
        'alert',
        `alert-${type}`,
        className
    );
    
    return (
        <div className={alertClasses}>
            {children}
        </div>
    );
};

export default Alert;