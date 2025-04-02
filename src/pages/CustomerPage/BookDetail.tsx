import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

const ProductDetail = () => {
    const images = [
        "URL_ẢNH_CHÍNH",
        "URL_ẢNH_PHỤ_1",
        "URL_ẢNH_PHỤ_2",
    ];

    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4 py-4">
            {/* Phần ảnh */}
            <div className="col-span-3 w-full flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg w-full">
                    {/* Ảnh lớn */}
                    <img
                        src={selectedImage}
                        alt="Sách"
                        className="w-full object-cover rounded-lg"
                    />

                    {/* Danh sách ảnh nhỏ */}
                    <div className="flex gap-2 mt-4">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Ảnh ${index + 1}`}
                                className={`w-16 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === img ? "border-blue-500" : "border-gray-300"
                                    }`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>

                    {/* Xem thêm tóm tắt nội dung */}
                    <div className="mt-4 border-t border-gray-100 pt-4 cursor-pointer flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img src="/src/images/iconDauNguoiXanh.png" alt="Icon" className="w-4" />
                            <span className="text-xs text-gray-500">Xem thêm </span>
                            <span className="text-xs font-bold">Tóm tắt nội dung sách</span>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Phần thông tin sản phẩm */}
            <div className="col-span-6 flex flex-col gap-4">
                <div className="rounded-lg p-4 bg-white">
                    <span className="font-semibold">Tác giả: </span>
                    <span className="text-blue-400 font-semibold">Dịch Dương, Phan Trách Bân, Lý Thế Minh</span>
                    <h1 className="text-2xl font-bold">Chat GPT Thực Chiến</h1>
                    <p className="text-yellow-500 font-semibold">4.7 ★★★★★ (100 đánh giá)</p>
                    <p className="text-red-500 text-2xl font-bold">
                        110.000đ <span className="text-gray-500 line-through text-lg">169.000đ</span>
                    </p>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2">Thông tin chi tiết</h2>
                    <div className="grid grid-cols-1 divide-y divide-gray-300 text-gray-600">
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Bookcare:</span> <span className="w-1/2">Có</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Nhà phát hành:</span> <span className="w-1/2">1980 Books</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Ngày xuất bản:</span> <span className="w-1/2">01/07/2024</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Kích thước:</span> <span className="w-1/2">13 x 20.5 cm</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Dịch giả:</span> <span className="w-1/2">Huyền Trang</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Loại bìa:</span> <span className="w-1/2">Bìa mềm</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Số trang:</span> <span className="w-1/2">263</span></div>
                    </div>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
                    <div className="relative">
                        <p
                            className={`text-gray-600 transition-all ${expanded ? "line-clamp-none" : "line-clamp-3"}`}
                        >
                            Trong thời đại AI hiện nay, ai cũng cần biết cách sử dụng công cụ AI để hỗ trợ công việc... AI giúp tối ưu hóa thời gian, tăng hiệu suất làm việc và đem lại những cơ hội mới trong nhiều lĩnh vực. Việc hiểu và sử dụng AI một cách thông minh sẽ là một lợi thế lớn. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eos, vero nihil tenetur, quibusdam quos debitis corrupti possimus ipsa laboriosam tempora omnis cupiditate, itaque officiis harum. Laborum ducimus non excepturi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores dicta voluptatum consequatur libero repellat optio fuga officia quo tenetur. Suscipit alias blanditiis vel nulla optio dolor nobis, exercitationem odio enim!
                        </p>
                        {!expanded && (
                            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent"></div>
                        )}
                    </div>
                    <button
                        className="text-blue-500 mt-2 cursor-pointer block mx-auto"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "Thu gọn" : "Xem thêm"}
                    </button>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-4">Sản phẩm tương tự</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Sản phẩm 1 */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src="/src/images/book1.jpg" alt="Sách 1" className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-sm font-semibold">Tên Sản Phẩm 1</h3>
                            <p className="text-red-500 font-bold">120.000đ</p>
                        </div>

                        {/* Sản phẩm 2 */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src="/src/images/book2.jpg" alt="Sách 2" className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-sm font-semibold">Tên Sản Phẩm 2</h3>
                            <p className="text-red-500 font-bold">150.000đ</p>
                        </div>

                        {/* Sản phẩm 3 */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src="/src/images/book3.jpg" alt="Sách 3" className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-sm font-semibold">Tên Sản Phẩm 3</h3>
                            <p className="text-red-500 font-bold">180.000đ</p>
                        </div>

                        {/* Sản phẩm 4 */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src="/src/images/book4.jpg" alt="Sách 4" className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-sm font-semibold">Tên Sản Phẩm 4</h3>
                            <p className="text-red-500 font-bold">200.000đ</p>
                        </div>

                        {/* Các sản phẩm tiếp theo... */}
                    </div>
                </div>
                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2">Top Deals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Sản phẩm 1 */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src="/src/images/book1.jpg" alt="Sách 1" className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-sm font-semibold">Tên Sản Phẩm 1</h3>
                            <p className="text-red-500 font-bold">120.000đ</p>
                        </div>

                        {/* Sản phẩm 2 */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src="/src/images/book2.jpg" alt="Sách 2" className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-sm font-semibold">Tên Sản Phẩm 2</h3>
                            <p className="text-red-500 font-bold">150.000đ</p>
                        </div>

                        {/* Sản phẩm 3 */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src="/src/images/book3.jpg" alt="Sách 3" className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-sm font-semibold">Tên Sản Phẩm 3</h3>
                            <p className="text-red-500 font-bold">180.000đ</p>
                        </div>

                        {/* Sản phẩm 4 */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src="/src/images/book4.jpg" alt="Sách 4" className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-sm font-semibold">Tên Sản Phẩm 4</h3>
                            <p className="text-red-500 font-bold">200.000đ</p>
                        </div>

                        {/* Các sản phẩm tiếp theo... */}
                    </div>
                </div>
                <div className="rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">An Tâm Mua Sắm</h2>
                        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                            <img src="/src/images/atms1.png" alt="Icon" className="w-5 mt-1" />
                            <p>Được đồng kiểm khi nhận hàng</p>
                        </div>
                        <div className="flex items-start space-x-2">
                            <img src="/src/images/atms2.png" alt="Icon" className="w-5 mt-1" />
                            <p>Được hoàn tiền 200% nếu là hàng giả</p>
                        </div>
                        <div className="flex items-start space-x-2">
                            <img src="/src/images/atms3.png" alt="Icon" className="w-5 mt-1" />
                            <div>
                                <p>Đổi trả miễn phí trong 30 ngày. Được đổi ý.</p>
                                <p className="underline cursor-pointer">Chi tiết</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần đặt hàng */}
            <div className="col-span-3 w-full bg-white rounded-lg p-6">
                <div className="grid grid-cols-[auto_1fr] items-center gap-3 pb-4 border-b border-gray-300">
                    <img src="/src/images/tikiCircle.png" alt="Tiki" className="h-8" />
                    <div className="grid grid-rows-2 items-start gap-1">
                        <h3 className="text-lg font-semibold leading-tight">Tiki Trading</h3>
                        <img src="/src/images/official.png" alt="Official" className="h-5 mt-[-2px]" />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-md font-medium">Số Lượng</p>
                    <div className="flex items-center gap-2 mt-1">
                        <button title="-" className="border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded">
                            <FaMinus />
                        </button>
                        <span className="text-lg font-semibold border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded">1</span>
                        <button title="+" className="border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded">
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-md font-medium">Tạm tính</p>
                    <p className="text-2xl font-bold">110.000đ</p>
                </div>

                <button className="w-full bg-red-500 text-white py-3 rounded-lg mt-4 text-lg font-semibold">
                    Mua ngay
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg mt-2 text-lg font-semibold">
                    Thêm vào giỏ
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg mt-2 text-lg font-semibold">
                    Mua trước trả sau
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
