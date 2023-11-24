"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    text: z.string().min(1, "Please enter a prompt."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleGetOpenAIapi = async (prompt: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();
      setText(data.content);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleGetOpenAIapi(values.text);
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 py-8 px-6 sm:px-12 md:px-16">
      <h1 className="mt-4 font-semibold text-xl">User</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your prompt</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
        <h1 className="mt-4 font-semibold text-xl">Burak-GPT</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>{text}</p>
          </div>
        )}
      </Form>
    </main>
  );
}
