import { useCallback, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, CategoryScale, LinearScale, BarElement, LineElement, PointElement, TimeScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar, Pie, Line } from "react-chartjs-2";
import { getBooks, getBookById } from "../../api/book.service";
import orderService from "../../api/order.service";
import { Order, Book } from "../../../interfaces";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale, BarElement, LineElement, PointElement, TimeScale);

const generateColors = (count: number): string[] => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [monthlySelectedYear, setMonthlySelectedYear] = useState<number | null>(null);
  const [monthlySelectedMonth, setMonthlySelectedMonth] = useState<number | null>(null);

  const [categoryData, setCategoryData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [],
  });
  const [financialData, setFinancialData] = useState<ChartData<"bar">>({
    labels: ["Doanh thu", "Lợi nhuận"],
    datasets: [],
  });

  const [monthlyOrderData, setMonthlyOrderData] = useState<ChartData<"line", number[]>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    setMonthlySelectedYear(currentYear);
    setMonthlySelectedMonth(currentMonth);
  }, []);

  const fetchBooksAndPrepareChart = useCallback(async () => {
    try {
      const allBooks = await getBooks();
      const categoryCount: Record<string, number> = {};
      allBooks.forEach((book) => {
        const catName = book.categories?.name || "Không xác định";
        categoryCount[catName] = (categoryCount[catName] || 0) + 1;
      });

      const labels = Object.keys(categoryCount);
      const data = Object.values(categoryCount);
      const backgroundColor = generateColors(labels.length);

      setCategoryData({
        labels,
        datasets: [
          {
            label: "Số lượng sách",
            data,
            backgroundColor,
          },
        ],
      });
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu sách:", err);
    }
  }, []);

  const fetchOrdersAndPrepareFinancialChart = useCallback(async () => {
    try {
      const allOrders: Order[] = await orderService.getOrders();
      let filteredOrders = allOrders.filter(
        (order) => order.status === "delivered"
      );

      if (selectedYear !== null) {
        filteredOrders = filteredOrders.filter((order) => {
          if (order.updated_at) {
            const orderYear = new Date(order.updated_at).getFullYear();
            return orderYear === selectedYear;
          }
          return false;
        });
      }

      if (selectedMonth !== null) {
        filteredOrders = filteredOrders.filter((order) => {
          if (order.updated_at) {
            const orderMonth = new Date(order.updated_at).getMonth() + 1;
            return orderMonth === selectedMonth;
          }
          return false;
        });
      }

      if (selectedDay !== null) {
        filteredOrders = filteredOrders.filter((order) => {
          if (order.updated_at) {
            const orderDate = new Date(order.updated_at).getDate();
            return orderDate === selectedDay;
          }
          return false;
        });
      }

      let totalRevenue = 0;
      let totalProfit = 0;

      for (const order of filteredOrders) {
        totalRevenue += order.total_amount;
        for (const orderItem of order.items) {
          try {
            const book: Book = await getBookById(orderItem.book_id);
            if (book) {
              const costPrice = 0.48 * book.original_price;
              const sellingPrice = book.current_seller.price;
              const profitPerItem = sellingPrice - costPrice;
              totalProfit += profitPerItem * orderItem.quantity;
            }
          } catch (error) {
            console.error(`Lỗi khi lấy thông tin sách ID ${orderItem.book_id}:`, error);
          }
        }
      }

      setFinancialData({
        labels: ["Doanh thu", "Lợi nhuận"],
        datasets: [
          {
            label: "VNĐ",
            data: [totalRevenue, totalProfit],
            backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(75, 192, 192, 0.8)"],
          },
        ],
      });
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu đơn hàng:", error);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const fetchOrdersAndPrepareMonthlyChart = useCallback(async () => {
    try {
      const allOrders: Order[] = await orderService.getOrders();
      let filteredOrders = allOrders;

      if (monthlySelectedYear !== null) {
        filteredOrders = filteredOrders.filter((order) => {
          if (order.created_at) {
            return new Date(order.created_at).getFullYear() === monthlySelectedYear;
          }
          return false;
        });
      }

      if (monthlySelectedMonth !== null) {
        filteredOrders = filteredOrders.filter((order) => {
          if (order.created_at) {
            return new Date(order.created_at).getMonth() + 1 === monthlySelectedMonth;
          }
          return false;
        });
      }

      if (monthlySelectedYear !== null && monthlySelectedMonth !== null) {
        const year = monthlySelectedYear;
        const month = monthlySelectedMonth - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dailyOrderCounts: Record<number, number> = {};
        for (let i = 1; i <= daysInMonth; i++) {
          dailyOrderCounts[i] = 0;
        }

        filteredOrders.forEach(order => {
          if (order.created_at) {
            const orderDate = new Date(order.created_at);
            const orderDay = orderDate.getDate();
            if (orderDate.getFullYear() === year && orderDate.getMonth() === month) {
              dailyOrderCounts[orderDay] = (dailyOrderCounts[orderDay] || 0) + 1;
            }
          }
        });

        const labels: number[] = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const data: number[] = labels.map(day => dailyOrderCounts[day] || 0);
        const displayLabels: string[] = [];
        const displayData: number[] = [];

        labels.forEach((day, index) => {
          if (day === 1 || day % 10 === 1 || day === labels.length) {
            displayLabels.push(day.toString());
            displayData.push(data[index]);
          } else {
            displayLabels.push('');
            displayData.push(data[index]);
          }
        });

        setMonthlyOrderData({
          labels: displayLabels,
          datasets: [
            {
              label: "Số lượng đơn hàng",
              data: displayData,
              fill: false,
              borderColor: "rgba(255, 206, 86, 0.8)",
              tension: 0.1,
              pointBackgroundColor: "rgba(255, 206, 86, 0.8)",
              pointBorderColor: "#fff",
            },
          ],
        });
      } else {
        setMonthlyOrderData({
          labels: [],
          datasets: [],
        });
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu đơn hàng cho biểu đồ đường:", error);
    }
  }, [monthlySelectedYear, monthlySelectedMonth]);

  useEffect(() => {
    fetchBooksAndPrepareChart();
    fetchOrdersAndPrepareFinancialChart();
    fetchOrdersAndPrepareMonthlyChart();
    const intervalId = setInterval(() => {
      fetchBooksAndPrepareChart();
      fetchOrdersAndPrepareFinancialChart();
      fetchOrdersAndPrepareMonthlyChart();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [
    selectedYear,
    selectedMonth,
    selectedDay,
    monthlySelectedYear,
    monthlySelectedMonth,
    fetchBooksAndPrepareChart,
    fetchOrdersAndPrepareFinancialChart,
    fetchOrdersAndPrepareMonthlyChart
  ]);


  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">📊 Dashboard</h1>

      {/* PHẦN TRÊN: PIE CHART + CHART KHÁC (sau này) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* PIE CHART - BÊN TRÁI */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Sách theo Thể Loại
          </h2>
          <div className="flex items-center justify-center">
            <Pie
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right", // 👈 CHÚ THÍCH BÊN PHẢI
                    labels: {
                      color: "#fff",
                    },
                  },
                  title: {
                    display: false,
                  },
                  datalabels: {
                    color: "#fff",
                    formatter: (value, context) => {
                      const dataset = context.chart.data.datasets[0].data as number[];
                      const total = dataset.reduce((acc, val) => acc + val, 0);
                      const percent = ((value / total) * 100).toFixed(1);
                      return `${percent}%`;
                    },
                    font: {
                      weight: "bold",
                      size: 12,
                    },
                  },
                },
              }}
              height={300}
              width={300}
            />
          </div>
        </div>

        {/* BÊN PHẢI (ĐỂ TRỐNG CHO BIỂU ĐỒ KHÁC) */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Doanh thu và Lợi nhuận (Đã giao hàng)
          </h2>
          <div className="flex justify-around mb-4">
            {/* Lựa chọn Năm */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-300">Năm:</label>
              <select
                id="year"
                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white sm:text-sm"
                value={selectedYear === null ? "" : selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === "" ? null : parseInt(e.target.value))}
              >
                <option value="">Tất cả</option>
                {Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => 2020 + i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Lựa chọn Tháng */}
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-300">Tháng:</label>
              <select
                id="month"
                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white sm:text-sm"
                value={selectedMonth === null ? "" : selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value === "" ? null : parseInt(e.target.value))}
                disabled={selectedYear === null}
              >
                <option value="">Tất cả</option>
                {selectedYear !== null && Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* Lựa chọn Ngày */}
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-300">Ngày:</label>
              <select
                id="day"
                className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white sm:text-sm"
                value={selectedDay === null ? "" : selectedDay}
                onChange={(e) => setSelectedDay(e.target.value === "" ? null : parseInt(e.target.value))}
                disabled={selectedMonth === null || selectedYear === null}
              >
                <option value="">Tất cả</option>
                {selectedMonth !== null && selectedYear !== null && Array.from({ length: new Date(selectedYear, selectedMonth, 0).getDate() }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <Bar
              data={financialData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 30,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: false,
                  },
                  datalabels: {
                    color: "#fff",
                    formatter: (value) => {
                      return new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(value);
                    },
                    anchor: "end",
                    align: "top",
                    offset: 15,
                    font: {
                      weight: "bold",
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "#fff",
                      callback: function (value) {
                        return new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          notation: "compact",
                          compactDisplay: "short",
                        }).format(Number(value));
                      },
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                  x: {
                    ticks: {
                      color: "#fff",
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                },
              }}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* PHẦN DƯỚI: DÀNH CHO CHART SỐ LƯỢNG ĐƠN HÀNG THEO THÁNG */}

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg min-h-[300px] flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Số lượng đơn hàng theo tháng
        </h2>
        <div className="flex justify-around mb-4">
          {/* Lựa chọn Năm cho Monthly Chart */}
          <div>
            <label htmlFor="monthlyYear" className="block text-sm font-medium text-gray-300">Năm:</label>
            <select
              id="monthlyYear"
              className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white sm:text-sm"
              value={monthlySelectedYear === null ? "" : monthlySelectedYear}
              onChange={(e) => setMonthlySelectedYear(e.target.value === "" ? null : parseInt(e.target.value))}
            >
              {Array.from({ length: new Date().getFullYear() - 2020 + 1 }, (_, i) => 2020 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Lựa chọn Tháng cho Monthly Chart */}
          <div>
            <label htmlFor="monthlyMonth" className="block text-sm font-medium text-gray-300">Tháng:</label>
            <select
              id="monthlyMonth"
              className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white sm:text-sm"
              value={monthlySelectedMonth === null ? "" : monthlySelectedMonth}
              onChange={(e) => setMonthlySelectedMonth(e.target.value === "" ? null : parseInt(e.target.value))}
              disabled={monthlySelectedYear === null}
            >
              {monthlySelectedYear !== null && Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center">
          {monthlyOrderData.labels && monthlyOrderData.labels.length > 0 ? (
            <Line
              data={monthlyOrderData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      title: (context) => {
                        if (context && context[0] && context[0].label) {
                          return `Ngày: ${context[0].label}`;
                        }
                        return '';
                      },
                      label: (context) => {
                        return `Số lượng: ${context.parsed.y}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    type: 'category',
                    labels: monthlyOrderData.labels as string[],
                    ticks: {
                      color: '#fff',
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: '#fff',
                      stepSize: 1,
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                  },
                },
              }}
              height={300}
            />
          ) : (
            <p className="text-gray-400 text-center">
              {monthlySelectedYear && monthlySelectedMonth
                ? "Không có dữ liệu đơn hàng cho tháng này."
                : "Vui lòng chọn Năm và Tháng để xem biểu đồ."}
            </p>
          )}
        </div>
      </div>
    </div >
  );
};

export default Dashboard;