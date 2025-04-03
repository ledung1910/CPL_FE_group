import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface ApiResponse {
    books: Product[];
}
interface Product {
    id: string;
    name: string;
    authors: Array<{
        name: string;
        slug: string;
    }>;
    current_seller: {
        price: number;
        name: string;
    };
    rating_average: number;
    quantity_sold: {
        text: string;
    };
    original_price: number;
    images: Array<{
        large_url: string;
        medium_url: string;
        small_url: string;
    }>;
    specifications: Array<{
        attributes: Array<{
            name: string;
            value: string;
        }>;
    }>;
    description: string;
    short_description: string;
}

const ProductDetail = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [topDeals, setTopDeals] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [expanded, setExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api.json');
                if (!response.ok) throw new Error('Không thể tải dữ liệu');

                const data: ApiResponse = await response.json();

                if (data.books?.length > 0) {
                    // Lấy sản phẩm chính (phần tử đầu tiên)
                    setProduct(data.books[0]);
                    setSelectedImage(data.books[0].images[0]?.large_url || '');

                    // Giả lập dữ liệu sản phẩm liên quan (4 sản phẩm tiếp theo)
                    setRelatedProducts(data.books.slice(1, 5));

                    // Giả lập top deals (4 sản phẩm ngẫu nhiên)
                    setTopDeals([...data.books].sort(() => 0.5 - Math.random()).slice(0, 4));
                } else {
                    throw new Error('Không có sản phẩm nào');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi không xác định');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getSpecification = (name: string) => {
        if (!product?.specifications?.[0]?.attributes) return 'N/A';
        const spec = product.specifications[0].attributes.find(attr =>
            attr.name?.toLowerCase().includes(name.toLowerCase())
        );
        return spec?.value || 'N/A';
    };

    const renderProductCard = (product: Product) => (
        <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
                src={product.images[0]?.small_url || '/placeholder-book.jpg'}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>
            <p className="text-red-500 font-bold mt-2">
                {product.current_seller?.price?.toLocaleString()}đ
            </p>
        </div>
    );

    if (loading) return <div className="max-w-[1400px] mx-auto py-4 text-center">Đang tải...</div>;
    if (error) return <div className="max-w-[1400px] mx-auto py-4 text-center text-red-500">{error}</div>;
    if (!product) return <div className="max-w-[1400px] mx-auto py-4 text-center">Không tìm thấy sản phẩm</div>;

    return (
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4 py-4">
            {/* Phần ảnh */}
            <div className="col-span-3 w-full flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg w-full">
                    {/* Ảnh lớn */}
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-full object-cover rounded-lg"
                    />

                    {/* Danh sách ảnh nhỏ */}
                    <div className="flex gap-2 mt-4">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img.small_url}
                                alt={`Ảnh ${index + 1}`}
                                className={`w-16 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === img.large_url ? "border-blue-500" : "border-gray-300"
                                    }`}
                                onClick={() => setSelectedImage(img.large_url)}
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
                    <span className="text-blue-400 font-semibold">
                        {product.authors?.map(author => author.name).join(', ')}
                    </span>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-yellow-500 font-semibold">
                        {product.rating_average} ★★★★★ ({product.quantity_sold.text})
                    </p>
                    <p className="text-red-500 text-2xl font-bold">
                        {product.current_seller.price.toLocaleString()}đ
                        {product.original_price > product.current_seller?.price && (
                            <span className="text-gray-500 line-through text-lg ml-2">
                                {product.original_price.toLocaleString()}đ
                            </span>
                        )}
                    </p>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2">Thông tin chi tiết</h2>
                    <div className="grid grid-cols-1 divide-y divide-gray-300 text-gray-600">
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Nhà phát hành:</span> <span className="w-1/2">{getSpecification('Công ty phát hành')}</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Ngày xuất bản:</span> <span className="w-1/2">{getSpecification('Ngày xuất bản')}</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Kích thước:</span> <span className="w-1/2">{getSpecification('Kích thước')}</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Loại bìa:</span> <span className="w-1/2">{getSpecification('Loại bìa')}</span></div>
                        <div className="flex py-2"><span className="w-1/2 font-semibold">Số trang:</span> <span className="w-1/2">{getSpecification('Số trang')}</span></div>
                    </div>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
                    <div className="relative">
                        <div
                            className={`text-gray-600 transition-all ${expanded ? "line-clamp-none" : "line-clamp-3"}`}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
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

                {/* Các phần sản phẩm tương tự, top deals... giữ nguyên như cũ */}
                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-4">Sản phẩm tương tự</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {relatedProducts.length > 0 ? (
                            relatedProducts.map(renderProductCard)
                        ) : (
                            <p className="text-gray-500">Không có sản phẩm tương tự</p>
                        )}
                    </div>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Top Deals</h2>
                        <button className="text-blue-500 text-sm flex items-center">
                            Xem thêm <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {topDeals.length > 0 ? (
                            topDeals.map(renderProductCard)
                        ) : (
                            <p className="text-gray-500">Không có deal nào</p>
                        )}
                    </div>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">An Tâm Mua Sắm</h2>
                        <FontAwesomeIcon icon={faChevronRight} className="text-gray-500" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <img src="/src/images/atms1.png" alt="Icon" className="w-5 mt-1 flex-shrink-0" />
                            <p className="text-sm">Được đồng kiểm khi nhận hàng</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <img src="/src/images/atms2.png" alt="Icon" className="w-5 mt-1 flex-shrink-0" />
                            <p className="text-sm">Được hoàn tiền 200% nếu là hàng giả</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <img src="/src/images/atms3.png" alt="Icon" className="w-5 mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm">Đổi trả miễn phí trong 30 ngày</p>
                                <p className="text-blue-500 text-sm underline cursor-pointer">Chi tiết</p>
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
                        <h3 className="text-lg font-semibold leading-tight">{product.current_seller.name}</h3>
                        <img src="/src/images/official.png" alt="Official" className="h-5 mt-[-2px]" />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-md font-medium">Số Lượng</p>
                    <div className="flex items-center gap-2 mt-1">
                        <button
                            title="-"
                            className="border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded"
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        >
                            <FaMinus />
                        </button>
                        <span className="text-lg font-semibold border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded">
                            {quantity}
                        </span>
                        <button
                            title="+"
                            className="border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded"
                            onClick={() => setQuantity(prev => prev + 1)}
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-md font-medium">Tạm tính</p>
                    <p className="text-2xl font-bold">
                        {(product.current_seller.price * quantity).toLocaleString()}đ
                    </p>
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