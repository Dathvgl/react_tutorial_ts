import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Fragment } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { OtherInfoHome } from "~/layouts/LayoutHome";
import { RTChartType } from "~/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineProps {
  options: ChartOptions<"line">;
  data: ChartData<"line">;
}

function RTChartHome(props: { data?: unknown | undefined }) {
  const { data } = props;
  if (!data) {
    return <></>;
  }

  const item = data as RTChartType;

  return (
    <>
      <div className="mt-9 flex items-center gap-8 p-8 text-white bg-gradient-to-b from-cyan-500 to-blue-500 rounded-lg">
        <div className="w-84 font-semibold">
          <div className="text-3xl">#zingchart</div>
          <br />
          <div className="flex flex-col gap-4">
            {item.items.slice(0, 3).map((item, index) => (
              <Fragment key={index}>
                <div className="w-full rounded-lg p-4 gap-2 bg-white bg-opacity-20 flex items-center">
                  <div className="flex-1 flex items-center">
                    <div className="px-4">{index}</div>
                    <OtherInfoHome item={item} />
                  </div>
                  <div>???%</div>
                </div>
              </Fragment>
            ))}
            <div className="center-flex">
              <Link className="border border-white rounded-3xl px-6 py-2" to="">
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <RTChartLine item={item} />
        </div>
      </div>
    </>
  );
}

export function RTChartLine(props: { item: RTChartType }) {
  const { item } = props;

  const colors = ["deepskyblue", "green", "red"];

  const lineProps: LineProps = {
    options: {
      maintainAspectRatio: false,
      hover: { intersect: false, mode: "dataset" },
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { display: false },
          grid: { color: "#cccccc" },
          border: { dash: [4, 4], width: 0 },
        },
        x: {
          ticks: { minRotation: 0, maxRotation: 0, color: "white" },
          grid: { display: false },
        },
      },
    },
    data: {
      labels: item.chart.times.map(({ hour }) => `${hour}:00`),
      datasets: Object.keys(item.chart.items).map((key, index) => {
        const obj = item.chart.items;
        return {
          tension: 0.5,
          label: key,
          data: obj[key].map(({ counter }) => counter),
          borderColor: colors[index],
          backgroundColor: "white",
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 3,
          pointHoverBorderColor: colors[index],
          pointHoverBackgroundColor: "white",
        };
      }),
    },
  };

  return (
    <>
      <Line {...lineProps} />
    </>
  );
}

export default RTChartHome;
