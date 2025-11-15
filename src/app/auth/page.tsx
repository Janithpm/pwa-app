"use client"

import { Command } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormSchema, type SignInFormValues } from "@/zod/auth";

function SignInPage() {

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = async (data: SignInFormValues) => {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    };

    return (
        <div className="flex h-dvh">
            <div className="bg-primary hidden lg:block lg:w-1/3">
                <div className="flex h-full flex-col items-center justify-center p-12 text-center">
                    <div className="space-y-6">
                        <Command className="text-primary-foreground mx-auto size-12" />
                        <div className="space-y-2">
                            <h1 className="text-primary-foreground text-5xl font-light">Hello again</h1>
                            <p className="text-primary-foreground/80 text-xl">Login to continue</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
                <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
                    <div className="space-y-4 text-center">
                        <div className="font-medium tracking-tight">Login</div>
                        <div className="text-muted-foreground mx-auto max-w-xl">
                            Welcome back. Enter your email and password, let&apos;s hope you remember them this time.
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    autoComplete="current-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="remember"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center">
                                            <FormControl>
                                                <Checkbox
                                                    id="login-remember"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="size-4"
                                                />
                                            </FormControl>
                                            <FormLabel htmlFor="login-remember" className="text-muted-foreground ml-1 text-sm font-medium">
                                                Remember me for 30 days
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">
                                    Login
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage