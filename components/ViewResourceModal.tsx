"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { View } from "lucide-react";

interface ViewProps {
  resource: {
    _id: string,
    title: string,
    description: string,
    link: string,
    category: string,
  };
}

export function ViewResourceModal({ resource }: ViewProps) {
  const [open, setOpen] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Small Ghost button for View */}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
          <View size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Resource</DialogTitle>
        </DialogHeader>

        <div
          className="grid gap-4 py-4"
        >
          {/* Hidden input to store the ID so the backend knows which one to update */}
          {/* <input type="hidden" name="id" value={resource._id} /> */}

          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-2">
              <span className="text-gray-900 text-md">Title :</span>
              {resource.title}</div>


            <div className="flex gap-2">
              <span className="text-gray-900 text-md">Link :</span>
              <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Link</a></div>
            <div className="flex gap-2">
              <span className="text-gray-900 text-md">Category :</span>
              {resource.category}</div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-900 text-md">Description :</span>
              <p className="h-48 overflow-y-scroll">{resource.description}</p>

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
