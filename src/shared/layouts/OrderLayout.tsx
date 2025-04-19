import FooterOrder from "../component/Footer/FooterOrder";
import HeaderOrder from "../component/Header/HeaderOrder";
import Banner from "../component/Header/Banner";
import { Outlet } from 'react-router-dom'

const OrderLayout = () => {
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
export default OrderLayout;