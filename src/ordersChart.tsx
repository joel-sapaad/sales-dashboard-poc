import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  Legend,
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
      <AreaChart
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
            <Area
              key={index}
              type="linear"
              legendType="rect"
              dataKey={(data) =>
                data.location === selectedLocation.name ? data.orders : 0
              }
              name={selectedLocation.name}
              stroke={selectedLocation.strokeColor}
              fill={selectedLocation.fillColor}
              scale="time"
            >
              <LabelList
                dataKey={(data: any) =>
                  data.orders > 0 && data.location === selectedLocation.name
                    ? data.orders
                    : ""
                }
              />
            </Area>
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OrdersChart;
