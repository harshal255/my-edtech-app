"use client";

import { useState } from "react";
import { register } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FormInput } from "@/components/formComponents/FormInput";
import { SubmitButton } from "@/components/formComponents/SubmitButton";
import { toast } from "sonner";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const result = await register(formData);

        setIsLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Account created! Please log in.");
            router.push("/login");
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>Create your account to join the community.</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <FormInput label="Email" name="email" type="email" placeholder="m@example.com" required />
                        <FormInput label="Password" name="password" type="password" required />
                    </CardContent>

                    <CardFooter className="flex flex-col gap-2">
                        <SubmitButton isLoading={isLoading}>Create account</SubmitButton>

                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline text-blue-600">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}