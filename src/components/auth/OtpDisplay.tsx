
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface OtpDisplayProps {
  currentOtp: string;
}

export function OtpDisplay({ currentOtp }: OtpDisplayProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const copyOtpToClipboard = () => {
    navigator.clipboard.writeText(currentOtp);
    toast.success("OTP code copied to clipboard");
  };
  
  if (!visible) return null;
  
  return (
    <Alert className="border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-900 animate-fade-in">
      <AlertTitle className="flex items-center justify-between">
        Your verification code
        <Button variant="ghost" size="icon" onClick={copyOtpToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertTitle>
      <AlertDescription>
        <div className="font-mono text-3xl text-center my-2 tracking-widest">
          {currentOtp}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This code will disappear in 5 seconds
        </p>
      </AlertDescription>
    </Alert>
  );
}
