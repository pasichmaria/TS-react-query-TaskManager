interface SectionProps {
    children: React.ReactNode;
    className?: string;
    padding?: string;
    bg?: string;
}

export const Section = ({ children, className = "", padding = "py-4 px-4", bg } : SectionProps ) => {
    return (<section className={`${padding} ${bg} ${className}`}>
            {children}
        </section>);
};
