import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SinginFormSchema } from "@/lib/validation";
import { auth } from "../../firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
const SignInForm = () => {

    const form = useForm<z.infer<typeof SinginFormSchema>>({
        resolver: zodResolver(SinginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });
    const Navigate = useNavigate()

    async function onSubmit(values: z.infer<typeof SinginFormSchema>) {
        const { email, password } = values
        try {
            await signInWithEmailAndPassword(auth, email, password)
            Navigate("/dashboard")
            console.log("login")
        } catch (error) {
            console.log(error)
        }

        console.log(values);
    };

    return (
        <>
            <Header />
            <div className=" mx-auto min-h-screen  flex items-center justify-center ">
                <div className="flex flex-col items-center min-w-80 p-6 rounded mx-auto shadow-md">
                    <h3 className="text-2xl font-bold text-black mb-4">Welcome Back!</h3>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="your@email.com" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" className="shad-input sm:w-310 w-full "  {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Link to="/forgetpassword" className="text-xs text-left font-normal flex w-full -mt-2">Forget Password?</Link>
                            <div className="flex flex-row justify-between w-full items-center">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms1" />
                                    <Label htmlFor="terms1">Remember me</Label>
                                </div>
                                <Link to="/register" className="text-xs text-left font-normal">Create Account</Link>
                            </div>
                            <Button className="w-full" type="submit">Login</Button>
                        </form>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignInForm;
