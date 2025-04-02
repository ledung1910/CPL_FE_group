import Footer from "../component/Footer";
import Header from "../component/Header";
import Banner from "../component/Banner";
import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Banner />
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default CustomerLayout;