import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
  title?: string;
}

const ErrorPage = ({
  statusCode = 500,
  message = "Something went wrong on our end. Please try again later.",
  title = "Oops! An Error Occurred",
}: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
      <AlertTriangle className="h-24 w-24 text-red-500 mb-6" />
      <h1 className="text-5xl font-bold mb-3">{statusCode}</h1>
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-muted-foreground max-w-md mb-8">{message}</p>
      <Link to="/">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
