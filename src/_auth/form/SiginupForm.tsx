import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormSchema } from "../../lib/validation/index"; // Adjust the path as necessary
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig"; // Adjust the path as necessary
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_USER_ID;

emailjs.init(EMAILJS_PUBLIC_KEY!);

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const SignupForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setError] = useState<string | null>(null);
    const [otp, setOtp] = useState<string | null>(null);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
        },
    });

    const sendOtpToEmail = async (email: string) => {
        const generatedOtp = generateOTP();
        setOtp(generatedOtp);

        try {
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID!,
                EMAILJS_TEMPLATE_ID!,
                { otp: generatedOtp, user_email: email }
            );

            if (response.status === 200) {
                console.log(`OTP sent to ${email}: ${generatedOtp}`);
                setOtpSent(true);
                setError(null);
            } else {
                throw new Error("Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            setError("Failed to send OTP. Please try again.");
        }
    };

    const verifyOtp = (enteredOtp: string) => {
        if (otp === enteredOtp) {
            setOtpVerified(true);
            setError(null);
        } else {
            setError("Invalid OTP. Please try again.");
        }
    };

    const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
        if (!otpVerified) {
            return setError("Please verify your OTP before proceeding.");
        }

        setIsLoading(true);
        setError(null);

        const { name, username, email, password } = values;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, { displayName: name });
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: name,
                username,
                email,
                createdAt: new Date().toISOString(),
            });

            console.log("User registered and data stored successfully.");
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Error during signup:", error);
            setError("An error occurred during signup. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Form {...form}>
                <div className="mx-auto min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center min-w-80 p-6 rounded mx-auto shadow-md">
                        <h2 className="text-2xl font-bold text-black mb-4">Create New Account</h2>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 mt-4">
                            <div className="flex flex-col md:flex-row justify-between gap-3">
                                <FormField
                                    name="name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="shad-input sm:w-310 w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="username"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="shad-input sm:w-310 w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" className="shad-input" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col md:flex-row justify-between gap-3">
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" className="shad-input sm:w-310 w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="confirmpassword"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" className="shad-input sm:w-310 w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {!otpSent && (
                                <Button
                                    type="button"
                                    className="shad-button_secondary"
                                    onClick={() => sendOtpToEmail(form.getValues("email"))}
                                >
                                    Send OTP
                                </Button>
                            )}
                            {otpSent && !otpVerified && (
                                <FormField
                                    name="otp"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Enter OTP</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className="shad-input"
                                                    {...field}
                                                    onChange={(e) => verifyOtp(e.target.value)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <Button type="submit" className="shad-button_primary" disabled={!otpVerified}>
                                {isLoading ? <span>Loading...</span> : "Sign Up"}
                            </Button>
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            <p className="text-small-regular text-light-2 text-center mt-2">
                                Already have an account?
                                <Link className="text-primary-500 text-small-semibold ml-1" to="/login">
                                    Log in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </Form>
            <Footer />
        </>
    );
};

export default SignupForm;

