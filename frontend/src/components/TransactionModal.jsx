import { useRecoilValue } from "recoil";

import Card from "../UI/Card";
import Input from "../UI/Input";
import { userTokenAtom } from "../store/atoms/UserSessionData";
import { useState } from "react";

export default function TransactionModal({ user, onCloseModal }) {
  let amount;
  const [error, setError] = useState("");
  let userToken = useRecoilValue(userTokenAtom);
  const OnInteredAmountHandler = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      amount = +value;
    }
  };

  const onTransferHandler = async (e) => {
    e.preventDefault();
    const transferToUserdata = {
      to: user._id,
      amount,
    };
    const getData = await fetch("http://localhost:3000/api/vi/account/transfer", {
      method: "POST",
      body: JSON.stringify(transferToUserdata),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const response = await getData.json();

    if (!getData.ok) {
      setError(response.message);
      return;
    }
    setError(null);
    amount = null;
    onCloseModal();
  };
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-0 cursor-pointer" onClick={onCloseModal}></div>
      <Card addtionalClasses="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-70 md:min-w-96 shadow-md z-10 bg-white py-10 px-8">
        <div className="flex flex-1 flex-col">
          <h1 className="font-bold text-3xl text-center mb-20">Send Money</h1>
          <div className="flex flex-1 items-center gap-4">
            <span className="bg-green-400 w-10 h-10 text-white text-xl flex justify-center items-center rounded-[50%]">
              {user.firstName[0].toUpperCase()}
            </span>
            <span className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</span>
          </div>
          <form onSubmit={onTransferHandler}>
            {error && <p className="text-red-400">{error}</p>}
            <Input
              label="Amount"
              additionalClass="placeholder:text-slate-500 text-sm p-2"
              input={{ id: "amount", type: "text", placeholder: "Enter Amount" }}
              onChangeHandler={OnInteredAmountHandler}
            />
            <button className="w-full p-2 bg-green-400 rounded-md mt-3">Initiate Transfer</button>
          </form>
        </div>
      </Card>
    </>
  );
}
