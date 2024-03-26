import { selectorFamily } from "recoil";
import { userTokenAtom } from "../atoms/UserSessionData";

export const getAllUsers = selectorFamily({
  key: "TotalUsers",
  get:
    (filter) =>
    async ({ get }) => {
      const getData = await fetch(`http://localhost:3000/api/vi/user/bulk?filter=${filter ? filter : ""}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${get(userTokenAtom)}`,
        },
      });

      const response = await getData.json();

      if (!getData.ok) {
        return { error: "An error occured while fetching balance, please try again after." };
      }

      return response.users;
    },
});
