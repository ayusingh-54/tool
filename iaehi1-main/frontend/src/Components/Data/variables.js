import { questions } from "./questionsData";
export const cond1 = "Very Happy";
export const cond2 = "Happy";
export const cond3 = "Unhappy";
export const cond4 = "Very Unhappy";
export const level1 = 180;
export const level2 = 140;
export const level3 = 90;
export const level4 = 40;
export const level5 = 20;
export const queBank = [];
let noOfQue = 9;

export const genderGroups = [
  { id: 1, title: "Female", titleHindi: "महिला" },
  { id: 2, title: "Male", titleHindi: "पुरुष" },
  { id: 3, title: "Other", titleHindi: "अन्य" },
];
export const departments = [
  { id: 1, title: "Production", titleHindi: "उत्पादन" },
  { id: 2, title: "Human resources", titleHindi: "मानव संसाधन" },
  { id: 3, title: "Design", titleHindi: "डिज़ाइन" },
  { id: 4, title: "Customer service", titleHindi: "ग्राहक सेवा" },
];
export const ageGroups = [
  { id: 1, title: "< 25 yrs", titleHindi: "< 25 वर्ष" },
  { id: 2, title: "25-30 yrs", titleHindi: "25-30 वर्ष" },
  { id: 3, title: "31-35 yrs", titleHindi: "31-35 वर्ष" },
  { id: 4, title: "36-40 yrs", titleHindi: "36-40 वर्ष" },
  { id: 5, title: "41-45 yrs", titleHindi: "41-45 वर्ष" },
  { id: 6, title: "46-50 yrs", titleHindi: "46-50 वर्ष" },
  { id: 7, title: "51-55 yrs", titleHindi: "51-55 वर्ष" },
  { id: 8, title: ">55 yrs", titleHindi: ">55 वर्ष" },
];

export const chartSelection = [
  { id: 1, title: "Overall", titleHindi: "समग्र", value: "" },
  { id: 2, title: "Departments", titleHindi: "विभाग", value: "department" },
  { id: 3, title: "Age Groups", titleHindi: "आयु समूह", value: "ageGroup" },
  { id: 4, title: "Gender", titleHindi: "लिंग", value: "gender" },
];
export const chartType = [
  { id: 1, title: "Stacked", titleHindi: "स्टैक्ड", value: "stacked" },
  { id: 2, title: "Grouped", titleHindi: "समूहीकृत", value: "grouped" },
];

export const presentation = [
  {
    id: 1,
    title: "Happiness View",
    titleHindi: "खुशी का दृश्य",
    value: "happinessView",
  },
  {
    id: 2,
    title: "Category View",
    titleHindi: "श्रेणी दृश्य",
    value: "categoryView",
  },
];

export const randomQues = () => {
  if (noOfQue > questions.length) {
    noOfQue = 9;
  }
  let arr = [];
  while (arr.length < noOfQue) {
    let r = Math.floor(Math.random() * questions.length) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  arr.forEach((el) => {
    const question = questions.find((que) => que.id === el);
    queBank.push(question);
  });
};

randomQues();
