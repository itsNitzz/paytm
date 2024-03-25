import { Link, useNavigate } from "react-router-dom";

import Card from "../UI/Card";
import Input from "../UI/Input";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userTokenAtom } from "../store/atoms/UserSessionData";

export default function Signup() {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(null);
  const setToken = useSetRecoilState(userTokenAtom);
  const navigate = useNavigate();

  const onChangeInputValue = (e) => {
    switch (e.target.id) {
      case "firstname":
        setSignupData((prev) => {
          return { ...prev, firstName: e.target.value };
        });
        break;

      case "lastname":
        setSignupData((prev) => {
          return { ...prev, lastName: e.target.value };
        });
        break;

      case "email":
        setSignupData((prev) => {
          return { ...prev, username: e.target.value };
        });
        break;
      case "password":
        setSignupData((prev) => {
          return { ...prev, password: e.target.value };
        });
        break;
    }
  };

  const onSignupHandler = (e) => {
    e.preventDefault();
    onSignupUser();
  };

  const onSignupUser = async () => {
    const userData = {
      ...signupData,
      firstName: signupData.firstName.toLowerCase(),
      lastName: signupData.lastName.toLowerCase(),
    };
    const sendData = await fetch("http://localhost:3000/api/vi/user/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const response = await sendData.json();

    console.log(response);

    if (!sendData.ok) {
      setError(response.message);
      return;
    }

    setError(null);
    setSignupData({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    });

    setToken(response.token);
    navigate("/dashboard");
  };

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-0"></div>
      <Card addtionalClasses="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-xs shadow-md z-10 bg-white">
        <h1 className="text-center text-3xl font-bold">Sign Up</h1>
        <p className="text-center font-medium text-stone-500 my-2">Enter your information to create an account</p>
        {error ? (
          <p className="bg-red-300 border-red-400 border-1 rounded-md p-1 px-2 text-white font-medium">{error}</p>
        ) : (
          ""
        )}
        <form onSubmit={onSignupHandler}>
          <Input
            input={{
              id: "firstname",
              type: "text",
              placeholder: "John",
            }}
            label="First Name"
            onChangeHandler={onChangeInputValue}
          />
          <Input
            input={{
              id: "lastname",
              type: "text",
              placeholder: "Doe",
            }}
            label="Last Name"
            onChangeHandler={onChangeInputValue}
          />
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
            Sign up
          </button>
          <p className="text-center my-2 font-medium">
            Already have an account?{" "}
            <Link className="underline underline-offset-1" to="/signin">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </>
  );
}
