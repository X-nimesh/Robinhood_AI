import axios from "axios";

export const useCheckLogin = async (token: any) => {
  try {
    let res = await axios.get("http://localhost:3000/user/token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("checklogin" + res?.data);
    return res?.data.userId;
  } catch (error: any) {
    // console.log(error);
  }
};
