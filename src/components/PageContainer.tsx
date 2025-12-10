import { ReactNode } from 'react';

interface PageContainerProps {
    className?: string;
    children: ReactNode;
}

export default function PageContainer({ className = '', children }: PageContainerProps) {
    return (
        <div className={`mx-auto max-w-[1150px] px-6 md:px-42 py-12 md:py-14 ${className}`}>
            {children}
        </div>
    )
}
