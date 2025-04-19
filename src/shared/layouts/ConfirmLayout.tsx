import FooterOrder from "../component/Footer/FooterOrder";
import HeaderConfirm from "../component/Header/HeaderConfirm";
import Banner from "../component/Header/Banner";
import { Outlet } from 'react-router-dom'

const ConfirmLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Banner />
            <HeaderConfirm />
            <main className="flex-grow bg-gray-100">
                <Outlet />
            </main>
            <FooterOrder />
        </div>
    )
}
export default ConfirmLayout;