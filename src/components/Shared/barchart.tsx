import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp } from 'lucide-react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const RevenueChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                minBarLength: 1,
                data: [15, 40, 35, 50, 25, 18, 20, 35, 15],
                backgroundColor: function (context: any) {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(34, 211, 238, 0.9)'); 
                    gradient.addColorStop(1, 'rgba(34, 211, 238, 0.1)');
                    return gradient;
                },
                borderRadius: 4,
                borderSkipped: false,
                barThickness: 30,
                maxBarThickness: 50
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                border:{
                    display: true,
                    color:"#ffffff"
                },
                ticks: {
                    color: '#94a3b8',
                }
            },
            y: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                    padding: 10,
                },
                max: 60,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#e2e8f0',
                bodyColor: '#e2e8f0', 
                padding: 12,
                borderColor: 'rgba(148, 163, 184, 0.1)',
                borderWidth: 1,
            },
        },
    };

    return (
        <Card className="bg-[#070C29]  rounded-2xl border-0 shadow-lg shadow-navy-900/50 w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-slate-200">Monthly Savings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="h-80 w-full">
                    <Bar data={data} options={options} />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-blue-500">68.9%</span>
                        <div className="flex items-center text-emerald-400 text-sm font-medium">
                            <ArrowUp className="h-4 w-4 mr-1" />
                            34.5%
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">
                        Average monthly Savings
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default RevenueChart;

