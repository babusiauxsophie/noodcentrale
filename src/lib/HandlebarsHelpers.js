import handlebars from "handlebars";

export default {
  // kijkt of tijd ouder is dan 1 maand geleden
  ifTime: (time) => {
    if (time + 2592000 <= Date.now()) {
      return true;
    } else {
      return false;
    }
  },

  // set epoch time to date dd/mm/yyyy
  setEpochToDate: (epoch) => {
    let date = new Date(epoch);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay() + 1;
    const newDate = day + "/" + month + "/" + year;
    return newDate;
  },

  // shortens an array to its geven limit
  limit: (arr, limit) => {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.slice(0, limit);
  },

  // check if i is even i starts on 0
  ifEven: (i) => {
    if ((i + 1) % 2 == 0) {
      return true;
    } else {
      return false;
    }
  },

  //return reverse array
  reverseArray: (array) => {
    const newArray = array.reverse();
    return newArray;
  },

  check: (data, nr) => {
    if (data === nr) {
      return true;
    }
    return false;
  },
};
