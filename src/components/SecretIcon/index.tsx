import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type TSecretIconProps = {
  secret?: string | null;
};

export const SecretIcon: React.FunctionComponent<TSecretIconProps> = ({
  secret,
}) => {
  console.log(secret);
  return (
    <FontAwesomeIcon
      icon={!secret ? faLockOpen : faLock}
      className={!secret ? "text-red-700" : "text-green-700"}
    />
  );
};
