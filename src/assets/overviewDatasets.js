import data from "./data";
const foodDataset = [
  {
    label: `Cost of Food by month`,
    data: data
      .filter((point) => point.type === "Food")
      .map((point) => point.cost),
    backgroundColor: ["rgba(4, 210, 18, 0.2)"],
    borderColor: ["rgba(4, 210, 18, 1)"],
  },
];

const utilityDataset = [
  {
    label: "Cost of electric by month",
    data: data
      .filter((point) => point.type === "Electric")
      .map((point) => point.cost),
    backgroundColor: ["rgba(255, 206, 86, 0.2)"],
    borderColor: ["rgba(255, 206, 86, 1)"],
    stack: "combined",
    type: "bar",
  },
  {
    label: "Occupants by month",
    data: data
      .filter((point) => point.type === "Gas")
      .map((point) => point.occupants),
    backgroundColor: ["rgba(82, 45, 192, 0.2)"],
    borderColor: ["rgba(82, 45, 192, 1)"],
    stack: "combined",
  },
  {
    label: "Cost of gas by month",
    data: data
      .filter((point) => point.type === "Gas")
      .map((point) => point.cost),
    backgroundColor: ["rgba(75, 192, 192, 0.2)"],
    borderColor: ["rgba(75, 192, 192, 1)"],
    type: "bar",
  },
  {
    label: "Cost of internet by month",
    data: data
      .filter((point) => point.type === "Internet")
      .map((point) => point.cost),
    backgroundColor: ["rgba(190, 9, 169, 0.2)"],
    borderColor: ["rgba(190, 9, 169, 1)"],
    stack: "combined",
    type: "bar",
  },
];

export const foodChartData = {
  labels: data
    .filter((point) => point.type === "Food")
    .map((point) => `${point.month},${point.year}`),
  datasets: foodDataset,
};

export const utilChartData = {
  labels: data
    .filter((point) => point.type === "Gas")
    .map((point) => `${point.month},${point.year}`),
  datasets: utilityDataset,
};
