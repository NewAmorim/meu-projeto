import { DivS, Eye, Input, Password, User } from "./styles";

import user from "@/assets/user.svg";
import passwordIcon from "@/assets/password.svg";
import eye from "@/assets/eye.svg";
import { useState } from "react";

interface InputType {
  type: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  password?: boolean;
  value?: string | null
}

const InputS: React.FC<InputType> = ({
  type,
  placeholder,
  onChange,
  password,
  value
}: InputType) => {
  const [visible, setVisible] = useState("password");

  return (
    <DivS>
      {!password && <User src={user} alt="" />}
      {password && (
        <Eye
          onClick={() => {
            visible === "password"
              ? setVisible("text")
              : setVisible("password");
          }}
          src={eye}
          alt=""
        />
      )}
      {password && <Password src={passwordIcon} alt="" />}
      <Input
        required
        type={type === "password" ? visible : type}
        placeholder={placeholder}
        onChange={onChange}
        value={value ?? ""}
      />
    </DivS>
  );
};

export default InputS;
