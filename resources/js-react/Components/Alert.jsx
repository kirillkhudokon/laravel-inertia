import classNames from 'classnames';
import '../../css/app.css';

export default function Alert({ children, type = 'success', className }) {
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
}