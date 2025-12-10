import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string | number;
}

export function FormInput({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    defaultValue,
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
                defaultValue={defaultValue}
            />
        </div>
    );
}