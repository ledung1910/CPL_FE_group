import { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { Book } from "../../../../interfaces";
import usePagination from "../../../hooks/usePagination";
import { getBooks, getBookById } from "../../../api/book.service";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from "../Authentication/Login";
import RegisterPopup from "../Authentication/Register";
import { addToCart } from "../../../api/cart.service";
import AddToCartSuccessPopup from "../../../shared/component/AddtoCartSuccess";


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Book | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [expanded, setExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const { user } = useAuth();
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const navigate = useNavigate();
    const [isLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const [booksData, bookDetail] = await Promise.all([
                    getBooks(),
                    getBookById(id),
                ]);

                if (booksData.length === 0) throw new Error("Không có sản phẩm nào");

                setBooks(booksData);
                setProduct(bookDetail);
                setSelectedImage(bookDetail.images[0]?.large_url || "");
            } catch (err) {
                setError(err instanceof Error ? err.message : "Lỗi không xác định");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddToCart = () => {
        if (!user) {
            setLoginOpen(true);
            return;
        }
        if (!product) return;
        try {
            addToCart({
                id: product.id,
                list_price: product.current_seller.price,
                quantity: quantity,
            });
            window.dispatchEvent(new Event("cartUpdated"));
            setShowPopup(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBuyNow = async () => {
        if (!user) {
            toast.warning("Bạn cần đăng nhập để mua sản phẩm này.");
            setLoginOpen(true);
            return;
        }
        if (!product) {
            toast.error("Sản phẩm không tồn tại.");
            return;
        }

        if (quantity <= 0) {
            toast.warning("Vui lòng chọn số lượng lớn hơn 0.");
            return;
        }

        if (!user.address || !user.address.street || !user.address.city || !user.address.district) {
            toast.warning("Vui lòng cập nhật đầy đủ địa chỉ giao hàng trước khi đặt hàng.");
            return;
        }

        try {
            const checkoutData = {
                bookId: product.id,
                quantity: quantity,
                price: product.current_seller.price * quantity,
            };

            const searchParams = new URLSearchParams();
            for (const key in checkoutData) {
                searchParams.append(key, checkoutData[key as keyof typeof checkoutData].toString());
            }
            navigate(`/checkout?${searchParams.toString()}`);

        } catch (error) {
            console.error("Lỗi khi xử lý mua ngay:", error);
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    const relatedBooks = product ? books.filter((book) => book.id !== product.id && book.categories.id === product.categories.id) : [];
    const topDeals = books.filter((book) => book.current_seller?.is_best_store && book.id !== product?.id);

    const {
        currentItems: relatedItems,
        next: nextRelated,
        prev: prevRelated,
        goToPage: goToRelatedPage,
        currentPage: currentRelatedPage,
        totalPages: totalRelatedPages,
    } = usePagination(relatedBooks, 4);

    const {
        currentItems: topDealItems,
        next: nextTopDeal,
        prev: prevTopDeal,
        goToPage: goToTopDealPage,
        currentPage: currentTopDealPage,
        totalPages: totalTopDealPages,
    } = usePagination(topDeals, 4);

    const calculateDiscountPercentage = () => {
        if (!product || product.original_price <= product.current_seller.price)
            return 0;
        return Math.round(
            ((product.original_price - product.current_seller.price) /
                product.original_price) *
            100
        );
    };

    const handleViewMore = () => {
        console.log("Xem thêm sản phẩm");
    };

    const renderProductGrid = (
        title: string,
        items: Book[],
        currentPage: number,
        totalPages: number,
        onNext: () => void,
        onPrev: () => void,
        onViewMore?: () => void
    ) => (
        <div className="rounded-lg p-4 bg-white mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                {onViewMore && items.length > 0 && (
                    <button
                        onClick={onViewMore}
                        className="text-blue-500 text-sm flex items-center hover:underline"
                    >
                    </button>
                )}
            </div>

            <div className="relative min-h-[300px]">
                {currentPage > 0 && (
                    <button
                        title="Previous"
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 z-10 border border-gray-200"
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="text-gray-600 text-lg"
                        />
                    </button>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2">
                    {items.length > 0 ? (
                        items.map((book) => (
                            <Link
                                to={`/detail/${book.id}`}
                                key={book.id}
                                className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
                            >
                                <img
                                    src={book.images[0]?.large_url || "/placeholder-book.jpg"}
                                    alt={book.name}
                                    className="w-full h-40 object-cover mb-2 rounded"
                                />
                                <h3 className="text-sm font-semibold line-clamp-2 flex-grow">
                                    {book.name}
                                </h3>
                                <div>
                                    <p className="text-red-500 font-semibold">
                                        {book.current_seller?.price?.toLocaleString()}đ
                                    </p>
                                    {book.original_price > book.current_seller?.price && (
                                        <p className="text-gray-400 text-sm line-through">
                                            {book.original_price.toLocaleString()}đ
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            Không có sản phẩm
                        </div>
                    )}
                </div>

                {currentPage < totalPages - 1 && items.length > 0 && (
                    <button
                        title="Next"
                        onClick={onNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 z-10 border border-gray-200"
                    >
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="text-gray-600 text-lg"
                        />
                    </button>
                )}
            </div>

            {totalPages > 1 && items.length > 0 && (
                <div className="flex justify-center items-center mt-6 gap-1.5">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                title.includes("Top Deals")
                                    ? goToTopDealPage(index)
                                    : goToRelatedPage(index)
                            }
                            className={`w-6 h-1.5 rounded-full transition-all duration-300 ${(title.includes("Top Deals")
                                ? currentTopDealPage
                                : currentRelatedPage) === index
                                ? "bg-blue-500 w-8"
                                : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    if (loading)
        return (
            <div className="max-w-[1400px] mx-auto py-20 text-center">
                Đang tải...
            </div>
        );
    if (error)
        return (
            <div className="max-w-[1400px] mx-auto py-20 text-center text-red-500">
                {error}
            </div>
        );
    if (!product)
        return (
            <div className="max-w-[1400px] mx-auto py-20 text-center">
                Không tìm thấy sản phẩm
            </div>
        );

    return (
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 py-4 px-4">
            <div className="col-span-12 sm:col-span-6 lg:col-span-3 w-full flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg w-full">
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-full object-cover rounded-lg"
                    />
                    <div className="flex gap-2 mt-4 px-1 overflow-x-auto max-w-full scrollbar-thin">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                ref={(el) => {
                                    imageRefs.current[index] = el;
                                }}
                                src={img.large_url}
                                alt={`Ảnh ${index + 1}`}
                                className={`w-16 h-20 object-cover rounded-lg border-2 flex-shrink-0 transition-transform duration-300 transform cursor-pointer ${selectedImage === img.large_url
                                    ? "border-blue-500"
                                    : "border-gray-300"
                                    }`}
                                onClick={() => {
                                    setSelectedImage(img.large_url);
                                    imageRefs.current[index]?.scrollIntoView({
                                        behavior: "smooth",
                                        inline: "center",
                                        block: "nearest",
                                    });
                                }}
                            />
                        ))}
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-4 cursor-pointer flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img
                                src="/images/iconDauNguoiXanh.png"
                                alt="Icon"
                                className="w-4"
                            />
                            <span className="text-xs text-gray-500">Xem thêm </span>
                            <span className="text-xs font-bold">Tóm tắt nội dung sách</span>
                        </div>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className="w-4 h-4 text-gray-500"
                        />
                    </div>
                </div>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-6 flex flex-col gap-4">
                <div className="rounded-lg p-4 bg-white">
                    <span className="font-semibold">Tác giả: </span>
                    <span className="text-blue-400 font-semibold">
                        {product.authors?.map((author) => author.name).join(", ")}
                    </span>

                    <div className="flex items-center mt-2 mb-1">
                        <span className="text-sm text-gray-500 mr-1">
                            {product.rating_average?.toFixed(1) || "0.0"}
                        </span>
                        {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={`${i < Math.floor(product.rating_average || 0)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                    } w-4 h-4`}
                            />
                        ))}
                    </div>

                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <div className="flex items-end gap-2 mt-2">
                        <p className="text-red-500 text-2xl font-bold">
                            {product.current_seller.price.toLocaleString()}đ
                        </p>
                        {product.original_price > product.current_seller?.price && (
                            <>
                                <span className="bg-gray-200 text-black text-xs px-2 py-1 mb-0.5 rounded-full">
                                    {calculateDiscountPercentage()}%
                                </span>
                                <span className="text-gray-500 line-through text-lg">
                                    {product.original_price.toLocaleString()}đ
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2">Thông tin chi tiết</h2>
                    <div className="grid grid-cols-1 divide-y divide-gray-300 text-gray-600">
                        {product?.specifications && (
                            <table className="w-full">
                                <tbody>
                                    {product.specifications.flatMap((spec, specIndex) =>
                                        spec.attributes.map((attr, attrIndex) => (
                                            <tr
                                                key={`${specIndex}-${attrIndex}`}
                                                className="border-t border-gray-300"
                                            >
                                                <td className="py-2 w-1/2 text-gray-400">
                                                    {attr.name}
                                                </td>
                                                <td className="py-2 w-1/2 text-black">{attr.value}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="rounded-lg p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
                    <div className="relative">
                        <div
                            className={`text-gray-600 transition-all ${expanded ? "line-clamp-none" : "line-clamp-3"
                                }`}
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

                {/* Sản phẩm tương tự */}
                <div className="hidden md:block">
                    {renderProductGrid(
                        product
                            ? `Sách cùng ${product.categories.name}`
                            : "Sản phẩm tương tự",
                        relatedItems,
                        currentRelatedPage,
                        totalRelatedPages,
                        nextRelated,
                        prevRelated,
                        handleViewMore
                    )}

                    {/* Top Deals */}
                    {renderProductGrid(
                        "Top Deals",
                        topDealItems,
                        currentTopDealPage,
                        totalTopDealPages,
                        nextTopDeal,
                        prevTopDeal
                    )}

                    {/* An Tâm Mua Sắm */}
                    <div className="rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">An Tâm Mua Sắm</h2>
                            <FontAwesomeIcon icon={faChevronRight} className="text-gray-500" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <img
                                    src="/images/atms1.png"
                                    alt="Icon"
                                    className="w-5 mt-1 flex-shrink-0"
                                />
                                <p className="text-sm">Được đồng kiểm khi nhận hàng</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <img
                                    src="/images/atms2.png"
                                    alt="Icon"
                                    className="w-5 mt-1 flex-shrink-0"
                                />
                                <p className="text-sm">Được hoàn tiền 200% nếu là hàng giả</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <img
                                    src="/images/atms3.png"
                                    alt="Icon"
                                    className="w-5 mt-1 flex-shrink-0"
                                />
                                <div>
                                    <p className="text-sm">Đổi trả miễn phí trong 30 ngày</p>
                                    <p className="text-blue-500 text-sm underline cursor-pointer">
                                        Chi tiết
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần đặt hàng */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3 w-full bg-white rounded-lg p-6">
                <div className="grid grid-cols-[auto_1fr] items-center gap-3 pb-4 border-b border-gray-300">
                    <img src="/images/tikiCircle.png" alt="Tiki" className="h-8" />
                    <div className="grid grid-rows-2 items-start gap-1">
                        <h3 className="text-lg font-semibold leading-tight">
                            Nhà sách Tiki
                        </h3>
                        <img
                            src="/images/official.png"
                            alt="Official"
                            className="h-5 mt-[-2px]"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-md font-medium">Số Lượng</p>
                    <div className="flex items-center gap-2 mt-1">
                        <button
                            title="Quantity -"
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            className="border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                        >
                            <FaMinus size={12} />
                        </button>
                        <span className="text-lg font-semibold border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded">
                            {quantity}
                        </span>
                        <button
                            title="Quantity +"
                            onClick={() => setQuantity((prev) => prev + 1)}
                            className="border border-gray-300 p-2 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                        >
                            <FaPlus size={12} />
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-md font-medium">Tạm tính</p>
                    <p className="text-2xl font-bold">
                        {(product.current_seller.price * quantity).toLocaleString()}đ
                    </p>
                </div>

                <button
                    onClick={handleBuyNow}
                    disabled={isLoading}
                    className={`w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mt-4 text-lg font-semibold transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center"> Đang xử lý... </span>
                    ) : (
                        'Mua ngay'
                    )}
                </button>

                <div>
                    <AddToCartSuccessPopup
                        isOpen={showPopup}
                        onClose={() => setShowPopup(false)}
                    />
                    <button
                        onClick={handleAddToCart}
                        className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 py-3 rounded-lg mt-2 text-lg font-semibold transition-colors"
                    >
                        Thêm vào giỏ
                    </button>
                </div>

                {!user && (
                    <>
                        <LoginPopup
                            isOpen={isLoginOpen}
                            onClose={() => setLoginOpen(false)}
                            onSwitchToRegister={() => {
                                setLoginOpen(false);
                                setRegisterOpen(true);
                            }}
                        />
                        <RegisterPopup
                            isOpen={isRegisterOpen}
                            onClose={() => setRegisterOpen(false)}
                            onSwitchToLogin={() => {
                                setRegisterOpen(false);
                                setLoginOpen(true);
                            }}
                        />
                    </>
                )}

                <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 py-3 rounded-lg mt-2 text-lg font-semibold transition-colors">
                    Mua trước trả sau
                </button>
            </div>
        </div>
    );
};
// end 
export default ProductDetail;