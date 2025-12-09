import { ReactNode } from 'react';

interface PageContainerProps {
    className?: string;
    children: ReactNode;
}

export default function PageContainer({ className = '', children }: PageContainerProps) {
    return (
        <div className={`mx-auto max-w-[1150px] px-6 py-12 sm:py-12 ${className}`}>
            {children}
        </div>
    )
}
