"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/validators/login-validators";
import Link from "next/link";
import Formerror from "@/components/form-error";
import Formsuccess from "@/components/form-success";
import { useState } from "react";
import Image from "next/image";
import { IKImage } from "imagekitio-next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getFormattedDateTime } from "@/lib/currDate";


export default function LoginForm() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",

        },
    });
    const { toast } = useToast();
    const router = useRouter();
    const { formState } = form;
    
    const onSubmit = async (values) => {
        const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false, // Disable automatic redirection
        });

        if (result?.error) {
            console.error("Login failed:", result.error);
            toast({
                title: "Login Failed",
                description: result.error,
                status: "error", // Or use appropriate toast status
            });
        } else {
            const time = getFormattedDateTime();
            toast({
                title: 'Login Successfully',
                description: time,
                status: "success"
            });
            console.log("Login successfuly");
            router.push('/')
            // Handle successful login, e.g., navigate to another page
        }
    };
 
   
    return (
        <div className='max-w-xl mx-auto w-full p-8 sm:shadow sm:shadow-primary-gold rounded-lg bg-gray-00'>
            <div className="flex items-center justify-center gap-4 mb-4">
                <Image src='/icons/open-book.png' height={40} width={40} alt='book' className="invert"></Image>
                <p className='text-3xl font-bebasNeue text-primary-gold text-center mt-[10px]'>
                    Welcome to UNIVERSITY LIBRARY</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name Field */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-slate-300'>Full Name</FormLabel>
                                <FormControl>
                                    <Input className='border border-primary-gold text-primary-gold shadow shadow-primary-gold' placeholder="Full Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-slate-300'>Email</FormLabel>
                                <FormControl>
                                    <Input className='border border-primary-gold text-primary-gold shadow shadow-primary-gold' placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-slate-300'>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        className='border border-primary-gold text-primary-gold shadow shadow-primary-gold'
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" variant="custom" disabled={formState.isSubmitting} className='w-full font-bebasNeue text-lg'>
                        LogIn
                    </Button>
                </form>
            </Form>
            {error && <Formerror message={error} />}
            {success && <Formsuccess message={success} />}
            <p className='mt-4 text-sm text-slate-300'>
                New here ?
                <Button variant="link" className='p-1'>
                    <Link href="/signup" className="text-primary-gold underline">SignUp</Link>
                </Button>
            </p>
        </div>
    );
}
