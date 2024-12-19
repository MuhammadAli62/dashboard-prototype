import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import { ThumbsUp } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { doc, getDoc } from 'firebase/firestore';
import CDW from "../../assets/CDW.png";
import Insight from "../../assets/Insight.png";
import FCN from "../../assets/fcn.jpg";
import FTS from "../../assets/FTS.png";
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/firebase/firebaseConfig';

interface QuotationItem {
  vendor: string;
  price: number;
  description: string;
  discount: number;
}

export default function Quotation() {
  const location = useLocation();
  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>([]);
  const [recommendedVendor, setRecommendedVendor] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const vendors = searchParams.getAll('vendors[]');
    const prices = searchParams.getAll('prices[]');
    const descriptions = searchParams.getAll('descriptions[]');
    const discounts = searchParams.getAll('discounts[]');
    const recommended = searchParams.get('recommended');
    
    if (vendors.length === prices.length && vendors.length === descriptions.length && vendors.length === discounts.length) {
      const items = vendors.map((vendor, index) => ({
        vendor,
        price: parseFloat(prices[index]),
        description: descriptions[index],
        discount: parseFloat(discounts[index])
      }));
      setQuotationItems(items);
    }

    if (recommended) {
      setRecommendedVendor(recommended);
    }

    const fetchUserEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserEmail(userDoc.data().email);
        }
      }
    };

    fetchUserEmail();
  }, [location.search]);

  const getVendorLogo = (vendor: string) => {
    switch (vendor) {
      case 'CDW':
        return CDW;
      case 'Insight':
        return Insight;
      case 'FCN':
        return FCN;
      case 'FTS':
        return FTS;
      default:
        return '';
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('FTS Quotation', 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(52, 73, 94);
    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 20, 30);
    
    let yOffset = 50;
    
    quotationItems.forEach((item, index) => {
      if (item.vendor !== 'FTS') {
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text(item.vendor, 20, yOffset);
        
        doc.setFontSize(12);
        doc.setTextColor(52, 73, 94);
        doc.text(`Price: $${item.price.toFixed(2)}`, 20, yOffset + 10);
        doc.text(`Discount: ${item.discount.toFixed(2)}%`, 20, yOffset + 20);
        
        const descriptionLines = doc.splitTextToSize(item.description, 170);
        doc.text(descriptionLines, 20, yOffset + 30);
        
        yOffset += 50 + (descriptionLines.length * 5);
      }
    });
    
    const totalPrice = quotationItems
      .filter(item => item.vendor !== 'FTS')
      .reduce((sum, item) => sum + item.price, 0);
    
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text(`Total Amount: $${totalPrice.toFixed(2)}`, 20, yOffset + 10);
    
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    doc.text('Thank you for choosing FTS!', 105, 280, { align: 'center' });
    
    return new File(
      [doc.output('blob')],
      'quotation.pdf',
      { type: 'application/pdf' }
    );
  };

  const sendEmail = async () => {
    if (!userEmail) {
      toast({
        title: "Error",
        description: "User email not found. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      const pdfFile = generatePDF();
      
      const form = document.createElement('form');
      const formData = new FormData(form);
      
      formData.append('to_email', userEmail);
      formData.append('from_name', 'FTS Quotation System');
      formData.append('to_name', auth.currentUser?.displayName || 'Valued Customer');
      formData.append('message', 'Please find your detailed quotation attached below.');
      formData.append('file_attachment', pdfFile);

      await emailjs.sendForm(
        'service_x7r00a8',
        'template_haxtpr3',
        form,
        'qw3XSq9Q51WM1HTbG'
      );

      toast({
        title: "Success",
        description: "Quotation sent successfully!",
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (quotationItems.length === 0) {
    return <div>No items selected for quotation.</div>;
  }

  return (
    <Card className="bg-[#13142b] p-6 text-white max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Detailed Quotation</h2>
      {quotationItems.map((item, index) => (
        <div key={index} className={`mb-6 pb-6 border-b border-gray-700 last:border-b-0 ${item.vendor === 'FTS' ? 'ring-2 ring-green-500 p-4 rounded-lg' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src={getVendorLogo(item.vendor)} alt={`${item.vendor} Logo`} className="h-10 w-16 mr-4" />
              <span className="text-xl">{item.vendor}</span>
            </div>
            {item.vendor !== 'FTS' && (
              <div className="text-lg">
                ${item.price.toFixed(2)}
              </div>
            )}
          </div>
          {item.vendor !== 'FTS' ? (
            <>
              <p className="text-sm text-gray-400 mb-2">{item.description}</p>
              <p className="text-sm text-green-500">Discount: {item.discount.toFixed(2)}%</p>
            </>
          ) : (
            <>
              <div className="text-xl font-bold text-green-500 mb-2">Our Recommendation</div>
              <p className="text-sm text-gray-400 mb-2">{item.description}</p>
              <div className="mt-2 flex items-center text-green-500">
                <ThumbsUp className="h-4 w-4 mr-2" />
                <span className="text-sm font-semibold">Best Value Recommendation</span>
              </div>
            </>
          )}
        </div>
      ))}
      <div className="text-xl font-bold mt-6 mb-4">
        Total: ${quotationItems.filter(item => item.vendor !== 'FTS').reduce((sum, item) => sum + item.price, 0).toFixed(2)}
      </div>
      <div className="mt-6">
        <Button onClick={sendEmail} className="w-full bg-pink-600 hover:bg-pink-700" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Quotation PDF via Email'}
        </Button>
      </div>
    </Card>
  );
}

