import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";

import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="error">
      <h2>We've got a problem here.</h2>
      <p>{error.message || error.statusText}</p>

      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>

        <Link to="/" className="btn btn--dark">
          <HomeIcon style={{ color: "#fff" }} width={20} />
          <span style={{ color: "#fff" }}>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
