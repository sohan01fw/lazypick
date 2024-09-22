import { Path, UseFormRegister } from "react-hook-form";

export type InputProps = {
  label: Path<string, number>;
  register: UseFormRegister<string, number>;
  required: boolean;
};
