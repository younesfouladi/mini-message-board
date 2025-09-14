import { Link } from "react-router-dom";

export const ErrorElement = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-main text-neutral-50 gap-6">
      <h1 className="text-9xl">404</h1>
      <p className="font-bold">Page Not Found</p>
      <Link
        to="/"
        className="bg-section rounded-full px-4 py-2 hover:opacity-70 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
};
