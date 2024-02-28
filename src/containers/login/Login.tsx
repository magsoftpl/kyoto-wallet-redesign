"use client";
import { useSession } from "../authentication/useSession";
import { useNavigator } from "../navigation/useNavigator";
import { LoginTop } from "./components/LoginTop";

export const Login = () => {
  const navigator = useNavigator();
  const { startSession } = useSession();

  const handleLoginClick = () => {
    startSession(() => navigator("dashboard"));
  };

  return (
    <div>
      <LoginTop onLoginClick={handleLoginClick} />
      <div className="h-[20rem]"></div>
    </div>
  );
};
