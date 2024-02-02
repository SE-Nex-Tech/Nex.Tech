const getPageTitle = (pathname) => {
  switch (pathname) {
    case "/":
      return "Home";
    case "/books":
      return "Books Catalog";
    case "/games":
      return "Games Catalog";
    case "/dashboard":
      return "Dashboard";
    case "/landing":
      return "Home";
    default:
      return "Default Title"; // Replace with your default title
  }
};

export default getPageTitle;
