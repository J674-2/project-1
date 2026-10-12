import { Outlet } from 'react-router';

import Header from './Header';
import Footer from './Footer';

export default function Layout() {

    return (
        <>
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-1 px-4 sm:px-8 md:px-12 lg:px-16">
                <Outlet />
            </main>
            <Footer />
        </div>
        </>
    )
}
