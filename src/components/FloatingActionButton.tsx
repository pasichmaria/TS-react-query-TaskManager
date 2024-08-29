interface FloatingActionButtonProps {
    onClick: () => void;
    ariaLabel?: string;
    icon?: React.ReactNode;
}

export const FloatingActionButton = ({onClick, ariaLabel, icon}: FloatingActionButtonProps) => {
    return (<button
        onClick={onClick}
        aria-label={ariaLabel}
        className="fixed bottom-4 right-4 w-16 h-16 rounded-full flex items-center justify-center text-white bg-blue-600 shadow-lg hover:bg-blue-700 focus:outline-none"
    >
            <span className="text-2xl">
                {icon}
            </span>
    </button>);
};
