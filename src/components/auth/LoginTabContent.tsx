
import { Label } from "@/components/ui/label";
import { EmailInput } from "./EmailInput";
import { OtpDisplay } from "./OtpDisplay";
import { VerificationCodeInput } from "./VerificationCodeInput";

interface LoginTabContentProps {
  email: string;
  setEmail: (email: string) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  isRequestingCode: boolean;
  isVerifying: boolean;
  codeSent: boolean;
  currentOtp: string | null;
  isMobile: boolean;
  handleRequestCode: () => void;
  handleLogin: () => void;
}

export function LoginTabContent({
  email,
  setEmail,
  verificationCode,
  setVerificationCode,
  isRequestingCode,
  isVerifying,
  codeSent,
  currentOtp,
  isMobile,
  handleRequestCode,
  handleLogin
}: LoginTabContentProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <EmailInput
          email={email}
          setEmail={setEmail}
          isRequestingCode={isRequestingCode}
          codeSent={codeSent}
          onRequestCode={handleRequestCode}
          isMobile={isMobile}
        />
      </div>
      
      {currentOtp && <OtpDisplay currentOtp={currentOtp} />}
      
      {codeSent && (
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <VerificationCodeInput
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            isVerifying={isVerifying}
            onSubmit={handleLogin}
          />
        </div>
      )}
    </div>
  );
}
