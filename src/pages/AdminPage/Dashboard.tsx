import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { getBooks } from "../../api/book.service";
import { Book } from "../../../interfaces";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const generateColors = (count: number): string[] => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }
  return colors;
};

const Dashboard = () => {
  const [categoryData, setCategoryData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchBooksAndPrepareChart();
  }, []);

  const fetchBooksAndPrepareChart = async () => {
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
  };

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
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center justify-center">
          <p className="text-gray-400 italic">Biểu đồ khác sẽ được thêm tại đây...</p>
        </div>
      </div>

      {/* PHẦN DƯỚI: DÀNH CHO CHART KHÁC */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg min-h-[250px] flex items-center justify-center">
        <p className="text-gray-400 italic">Khu vực dành cho biểu đồ phía dưới...</p>
      </div>
    </div>
  );
};

export default Dashboard;
