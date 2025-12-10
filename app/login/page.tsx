"use client";

import { useState } from "react";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FormInput } from "@/components/formComponents/FormInput";
import { SubmitButton } from "@/components/formComponents/SubmitButton";
import { toast } from "sonner";

export default function LoginPage() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const result = await login(formData);

        if (result?.error) {
            toast.error(result.error);
            setIsLoading(false);
        } else {
            toast.success("Welcome back!");
            router.push("/dashboard");
            // Note: We don't stop loading here to prevent the button from flashing before the page changes
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your credentials to access the hub.</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <FormInput label="Email" name="email" type="email" placeholder="m@example.com" required />
                        <FormInput label="Password" name="password" type="password" required />
                    </CardContent>

                    <CardFooter className="flex flex-col gap-2">
                        {/* Pass the loading state to the button 👇 */}
                        <SubmitButton isLoading={isLoading}>Sign in</SubmitButton>

                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline text-blue-600">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}