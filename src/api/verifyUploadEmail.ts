import axios from "axios";

export const verifyUploadEmail = async (email: string) => {
  try {
    await axios.post("/upload/verify", {
      email,
    });

    return true;
  } catch (error) {
    return false;
  }
};
