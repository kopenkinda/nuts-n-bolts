import { HTMLInputTypeAttribute } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const LabeledInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  error?: string;
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error !== undefined && <span className="text-destructive">{error}</span>}
    </div>
  );
};
