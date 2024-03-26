import { useState } from "react";
import TransactionModal from "./TransactionModal";

export default function Users({ user }) {
  const [openModal, setopenModal] = useState(false);
  const transactionModalHandler = () => {
    setopenModal((val) => !val);
    return;
  };

  return (
    <>
      {openModal && <TransactionModal user={user} onCloseModal={transactionModalHandler} />};
      <div className="p-4 flex flex-1 justify-between items-center">
        <div className="font-semibold flex items-center gap-3">
          <span className="bg-slate-100 text-md w-9 h-9 flex justify-center items-center rounded-[50%]">
            {user.firstName[0].toUpperCase()}
          </span>
          <span className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <button
          onClick={transactionModalHandler}
          className="bg-neutral-950 text-slate-50 px-5 py-3 rounded-md text-xs font-semibold"
        >
          Send Money
        </button>
      </div>
    </>
  );
}
