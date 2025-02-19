import React from "react";
import CustomAvatar from "./custom-avatar";
import { Text } from "../components/text";

type Props = {
  name: string;
  avatarUrl?: string;
  shape?: "circle" | "square";
};

const SelectOptionWithAvatar = ({ avatarUrl, name, shape }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <CustomAvatar style={{
        width:'20px', 
        height:'20px'
      }} shape={shape} name={name} src={avatarUrl} />
      <Text
        style={{
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Text>
    </div>
  );
};

export default SelectOptionWithAvatar;
