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
import { signupSchema } from "@/validators/signup-validator";
import Link from "next/link";
import Formerror from "@/components/form-error";
import Formsuccess from "@/components/form-success";
import { useState } from "react";
import Image from "next/image";
import FileUpload from "./FileUpload";
import { saveUser } from "@/lib/drizzleActions";
import { getFormattedDateTime } from "@/lib/currDate";
import { useRouter } from "next/navigation";



export default function SignupForm() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [filePath, setFilePath] = useState(''); 
    const router = useRouter();



    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            fullName: "", 
            universityId: "",
        },
    });

    const { formState } = form;

    const onSubmit = async (values) => {
        const formattedValues = {
            ...values,
            universityId: parseInt(values.universityId, 10), 
            libraryCardUrl: filePath, 
        };

        const response = await saveUser(formattedValues);
        if (!response.success) {
            setError(response.message);
            setSuccess('');
        } else {
            setSuccess(response.message);
            setError('');
            const time = getFormattedDateTime();
            toast({
                title: 'Signup Successfull',
                description: time,
                status: "success"
            });
            router.push('/api/auth/signin')
        }
        console.log(formattedValues);
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
                    {/* University ID Field */}
                    <FormField
                        control={form.control}
                        name="universityId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-slate-300'>University ID</FormLabel>
                                <FormControl>
                                    <Input className='border border-primary-gold text-primary-gold shadow shadow-primary-gold' placeholder="University ID" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* lib-card section */}
                    <div>
                        <FileUpload accept="image/*" folder="books" placeholder="Upload your ID" type="image" backGroundColor={'bg-primary-gold'} onFileUpload={(path) => setFilePath(path)} />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" variant="custom" disabled={formState.isSubmitting} className='w-full font-bebasNeue text-lg'>
                        Create Account
                    </Button>
                </form>
            </Form>
            {/* {error && <Formerror message={error} />}
            {success && <Formsuccess message={success} />} */}
            <p className='mt-4 text-sm text-slate-300'>
                Already have an account ?
                <Button variant="link" className='p-1'>
                    <Link href="/api/auth/signin" className="text-primary-gold underline">LogIn</Link>
                </Button>
            </p>
        </div>
    );
}
