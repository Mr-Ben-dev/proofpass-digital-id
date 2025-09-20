import ErrorPage from "./ErrorPage";

const NotFound = () => {
  return (
    <ErrorPage
      statusCode={404}
      title="Page Not Found"
      message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    />
  );
};

export default NotFound;
