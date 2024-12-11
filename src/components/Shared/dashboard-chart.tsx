import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const MonthlyRevenueCard = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        data: [20, 25, 35, 30, 35, 40, 35, 45, 25],
        fill: true,
        borderColor: '#4ade80',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#4ade80',
        pointBorderColor: '#4ade80',
        pointRadius: 4,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(74, 222, 128, 0.2)');
          gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');
          return gradient;
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const stats = [
    { label: 'Clicks', value: 2589, color: 'bg-pink-500' },
    { label: 'Likes', value: 6748, color: 'bg-yellow-500' },
    { label: 'Upvotes', value: 9842, color: 'bg-blue-500' },
  ];

  const maxValue = Math.max(...stats.map(stat => stat.value));

  return (
    <div className="bg-[#070C29] rounded-2xl p-6 w-full max-w-md shadow-lg shadow-navy-900/50">
      <div className="h-48 mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <h2 className="text-4xl font-bold text-white">36.7%</h2>
          <span className="text-emerald-400 flex items-center">
            <svg className="w-3 h-3 mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2.5L9.5 6L8.5 7L6.5 5V9.5H5.5V5L3.5 7L2.5 6L6 2.5Z" fill="currentColor"/>
            </svg>
            <span className="text-sm">34.5%</span>
          </span>
        </div>
        <p className="text-gray-400 text-sm">Visitors Growth</p>
      </div>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{stat.label}</span>
              <span className="text-white">{stat.value}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                style={{ width: `${(stat.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyRevenueCard;

