import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

interface LayoutProps {
    children: React.ReactNode;
}
export const Layout = ({children }: LayoutProps) => {
    return (
        <div className="flex flex-col w-full h-screen bg-gray-100">
            <main className="md:p-6 lg:p-8 overflow-y-auto">
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    stacked
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {children}
            </main>
        </div>
    );
}
