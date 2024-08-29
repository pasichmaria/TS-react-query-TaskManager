import React from "react";

interface RowProps {
    children: React.ReactNode;
    className?: string;
    gap?: string;
    wrap?: boolean;
}

export const Row = ({
                                            children,
                                            className = "",
                                            gap = "gap-4",
                                            wrap = false,
                                        } : RowProps ) => {
    return (
        <div
            className={`flex ${wrap ? "flex-wrap" : "flex-nowrap"} ${gap} ${className}`}
        >
            {children}
        </div>
    );
};
