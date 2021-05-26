import axios from "axios";
import { useState } from "react";

type TLoginProps = {
  hideLogin: (l: boolean) => void;
};

export const Login: React.FunctionComponent<TLoginProps> = ({ hideLogin }) => {
  const [user, setUser] = useState("konstantin.kroner@gmail.com");
  const [password, setPassword] = useState("mySuperSecret");

  const doLogin = async () => {
    try {
      await axios.post("/admin/login/", {
        user,
        password,
      });
      hideLogin(true);
    } catch (error) {}
  };

  return (
    <div className="container border rounded border-gray-500 ml-auto mr-auto">
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          doLogin();
        }}>
        <div>Login</div>
        <div>
          <input
            placeholder="Username"
            value={user}
            type="text"
            onChange={(e) => setUser(e.currentTarget.value)}
          />
        </div>
        <div className="mt-2">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </div>
        <div className="text-center mt-2">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
