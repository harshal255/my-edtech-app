import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    value?: string | number;
}

export function FormInput({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    value,
    ...props
}: FormInputProps) {
    return (
        <div className="grid gap-2 mb-4">
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                // 👇 "...props" spreads everything else (onChange, value) onto the input
                {...props}
            />
        </div>
    );
}