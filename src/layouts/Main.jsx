import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

// helper functions
import { fetchData } from "../helper";

// loader
export function mainLoader() {
  const username = fetchData("username");

  return { username };
}

export default function Main() {
  const { username } = useLoaderData();

  return (
    <div className="layout">
      <Nav username={username} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
}
