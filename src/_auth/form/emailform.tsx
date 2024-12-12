import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast';


const OtpEmailForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Function to generate a 6-digit OTP
  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const otp = generateOTP();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_x7r00a8';
    const templateId = 'template_eeq2mj9';
    const publicKey = 'qw3XSq9Q51WM1HTbG';

    // Create a new object that contains dynamic template params
    const templateParams = {
      to_email: email,
      otp: otp,
    };

    try {
      // Send the email using EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('OTP sent successfully!', response);
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your email.",
      });
      setEmail('');
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send OTP'}
      </Button>
    </form>
  );
};

export default OtpEmailForm;

