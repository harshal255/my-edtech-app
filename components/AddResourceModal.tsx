"use client";

import { useState, useRef } from "react";
import { createResource } from "@/actions/resource";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormInput } from "./formComponents/FormInput";
import { SubmitButton } from "./formComponents/SubmitButton";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";
import { useAIGenerator } from "@/hooks/useAIGenerator";

export function AddResourceModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [titleValue, setTitleValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("General");

    const { isGenerating, generate } = useAIGenerator();

    async function handleGenerateAI() {
        const text = await generate(titleValue, categoryValue, linkValue);
        if (text) {
            setDescValue(text);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const result = await createResource(formData);

        setIsLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Resource added successfully!");
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Add New Resource</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share a Resource</DialogTitle>
                    <DialogDescription>
                        Add a useful link for the community.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <FormInput
                        label="Title"
                        name="title"
                        placeholder="e.g. Next.js Documentation"
                        onChange={(e) => setTitleValue(e.target.value)}
                    />

                    <FormInput label="Link" name="link" placeholder="https://..." onChange={(e) => setLinkValue(e.target.value)} />

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            name="category"
                            defaultValue="General"
                            value={categoryValue}
                            onValueChange={setCategoryValue}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Frontend">Frontend</SelectItem>
                                <SelectItem value="Backend">Backend</SelectItem>
                                <SelectItem value="Database">Database</SelectItem>
                                <SelectItem value="AI">AI Tools</SelectItem>
                                <SelectItem value="General">General</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="description">Description</Label>
                            <button
                                type="button"
                                onClick={handleGenerateAI}
                                disabled={isGenerating}
                                className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium"
                            >
                                {isGenerating ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Sparkles className="h-3 w-3" />
                                )}
                                Generate with AI
                            </button>
                        </div>

                        <Textarea
                            name="description"
                            placeholder="Why is this useful?"
                            value={descValue}
                            onChange={(e) => setDescValue(e.target.value)}
                        />
                    </div>

                    <SubmitButton isLoading={isLoading}>Save Resource</SubmitButton>
                </form>
            </DialogContent>
        </Dialog>
    );
}