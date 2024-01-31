const getPageTitle = (pathname) => {
  switch (pathname) {
    case "/":
      return "Home";
    case "/books":
      return "Books Catalog";
    case "/games":
      return "Games Catalog";
    default:
      return "Default Title"; // Replace with your default title
  }
};

export default getPageTitle;
