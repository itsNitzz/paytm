import { atom, selector } from "recoil";

export const userTokenAtom = atom({
  key: "UserToken",
  default: "",
});

export const userBalance = atom({
  key: "UserBalance",
  default: selector({
    key: "UserAccount",
    get: async ({ get }) => {
      const getData = await fetch("http://localhost:3000/api/vi/account/balance", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${get(userTokenAtom)}`,
        },
      });

      const response = await getData.json();

      console.log(response);

      if (!getData.ok) {
        return { error: "An error occured while fetching balance, please try again after." };
      }

      return response.balance;
    },
  }),
});
