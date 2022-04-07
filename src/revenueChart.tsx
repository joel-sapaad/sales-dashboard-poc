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

interface IRevenueChartProps {
  locations: string[];
  selectedLocations: any[];
  salesData: any[];
}

const RevenueChart = (props: IRevenueChartProps) => {
  return (
    <ResponsiveContainer>
      <LineChart
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
        <XAxis dataKey="date" tickFormatter={dateFormatter} />
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
                data.location === selectedLocation.name ? data.total_sale : 0
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
                offset={100}
                dataKey={(data: any) =>
                  data.total_sale > 0 && data.location === selectedLocation.name
                    ? data.total_sale
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

export default RevenueChart;
