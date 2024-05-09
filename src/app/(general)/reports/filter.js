export default (by, data) => {
  // let newdata = data.sort(comparator);
  switch (by) {
    case "Faculty":
      return data.filter((datum) => datum.user_type === "Faculty");
      break;
    case "Staff":
      return data.filter((datum) => datum.user_type === "Staff");
      break;
    case "Student":
      return data.filter((datum) => datum.user_type === "Student");
      break;
    case "Book":
      return data.filter((datum) => datum.type === "Book");
      break;
    case "Boardgame":
      return data.filter((datum) => datum.type === "Boardgame");
      break;
    default:
      return data;
      break;
  }
  // let newdata = data.filter((datum) => );
  // console.log(newdata[0]);
  // return newdata;
}
