import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
    children: React.ReactNode;
    isLoading?: boolean;
}

export function SubmitButton({ children, isLoading = false }: SubmitButtonProps) {
    return (
        <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                children
            )}
        </Button>
    );
}