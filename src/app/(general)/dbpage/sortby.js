const sortby = (by, data) => {
  console.log(by);
  let comparator = undefined;
  switch (by) {
    case "id_ascending":
      comparator = (a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a > b) {
          return 1;
        }
        return 0;
      };
      break;
    case "id_descending":
      comparator = (a, b) => {
        if (a.id > b.id) {
          return -1;
        } else if (a < b) {
          return 1;
        }
        return 0;
      };
      break;
    case "title_ascending":
      comparator = (a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a > b) {
          return 1;
        }
        return 0;
      };
      break;
    case "title_descending":
      comparator = (a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a < b) {
          return 1;
        }
        return 0;
      };
      break;
    case "author_ascending":
      comparator = (a, b) => {
        if (a.author < b.author) {
          return -1;
        } else if (a > b) {
          return 1;
        }
        return 0;
      };
      break;
    case "author_descending":
      comparator = (a, b) => {
        if (a.author > b.author) {
          return -1;
        } else if (a < b) {
          return 1;
        }
        return 0;
      };
      break;
  }

  console.log(data[0]);
  // console.log('==================================================')
  console.log(data.sort(comparator)[0]);

  let newdata = data.sort(comparator);
  console.log(newdata[0]);
  return newdata;
};

export default sortby;
