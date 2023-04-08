import React from "react";
import { Form } from "react-router-dom";

import { UserPlusIcon } from "@heroicons/react/24/solid";

import illustration from "../assets/illustration.jpg";

export default function Intro() {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="post">
          <input
            type="text"
            placeholder="What is your name?"
            name="username"
            required
            autoComplete="given-name"
            aria-label="Your Name"
          />
          {/* we need to name it _action coz if it is just action then we need to access it with .action and it will actually submit the form */}
          <input type="hidden" name="_action" value="newUser" />
          <button className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
}
