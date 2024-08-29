export const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8 8 0 0117.709 6H20c0 6.627-5.373 12-12 12v-2.009z"/>
            </svg>
        </div>
    );
}