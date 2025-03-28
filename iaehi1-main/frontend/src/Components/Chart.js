// filepath: /c:/Users/uditv/OneDrive/Desktop/iaehi/frontend/src/Components/Chart.js
import Style from "./Chart.module.css";
import React, { useState, useEffect } from "react";
import { url } from "./Data/apiData";
import * as variables from "./Data/variables";
import Loader from "./ReUsable/Loader";
import SelectionComp from "./ReUsable/SelectionComp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import Chart from "react-apexcharts";
import Error from "./ReUsable/Error";
import { useLanguage } from "../contexts/LanguageContext";

// Modified import for variables with necessary chart selections
import {
  chartSelection as originalChartSelection,
  chartType,
  presentation,
} from "./Data/variables";

// Create extended chartSelection by adding feedback option
const chartSelection = [
  ...originalChartSelection,
  { id: 5, title: "Feedback", titleHindi: "प्रतिक्रिया", value: "feedback" },
];

export default function ReactChart(props) {
  const { setMsg } = props;
  const [charData, setChartData] = useState(null);
  const [state, setState] = useState(null);
  const [selected, setSelected] = useState(chartSelection[0].id);
  const [selectedValue, setSelectedValue] = useState("");
  const [showSelectionsComp, setShowSelectionComp] = useState(false);
  const [presentationView, setPresentationView] = useState(true);
  const [chartView, setChartView] = useState(presentation[0].id);
  const [chartTypeView, setChartTypeView] = useState(true);
  const [chartTypeVal, setChartTypeVal] = useState(chartType[0].id);
  const [error, setError] = useState(false);
  const { language, t } = useLanguage();

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ffc815",
      },
    },
  });

  const percentageCal = (arr, uniqueItems, arrLength = 0) => {
    const totalNumber = arr.length;
    const percentateArr = [];
    uniqueItems.forEach((currVal) => {
      const numItems = arr.filter((val) => val === currVal);
      percentateArr.push(
        arrLength === 0
          ? Number(((numItems.length * 100) / totalNumber).toFixed(2))
          : Number(((numItems.length * 100) / arrLength).toFixed(2))
      );
    });
    return percentateArr;
  };

  const getChart = (groupPercentageArr, uniqueItems) => {
    setState({
      series: groupPercentageArr,
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: chartTypeView,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: uniqueItems,
        },
        yaxis: {
          title: {
            text: language === "hi" ? "प्रतिशत (%)" : "Percentage (%)",
          },
          labels: {
            formatter: (val, ind) => {
              return val.toFixed(0);
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " %";
            },
          },
        },
        theme: {
          mode: "dark",
        },
      },
    });
  };

  useEffect(() => {
    const uniqueItems = [
      variables.cond1,
      variables.cond2,
      variables.cond3,
      variables.cond4,
    ];
    const groupPercentageArr = [];
    if (charData === null) {
      setShowSelectionComp(false);
      axios
        .get(url)
        .then((res) => {
          setChartData(res.data);
          const selectedRes = res.data.map((e) => {
            return e.result;
          }); // selected [happy, unhappy, happy...]
          const arrLength = selectedRes.length;
          const obj = {};
          obj.name = "Overall";
          obj.data = percentageCal(selectedRes, uniqueItems);
          groupPercentageArr.push(obj);
          getChart(groupPercentageArr, uniqueItems);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    } else if (selectedValue === "") {
      setShowSelectionComp(false);
      const selectedRes = charData.map((e) => {
        return e.result;
      }); // selected [happy, unhappy, happy...]
      const obj = {};
      obj.name = "Overall";
      obj.data = percentageCal(selectedRes, uniqueItems);
      groupPercentageArr.push(obj);
      getChart(groupPercentageArr, uniqueItems);
    } else if (selectedValue === "feedback") {
      axios
        .get(`${url}/feedback`)
        .then((res) => {
          const feedbackData = res.data;
          const happyCount = feedbackData.filter(
            (item) => item.isHappyWithResult
          ).length;
          const unhappyCount = feedbackData.filter(
            (item) => !item.isHappyWithResult
          ).length;
          const total = feedbackData.length || 1; // Prevent division by zero

          const feedbackPercentages = [
            (happyCount / total) * 100,
            (unhappyCount / total) * 100,
          ];

          const feedbackLabels =
            language === "hi"
              ? ["संतुष्ट", "असंतुष्ट"]
              : ["Satisfied", "Unsatisfied"];

          const feedbackObj = {
            name: language === "hi" ? "प्रतिक्रिया" : "Feedback",
            data: feedbackPercentages,
          };

          groupPercentageArr.push(feedbackObj);
          getChart(groupPercentageArr, feedbackLabels);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    } else {
      setShowSelectionComp(true);
      if (presentationView) {
        const selectedRes = charData.map((e) => {
          return e[selectedValue];
        }); // selected [Design, HR, Cust Ser,..]
        const arrLength = selectedRes.length;
        const uniqueSelectedItems = new Set(selectedRes); // unique values
        uniqueSelectedItems.forEach((item) => {
          const arr = [];
          const obj = {};
          selectedRes.forEach((el, ind) => {
            if (el === item) {
              arr.push(charData[ind].result);
            }
          });
          obj.name = item;
          obj.data = percentageCal(arr, uniqueItems, arrLength); // cust [happy, v.happy, unha]
          groupPercentageArr.push(obj);
        });
        getChart(groupPercentageArr, uniqueItems);
      } else {
        const selectedRes = charData.map((e) => {
          return e.result;
        });
        const selectedValues = charData.map((e) => {
          return e[selectedValue];
        });
        const arrLength = selectedRes.length;
        const uniqueSelectedItems = [...new Set(selectedValues)]; // unique values
        uniqueItems.forEach((item) => {
          const arr = [];
          const obj = {};
          selectedRes.forEach((el, ind) => {
            if (el === item) {
              arr.push(charData[ind][selectedValue]);
            }
          });
          obj.name = item;
          obj.data = percentageCal(arr, uniqueSelectedItems, arrLength);
          groupPercentageArr.push(obj);
        });
        getChart(groupPercentageArr, uniqueSelectedItems);
      }
    }
  }, [selectedValue, presentationView, charData, chartTypeVal]);

  const selectionHandle = (event) => {
    const selectedObj = chartSelection.find((e) => e.id === event.target.value);
    setSelected(event.target.value);
    setSelectedValue(selectedObj.value);
  };
  const chartTypeSelectionHandle = (event) => {
    const selectedObj = chartType.find((e) => e.id === event.target.value);
    setChartTypeVal(event.target.value);
    if (selectedObj.value === "grouped") {
      setChartTypeView(false);
    } else {
      setChartTypeView(true);
    }
  };

  const changePresentaionHandle = (event) => {
    const selectedObj = presentation.find((e) => e.id === event.target.value);
    setChartView(event.target.value);
    if (selectedObj.value === "categoryView") {
      setPresentationView(false);
    } else {
      setPresentationView(true);
    }
  };
  return !error ? (
    sessionStorage.getItem("admin") === "1" ? (
      <>
        <div className={Style.selectionContainer}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {showSelectionsComp && (
              <>
                <SelectionComp
                  mt={3}
                  mr={3}
                  value={chartView}
                  onChange={changePresentaionHandle}
                  menuItems={presentation}
                  label={t.presentation}
                />
                <SelectionComp
                  mt={3}
                  mr={3}
                  value={chartTypeVal}
                  onChange={chartTypeSelectionHandle}
                  menuItems={chartType}
                  label={t.chartType}
                />
              </>
            )}
            <SelectionComp
              mt={3}
              mr={3}
              value={selected}
              onChange={selectionHandle}
              menuItems={chartSelection}
              label={t.groups}
            />
          </ThemeProvider>
        </div>

        {state ? (
          <>
            <div className={Style.container}>
              <Chart
                className={Style.chart}
                options={state.options}
                series={state.series}
                type="bar"
                height={350}
              />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </>
    ) : (
      <Error setMsg={setMsg} errMsg={t.adminOnlyView} />
    )
  ) : (
    <Error setMsg={setMsg} errMsg={t.networkError} />
  );
}
