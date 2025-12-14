"use client";

import { useState } from "react";
import { updateResource } from "@/actions/resource";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
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
import { Loader2, Pencil, Sparkles } from "lucide-react";
import { useAIGenerator } from "@/hooks/useAIGenerator";

interface EditProps {
    resource: {
        _id: string;
        title: string;
        description: string;
        link: string;
        category: string;
    };
}

export function EditResourceModal({ resource }: EditProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [titleValue, setTitleValue] = useState(resource.title);
    const [linkValue, setLinkValue] = useState(resource.link);
    const [descValue, setDescValue] = useState(resource.description);
    const [categoryValue, setCategoryValue] = useState(resource.category);

    const { isGenerating, generate } = useAIGenerator();

    async function handleGenerateAI() {
        const text = await generate(titleValue, resource.category, linkValue);
        if (text) {
            setDescValue(text);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const result = await updateResource(formData);
        setIsLoading(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Resource updated!");
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* Small Ghost button for Edit */}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                    <Pencil size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Resource</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4" key={open ? "open" : "closed"}>
                    {/* Hidden input to store the ID so the backend knows which one to update */}
                    <input type="hidden" name="id" value={resource._id} />

                    <FormInput label="Title" name="title" value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
                    <FormInput label="Link" name="link" value={linkValue} onChange={(e) => setLinkValue(e.target.value)} />



                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" value={categoryValue} onValueChange={setCategoryValue} >
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

                        <Textarea name="description" value={descValue} onChange={(e) => setDescValue(e.target.value)} />
                    </div>

                    <SubmitButton isLoading={isLoading}>Update Resource</SubmitButton>
                </form>
            </DialogContent>
        </Dialog>
    );
}