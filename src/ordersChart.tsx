import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import RenderCustomToolTip from "./renderCustomToolTip";
import { areaChartStyles } from "./styles";
import { dateFormatter } from "./utils";

interface IAreaChartProps {
  salesData: any[];
  locations: string[];
  selectedLocations: any[];
}

const OrdersChart = (props: IAreaChartProps) => {
  return (
    <ResponsiveContainer>
      <LineChart
        width={500}
        height={200}
        data={props.salesData}
        margin={{
          top: 25,
          right: 50,
          left: 0,
          bottom: 20,
        }}
        style={areaChartStyles}
      >
        <CartesianGrid horizontal vertical={false} />
        <XAxis dataKey="date" tickFormatter={dateFormatter} tickCount={3} />
        <YAxis />
        <Tooltip content={RenderCustomToolTip} />
        <Legend verticalAlign="top" height={36} />
        {props.selectedLocations.map((selectedLocation, index) => {
          return (
            <Line
              key={index}
              type="monotone"
              legendType="rect"
              dataKey={(data) =>
                data.location === selectedLocation.name ? data.orders : 0
              }
              name={selectedLocation.name}
              stroke={selectedLocation.strokeColor}
              strokeWidth={2}
              scale="time"
              dot={false}
            >
              <LabelList
                fontSize={12}
                fontWeight={600}
                dataKey={(data: any) =>
                  data.orders > 0 && data.location === selectedLocation.name
                    ? data.orders
                    : ""
                }
              />
            </Line>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OrdersChart;
