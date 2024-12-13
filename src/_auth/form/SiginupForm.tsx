import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import AvatarImg from "../../assets/avatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import { SignupFormSchema } from "@/lib/validation";
import emailjs from '@emailjs/browser';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      image: undefined as unknown as File,
    },
  });

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async (email: string, name: string) => {
    const generatedOtp = generateOTP();
    setOtp(generatedOtp);

    const serviceId = 'service_x7r00a8';
    const templateId = 'template_eeq2mj9';
    const publicKey = 'qw3XSq9Q51WM1HTbG';

    const templateParams = {
      form_name: "FTS",
      to_email: email,
      to_name: name,
      message: `Your OTP is: ${generatedOtp}`
    };

    try {
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('OTP sent successfully:', response.status, response.text);
      setIsOtpSent(true);
    } catch (error) {
      console.error('Failed to send OTP:', error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const verifyOTP = () => {
    if (enteredOtp === otp) {
      setIsOtpVerified(true);
      setError(null);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    if (!isOtpVerified) {
      setError("Please verify your email with OTP before signing up.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { name, username, email, password, image } = values;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      let downloadURL = '';
      if (image) {
        const date = new Date().getTime();
        const storageRef = ref(storage, `${name}_${date}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            () => {
              // Handle progress if needed
            },
            (error) => {
              reject(error);
            },
            async () => {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      await updateProfile(res.user, {
        displayName: name,
        photoURL: downloadURL || null,
      });
      console.log(name)
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: name,
        username,
        email,
        photoURL: downloadURL || null,
        createdAt: new Date().toISOString(),
      });

      console.log("User registered and data stored successfully.");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error during signup:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("The provided email is already in use by an existing user.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        case "auth/invalid-email":
          setError("The email address is badly formatted.");
          break;
        default:
          setError("An error occurred during signup. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Form {...form}>
        <div className="mx-auto min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center min-w-80 p-6 rounded mx-auto shadow-md">
            <h2 className="text-2xl font-bold text-black mb-4">Create New Account</h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
              To use FTS, enter your details
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 mt-4">
                <div className="flex flex-row items-center justify-center">
                <FormField
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          id="image"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                            form.setValue('image', file as File);
                            setSelectedFileName(file ? file.name : null);
                          }}
                        />
                      </FormControl>
                      <FormLabel htmlFor="image">
                        <img src={AvatarImg} alt="avatar_pic" className="cursor-pointer" />
                        <span style={{ fontWeight: 700 }}>Add an avatar</span>
                        {selectedFileName && (
                          <p className="text-sm text-gray-500 mt-1">{selectedFileName}</p>
                        )}
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              {!isOtpSent && (
                <Button
                  type="button"
                  onClick={() => sendOTP(form.getValues("email"), form.getValues("name"))}
                  className="shad-button_secondary"
                >
                  Send OTP
                </Button>
              )}
              {isOtpSent && !isOtpVerified && (
                <div>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className="shad-input mb-2"
                  />
                  <Button type="button" onClick={verifyOTP} className="shad-button_secondary">
                    Verify OTP
                  </Button>
                </div>
              )}
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
              <Button type="submit" className="shad-button_primary" disabled={!isOtpVerified}>
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

