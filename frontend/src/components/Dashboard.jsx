import { useRecoilValue } from "recoil";
import Input from "../UI/Input";
import Users from "./Users";
import { userBalance } from "../store/atoms/UserSessionData";
import { getAllUsers } from "../store/selectors/UserDataSelector";

export default function Dashboard() {
  const getBalance = useRecoilValue(userBalance);
  const allUsers = useRecoilValue(getAllUsers(""));

  const users = allUsers.map((user) => {
    return <Users key={user._id} user={user} />;
  });

  return (
    <section>
      <div className="flex flex-1 items-center justify-between border-b-2 p-4">
        <h1 className="font-extrabold text-2xl">My Money</h1>
        <div className="font-semibold text-lg flex items-center gap-3">
          <span>Hello, User</span>
          <span className="bg-slate-100 w-8 h-8 flex justify-center items-center rounded-[50%]">U</span>
        </div>
      </div>
      <div className="p-4 flex flex-1 items-end gap-4">
        <h2 className="font-bold text-xl">Your Balance</h2>
        <p className="font-bold text-xl">{`$${getBalance}`}</p>
      </div>
      <div className="p-4">
        <Input
          label="Users"
          labelClass="text-xl !font-bold mb-2"
          additionalClass="placeholder:text-slate-500"
          input={{ type: "text", placeholder: "Search users...", id: "search" }}
        />
      </div>
      {users}
    </section>
  );
}
