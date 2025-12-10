import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
            {/* Icon Circle */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <FileQuestion className="h-10 w-10 text-gray-500" />
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    Page not found
                </h1>
                <p className="max-w-[500px] text-gray-500 md:text-xl">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                </p>
            </div>

            <div className="flex gap-4">
                <Button asChild variant="default">
                    <Link href="/dashboard">
                        Return Home
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/dashboard">
                        Go to Dashboard
                    </Link>
                </Button>
            </div>
        </div>
    );
}