import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const requestBody = {
        username: username,
        password: password,
      };
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log("response", response);
      if (response.status === 200) {
        navigate(`/`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="center">
      <label>Username</label>
      <input
        className="form-control"
        type="username"
        id="username"
        name="password"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        className="form-control"
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Register;
