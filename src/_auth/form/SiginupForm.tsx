import * as _React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Firebase imports
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig"; // Import your Firebase configuration

// Validation schema using Zod
const SignupFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmpassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmpassword, {
  path: ["confirmpassword"],
  message: "Passwords do not match",
});

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [_generatedOtp, setGeneratedOtp] = useState("");
  const [errorMessage, setError] = useState<string | null>(null);

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

  // Function to generate and send OTP
  const generateAndSendOtp = async (email: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    setGeneratedOtp(otp);

    try {
      // Save OTP and expiry to Firestore
      const otpDocRef = doc(db, "otps", email);
      await setDoc(otpDocRef, {
        otp,
        expiry: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
      });

      // Simulate sending OTP (Replace this with actual email sending logic)
      console.log(`OTP (${otp}) sent to email: ${email}`);
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to generate OTP. Try again.");
    }
  };

  // Function to verify OTP
  const verifyOtp = async (email: string, enteredOtp: string) => {
    try {
      const otpDocRef = doc(db, "otps", email);
      const otpDoc = await getDoc(otpDocRef);

      if (otpDoc.exists()) {
        const { otp, expiry } = otpDoc.data();
        if (otp === enteredOtp && Date.now() <= expiry) {
          setOtpVerified(true);
          console.log("OTP verified successfully.");
        } else {
          setError("Invalid or expired OTP.");
        }
      } else {
        setError("OTP not found. Please request again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Error while verifying OTP.");
    }
  };

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    const { name, username, email, password } = values;

    if (!otpSent) {
      // Send OTP if not already sent
      await generateAndSendOtp(email);
      return;
    }

    if (!otpVerified) {
      setError("Please verify the OTP before proceeding.");
      return;
    }

    try {
      setIsLoading(true);

      // Register the user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user profile
      await updateProfile(res.user, { displayName: name });

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: name,
        username,
        email,
        createdAt: new Date().toISOString(),
      });

      console.log("User registered successfully.");
      setError(null); // Clear error messages if successful
    } catch (error: any) {
      console.error("Error during signup:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("The provided email is already in use.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-form">
      <h2>Create a New Account</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...form.register("name")} />
          <p>{form.formState.errors.name?.message}</p>
        </div>
        <div>
          <label>Username</label>
          <input {...form.register("username")} />
          <p>{form.formState.errors.username?.message}</p>
        </div>
        <div>
          <label>Email</label>
          <input {...form.register("email")} />
          <p>{form.formState.errors.email?.message}</p>
        </div>
        {otpSent && !otpVerified && (
          <div>
            <label>Enter OTP</label>
            <input
              type="text"
              onChange={(e) =>
                verifyOtp(form.getValues("email"), e.target.value)
              }
            />
            <p>{errorMessage}</p>
          </div>
        )}
        <div>
          <label>Password</label>
          <input type="password" {...form.register("password")} />
          <p>{form.formState.errors.password?.message}</p>
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" {...form.register("confirmpassword")} />
          <p>{form.formState.errors.confirmpassword?.message}</p>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : otpSent ? "Verify OTP" : "Sign Up"}
        </button>
        <p>{errorMessage}</p>
      </form>
    </div>
  );
};

export default SignupForm;
