"use client";

import { deleteResource } from "@/actions/resource";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function DeleteResourceBtn({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        // Simple confirmation
        if (!confirm("Are you sure you want to delete this?")) return;

        setIsDeleting(true);
        const result = await deleteResource(id);
        setIsDeleting(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Resource deleted");
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            disabled={isDeleting}
        >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
        </Button>
    );
}