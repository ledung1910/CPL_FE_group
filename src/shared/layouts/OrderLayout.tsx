import FooterOrder from "../component/FooterOrder";
import HeaderOrder from "../component/HeaderOrder";
import Banner from "../component/Banner";
import { Outlet } from 'react-router-dom'

const CustomerLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Banner />
            <HeaderOrder />
            <main className="flex-grow bg-gray-100">
                <Outlet />
            </main>
            <FooterOrder />
        </div>
    )
}
export default CustomerLayout;