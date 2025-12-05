import { ReactNode } from 'react';

interface PageContainerProps {
    className?: string;
    children: ReactNode;
}

export default function PageContainer({ className = '', children }: PageContainerProps) {
    return (
        <div className={`mx-auto max-w-[1100px] px-6 py-8 sm:py-12 ${className}`}>
            {children}
        </div>
    )
}
