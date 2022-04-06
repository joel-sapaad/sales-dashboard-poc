import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { sales_data } from "./sales_data";
import { format } from "date-fns";
import OrdersChart from "./ordersChart";
import RevenueChart from "./revenueChart";

function App() {
  const [startDate, setStartDate] = useState(new Date(1643653800000));
  const [endDate, setEndDate] = useState(null as any);
  const [salesData, setSalesData] = useState(sales_data);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([] as any[]);
  const [locations, setLocations] = useState([] as any[]);

  const selectedLocations = [
    { name: "Burjuman", strokeColor: "#110f46", fillColor: "#625dbf" },
    { name: "Noida", strokeColor: "#4f1119", fillColor: "#c73a5e" },
    { name: "Kakkanad", strokeColor: "#325539", fillColor: "#7cbd4e" },
  ];

  useEffect(() => {
    setDateRange(() => salesData.map((sales) => new Date(sales.date)));
    let locations = salesData.map((sales) => sales.location);
    let uniqueLocations = locations.filter(
      (loc, index, self) => self.indexOf(loc) === index
    );
    setLocations(uniqueLocations);
  }, []);

  useEffect(() => {
    if (salesData && salesData.length) {
      let selectedLocs = selectedLocations.map((loc) => loc.name);
      let newSalesData: any = [...salesData].filter((loc)=>{
        return selectedLocs.includes(loc.location)
      })
      console.table(
        newSalesData.map((sales: any) => {
          let unixDate = sales.date;
          sales["fdate"] = format(unixDate, "dd MMM yyyy");
          return sales;
        })
      );

      setTotalOrders(() =>
        newSalesData.reduce((total, sales) => {
          return selectedLocs.includes(sales.location)
            ? total + sales.orders
            : total + 0;
        }, 0)
      );
      setTotalRevenue(() =>
        newSalesData.reduce((total, sales) => {
          return total + sales.total_sale;
        }, 0)
      );
    }
  }, [salesData]);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    if (start && end) {
      filterSalesBySelectedDate(start, end);
    }
    setStartDate(start);
    setEndDate(end);
  };

  const filterSalesBySelectedDate = (start_date: Date, end_date: Date) => {
    let unixStartDate = start_date.getTime();
    let unixEndDate = end_date.getTime();
    let filteredSalesData = sales_data.filter((sales) => {
      return sales.date >= unixStartDate && sales.date <= unixEndDate;
    });
    if (filteredSalesData.length > 0) {
      setSalesData(filteredSalesData);
    }
  };

  return (
    <div className="App">
      <h1>Sales Dashboard</h1>
      <h4
        style={{
          display: "inline",
          paddingRight: "10px",
        }}
      >
        {format(startDate, "dd MMM yyyy")} -{" "}
        {endDate && format(endDate, "dd MMM yyyy")}
      </h4>
      <button
        style={{ width: "30px", height: "30px" }}
        onClick={() => setShowDatePicker(!showDatePicker)}
      >
        🗓
      </button>
      {showDatePicker && (
        <div
          className="datePicker"
          style={{
            display: "block",
            position: "absolute",
            background: "#fff",
            zIndex: 1,
            left: "245px",
            top: "80px",
          }}
        >
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            includeDates={dateRange}
            shouldCloseOnSelect
            selectsRange
            inline
          />
        </div>
      )}
      <div
        className="charts"
        style={{
          display: "flex",
          height: "400px",
          justifyContent: "space-evenly",
        }}
      >
        {salesData && (
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
            <RevenueChart
              salesData={salesData}
              locations={locations}
              selectedLocations={selectedLocations}
            />
          </div>
        )}
        {salesData && (
          <div style={{ width: "45%", height: "300px" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "2rem",
                color: "#6b6b6b",
                fontWeight: "500",
              }}
            >
              Orders
            </p>
            <OrdersChart
              salesData={salesData}
              locations={locations}
              selectedLocations={selectedLocations}
            />
          </div>
        )}
      </div>
      <div
        className="summary"
        style={{
          display: "flex",
          height: "400px",
          marginTop: "30px",
          marginLeft: "40px",
        }}
      >
        <div
          className="total-revenue"
          style={{
            width: "200px",
            height: "150px",
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
  );
}

export default App;
