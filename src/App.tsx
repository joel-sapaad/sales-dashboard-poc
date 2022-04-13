import { useEffect, useState } from "react";
import OrdersBarChart from "./ordersBarChart";
import RevenueBarChart from "./revenueBarChart";

function App() {
  const [salesData, setSalesData] = useState([] as any[]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [locations, setLocations] = useState([] as any[]);

  useEffect(() => {
    // let interval = setInterval(() => {
    fetch("http://localhost:3001/orders")
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          setSalesData(data);
        }
      });
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let locations = salesData.map((sales) => sales.location_id);
    let uniqueLocations = locations.filter(
      (loc, index, self) => self.indexOf(loc) === index
    );
    let totalByLocations: any[] = [];
    uniqueLocations.forEach((location) => {
      let loc = {} as any;
      loc.location_id = location;
      loc.total_orders = salesData.reduce((total, data) => {
        return data.location_id === location ? total + 1 : total + 0;
      }, 0);
      loc.total_revenue = salesData.reduce((total, data) => {
        return data.location_id === location
          ? total + data.total_amount
          : total + 0;
      }, 0);
      totalByLocations.push(loc);
    });
    setLocations(totalByLocations);
  }, [salesData.length]);

  useEffect(() => {
    setTotalOrders(() =>
      locations.reduce((total, data) => {
        return total + data.total_orders;
      }, 0)
    );

    setTotalRevenue(() =>
      locations.reduce((total, data) => {
        return total + data.total_revenue;
      }, 0)
    );
  }, [JSON.stringify(locations)]);

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="header">
          <h1>Sales Dashboard</h1>
        </div>
        <div
          className="summary"
          style={{
            display: "flex",
            height: "200px",
            marginTop: "30px",
            marginLeft: "80px",
          }}
        >
          <div
            className="total-revenue"
            style={{
              width: "200px",
              height: "150px",
              border: "0.5px solid #bababa",
              borderRadius: "10px",
              boxShadow: "20px 20px 40px #d9d9d9, -20px -20px 40px #ffffff",
              marginRight: "30px",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#6b6b6b",
                fontWeight: "500",
              }}
            >
              Total Revenue
            </p>
            <h1 style={{ textAlign: "center" }}>
              {"INR "}
              {totalRevenue}
            </h1>
          </div>
          <div
            className="total-orders"
            style={{
              width: "200px",
              height: "150px",
              border: "0.5px solid #bababa",
              borderRadius: "10px",
              boxShadow: "20px 20px 40px #d9d9d9, -20px -20px 40px #ffffff",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "1rem",
                color: "#6b6b6b",
                fontWeight: "500",
              }}
            >
              Total Orders
            </p>
            <h1 style={{ textAlign: "center" }}>{totalOrders}</h1>
          </div>
        </div>
      </div>
      <div
        className="charts"
        style={{
          display: "flex",
          height: "400px",
          justifyContent: "space-evenly",
        }}
      >
        {locations && (
          <div style={{ width: "45%", height: "300px" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "2rem",
                color: "#6b6b6b",
                fontWeight: "500",
              }}
            >
              {"Orders"}
            </p>
            <OrdersBarChart locations={locations} />
          </div>
        )}
        {locations && (
          <div style={{ width: "45%", height: "300px" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "2rem",
                color: "#6b6b6b",
                fontWeight: "500",
              }}
            >
              {"Revenue (INR)"}
            </p>
            <RevenueBarChart locations={locations} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
