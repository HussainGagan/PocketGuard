import React from "react";
import { Form, NavLink } from "react-router-dom";
import logomark from "../assets/logomark.svg";

import { TrashIcon } from "@heroicons/react/24/solid";

export default function Nav({ username }) {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="" height={30} />
        <span>PocketGuard</span>
      </NavLink>
      {username && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(evt) => {
            if (!confirm("Delete user and all data?")) {
              evt.preventDefault();
            }
          }}
        >
          <button className="btn btn--warning">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}
