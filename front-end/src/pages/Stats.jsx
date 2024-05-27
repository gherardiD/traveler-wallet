import { useEffect, useState } from "react";
import Axios from "../api/Axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./Stats.module.css";
import PageNav from "../components/PageNav";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    Axios.get("/expenses/stats")
      .then((response) => setStats(response.data.data.stats))
      .catch((error) => console.error(error));
  }, []);

  const chartData = {
    labels: stats.map((stat) => stat._id),
    datasets: [
      {
        label: "Total Amount",
        data: stats.map((stat) => stat.totalAmount),
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <main className={styles.stats}>
      <PageNav />
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <Bar data={chartData} options={chartOptions} />
        </div>
        <ul className={styles.statsList}>
          {stats.map((stat) => (
            <li key={stat._id} className={styles.statsListItem}>
              <span className={styles.statType}>{stat._id}</span>
              <span className={styles.statDetail}>
                Number of Expenses: {stat.numExpenses}
              </span>
              <span className={styles.statDetail}>
                Average Amount: {stat.avgAmount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
