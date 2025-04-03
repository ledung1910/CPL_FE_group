import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 py-5 border-t border-gray-200 text-sm text-gray-800 px-4">
            <div className="ml-8">
                <div className="mb-3">
                    Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch chung:
                </div>

                <div className="flex flex-wrap items-center gap-x-4 mb-4 font-medium">
                    <a href="#" className="hover:underline">Quy chế hoạt động</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">Chính sách giải quyết khiếu nại</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">Chính sách bảo hành</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">Chính sách bảo mật thanh toán</a>
                    <span>|</span>
                    <a href="#" className="hover:underline">Chính sách bảo mật thông tin cá nhân</a>
                </div>

                <div className="text-xs">
                    © 2019 - Bản quyền của Công Ty Cổ Phần TTM - TTM.vn
                </div>
            </div>
        </footer>
    );
};

export default Footer;