"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleSubmit } from "./contact"; // Import the Server Action

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (formData: FormData) => {
    const result = await handleSubmit(formData);

    if (result.success) {
      toast.success("Message sent successfully!");
      //   toast("Event has been created", {
      //     description: "Sunday, December 03, 2023 at 9:00 AM",
      //     action: {
      //       label: "Undo",
      //       onClick: () => console.log("Undo"),
      //     },
      //   });
      formRef.current?.reset(); // Clear the form fields
    } else {
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Let us know what you need and we will get back to you in no time.
        </p>
      </div>
      <form
        ref={formRef}
        action={onSubmit} // Use client-side handler to call Server Action
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            className="min-h-[100px]"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
