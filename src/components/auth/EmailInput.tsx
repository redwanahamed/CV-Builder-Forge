
import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  isRequestingCode: boolean;
  codeSent: boolean;
  onRequestCode: () => void;
  isMobile: boolean;
}

export function EmailInput({
  email,
  setEmail,
  isRequestingCode,
  codeSent,
  onRequestCode,
  isMobile
}: EmailInputProps) {
  return (
    <div className={`flex ${isMobile ? 'flex-col' : ''} gap-2`}>
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          id="email" 
          placeholder="your.email@example.com" 
          className="pl-9" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          disabled={codeSent} 
        />
      </div>
      <Button 
        onClick={onRequestCode} 
        disabled={!email || isRequestingCode}
        className={isMobile ? 'w-full' : ''}
      >
        {isRequestingCode ? "Sending..." : codeSent ? "Resend" : "Send Code"}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
