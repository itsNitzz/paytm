import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../UI/Input";
import Card from "../UI/Card";

export default function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  });

  const onChangeInputValue = (e) => {
    switch (e.target.id) {
      case "email":
        setSigninData((prev) => {
          return { ...prev, username: e.target.value };
        });
        break;
      case "password":
        setSigninData((prev) => {
          return { ...prev, password: e.target.value };
        });
        break;
    }
  };

  const onSigninHandler = (e) => {
    e.preventDefault();
    onSigninUser();
  };

  const onSigninUser = async () => {
    const sendData = await fetch("http://localhost:3000/api/vi/user/signin", {
      method: "POST",
      body: JSON.stringify(signinData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const response = await sendData.json();

    if (!sendData.ok) {
      setError(response.message);
      return;
    }

    setError(null);
    setSigninData({
      username: "",
      password: "",
    });
    navigate("/dashboard");
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-0"></div>
      <Card addtionalClasses="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-xs shadow-md z-10 bg-white">
        <h1 className="text-center text-3xl font-bold mt-2">Sign In</h1>
        <p className="text-center font-medium text-stone-500 mt-2 mb-4">
          Enter your credentials to access your account
        </p>
        {error ? (
          <p className="bg-red-300 border-red-400 border-1 rounded-md p-1 px-2 text-white font-medium">{error}</p>
        ) : (
          ""
        )}
        <form onSubmit={onSigninHandler}>
          <Input
            input={{
              id: "email",
              type: "email",
              placeholder: "xyz@gmail.com",
            }}
            label="Email"
            onChangeHandler={onChangeInputValue}
          />
          <Input
            input={{
              id: "password",
              type: "password",
              placeholder: "",
            }}
            label="Password"
            onChangeHandler={onChangeInputValue}
          />
          <button type="submit" className="w-full text-white bg-black p-2 mt-4 rounded-md">
            Sign in
          </button>
          <p className="text-center my-2 font-medium">
            Don&apos;t have an account?{" "}
            <Link className="underline underline-offset-1" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </Card>
    </>
  );
}
