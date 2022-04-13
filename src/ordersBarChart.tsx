import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { areaChartStyles } from "./styles";

interface IOrdersBarChart {
  locations: any;
}

const OrdersBarChart = (props: IOrdersBarChart) => {
  return (
    <ResponsiveContainer>
      <BarChart
        width={500}
        height={200}
        data={props.locations}
        margin={{
          top: 25,
          right: 50,
          left: 0,
          bottom: 20,
        }}
        style={areaChartStyles}
      >
        <CartesianGrid horizontal vertical={false} />
        <YAxis />
        <XAxis dataKey="location_id" type="category" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="total_orders" fill="#7a76bd" />;
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrdersBarChart;
