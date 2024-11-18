"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import jsonData from "@/Data/jsonData";
import jsonPrediction from "@/Data/jsonPrediction";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import RefreshButton from "../Button/RefreshButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const processData = (data) => {
  try {
    const labels = data.map((item) =>
      item.timestamp.split(" ")[1].substring(0, 5)
    );
    const dataset = data.map((item) => item.unitConsumption);

    return { labels, dataset };
  } catch (error) {
    console.error("Error processing data:", error);
    return { labels: [], dataset: [] };
  }
};

const calculateDailyConsumption = (data) => {
  const dailyConsumption = {};

  data.forEach((item) => {
    const date = moment(item.timestamp).format("YYYY-MM-DD");
    dailyConsumption[date] =
      (dailyConsumption[date] || 0) + item.unitConsumption;
  });

  const sortedDates = Object.keys(dailyConsumption).sort();
  const labels = sortedDates.map((_, index) => `Day${index + 1}`);
  const dataset = sortedDates.map((date) =>
    parseFloat(dailyConsumption[date].toFixed(2))
  );
  const dateMapping = sortedDates;

  return { labels, dataset, dateMapping };
};

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(Date());
  const [selectedDate, setSelectedDate] = useState(Date());
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Daily Consumption");
  const [chartConfig, setChartConfig] = useState({
    labels: [],
    dataset: [],
    dateMapping: [],
  });

  const fetchDataForDate = (date) => {
    console.log(date);

    const formattedDate = moment(date).format("YYYY-MM-DD");
    console.log("formatD", formattedDate);

    const sourceData =
      selectedCategory === "Prediction" ? jsonPrediction : jsonData;

    console.log("prdiction or not", selectedCategory === "Prediction");
    const filteredData = sourceData.filter((item) => {
      console.log(moment(item.timestamp).format("YYYY-MM-DD"));
      console.log(formattedDate);

      return moment(item.timestamp).format("YYYY-MM-DD") === formattedDate;
    });

    console.log(filteredData);

    if (filteredData.length > 0) {
      setData(filteredData);
      const processedData = processData(filteredData);
      setChartConfig(processedData);
      setIsGraphVisible(true);
    } else {
      alert("No data available for the selected date");
      setIsGraphVisible(false);
    }
  };

  // const handleSelection = (option) => {
  //   const sourceData = option === "Prediction" ? jsonPrediction : jsonData;

  //   if (option === "Daily Consumption") {
  //     const processedData = calculateDailyConsumption(sourceData);
  //     setChartConfig(processedData);
  //   }

  //   setSelectedCategory(option);
  //   setIsGraphVisible(option !== "Daily Consumption");
  // };

  const chartData = {
    labels: chartConfig.labels,
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data: chartConfig.dataset,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const processPrediction = (data) => {
    const dailyConsumption = {};

    data.forEach((item) => {
      const date = moment(item.timestamp).format("YYYY-MM-DD");
      dailyConsumption[date] =
        (dailyConsumption[date] || 0) + item.unitConsumption;
    });

    const sortedDates = Object.keys(dailyConsumption).sort();
    const labels = sortedDates.map((date) => moment(date).format("MMM DD"));
    const dataset = sortedDates.map((date) =>
      parseFloat(dailyConsumption[date].toFixed(2))
    );

    return { labels, dataset };
  };

  const processDailyData = (data) => {
    const hourlyConsumption = {};

    data.forEach((item) => {
      const hour = moment(item.timestamp).format("HH:00"); // Format to show hour as "HH:00"
      hourlyConsumption[hour] =
        (hourlyConsumption[hour] || 0) + item.unitConsumption;
    });

    const sortedHours = Object.keys(hourlyConsumption).sort();
    const labels = sortedHours;
    const dataset = sortedHours.map((hour) =>
      parseFloat(hourlyConsumption[hour].toFixed(2))
    );
    return { labels, dataset };
  };

  const processWeeklyData = (data) => {
    const weeklyConsumption = {};

    data.forEach((item) => {
      const weekStart = moment(item.timestamp)
        .startOf("isoWeek")
        .format("YYYY-MM-DD");
      weeklyConsumption[weekStart] =
        (weeklyConsumption[weekStart] || 0) + item.unitConsumption;
    });

    const sortedWeeks = Object.keys(weeklyConsumption).sort();
    const labels = sortedWeeks.map((_, index) => `Week ${index + 1}`);
    const dataset = sortedWeeks.map((week) =>
      parseFloat(weeklyConsumption[week].toFixed(2))
    );
    const dateMapping = sortedWeeks;

    return { labels, dataset, dateMapping };
  };

  const processMonthlyData = (data) => {
    const monthlyConsumption = {};

    data.forEach((item) => {
      const monthStart = moment(item.timestamp)
        .startOf("month")
        .format("YYYY-MM");
      monthlyConsumption[monthStart] =
        (monthlyConsumption[monthStart] || 0) + item.unitConsumption;
    });

    const sortedMonths = Object.keys(monthlyConsumption).sort();
    const labels = sortedMonths.map((month) =>
      moment(month, "YYYY-MM").format("MMM YYYY")
    );
    const dataset = sortedMonths.map((month) =>
      parseFloat(monthlyConsumption[month].toFixed(2))
    );
    const dateMapping = sortedMonths;

    return { labels, dataset, dateMapping };
  };

  const handleSelection = (option) => {
    const sourceData = option === "Prediction" ? jsonPrediction : jsonData;

    if (option === "Daily Consumption") {
      const processedData = processDailyData(sourceData);
      setChartConfig(processedData);
    } else if (option === "Weekly Consumption") {
      const processedData = processWeeklyData(sourceData);
      setChartConfig(processedData);
    } else if (option === "Monthly Consumption") {
      const processedData = processMonthlyData(sourceData);
      setChartConfig(processedData);
    } else {
      const processedData = processPrediction(sourceData);
      setChartConfig(processedData);
    }

    setSelectedCategory(option);
    // setIsGraphVisible(option !== "Daily Consumption");
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <div style={{ padding: "20px" }}>
      {/* <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleSelection("History")}>History</button>
        <button onClick={() => handleSelection("Prediction")}>
          Prediction
        </button>
      </div> */}

      {/* {selectedCategory && ( */}
      <div className="flex items-center flex-wrap justify-between p-4 ">
        <div
          style={{ marginBottom: "20px" }}
          className="flex justify-content items-center gap-5 px-4 py-3 w-fit h-fit bg-gray-100 dark:bg-slate-800 rounded-full"
        >
          <div className={`px-4 py-2 rounded-full font-bold`}>Prediction</div>
          <button
            className={`${
              selectedCategory === "Daily Consumption"
                ? "bg-gray-200 border-t-[0.2rem] border-l-[0.2rem] border-b-[0.2rem] border-r-[0.2rem] border-gray-100"
                : "bg-gray-100 "
            } px-4 py-2 border-l-[0.2rem] border-b-[0.2rem] border-slate-400 rounded-full text-black dark:text-white dark:bg-slate-900`}
            onClick={() => handleSelection("Daily Consumption")}
          >
            Daily Consumption
          </button>
          <button
            className={`${
              selectedCategory === "Weekly Consumption"
                ? "bg-gray-200 border-t-[0.2rem] border-l-[0.2rem] border-b-[0.2rem] border-r-[0.2rem] border-gray-100"
                : "bg-gray-100"
            } px-4 py-2 border-l-[0.2rem] border-b-[0.2rem] border-r-0 border-slate-400 rounded-full text-black dark:text-white dark:bg-slate-900`}
            onClick={() => handleSelection("Weekly Consumption")}
          >
            Weekly Consumption
          </button>
          {/* <button
            className={`${
              selectedCategory === "Monthly Consumption"
                ? "bg-gray-300"
                : "bg-gray-100"
            } px-4 py-2 border-l-[0.2rem] border-b-[0.2rem] border-r-0 border-slate-400  rounded-full`}
            onClick={() => handleSelection("Monthly Consumption")}
          >
            Monthly Consumption
          </button> */}
        </div>

        <div>
          <RefreshButton />
        </div>
        {/* {selectedCategory ===
            ("Daily Consumption" ||
              "Weekly Consumption" ||
              "Monthly Consumption") && ( */}
        {/* <div className="flex gap-0 h-full items-center justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setDate(date);
            }}
            dateFormat="YYYY MM d"
            className="text-black outline-none border-none px-4 py-3 bg-gray-300 rounded-l-xl"
            value={date}
          />
          <Button
            onClick={() => {
              setSelectedDate(date);
              fetchDataForDate(date);
            }}
            className="bg-blue-500 rounded-r-xl px-4 py-3 text-white "
          >
            Filter
          </Button>
        </div> */}
        {/* )} */}
      </div>
      {/* )} */}

      {
        <div className="h-1/3 w-1/2 mx-auto bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5">
          <Line
            data={chartData}
            options={{
              scales: {
                // y: {
                //   beginAtZero: true,
                // },
              },
            }}
          />
        </div>
      }
    </div>
  );
};

export default ChartComponent;
