
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

interface VerificationCodeInputProps {
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  isVerifying: boolean;
  onSubmit: () => void;
}

export function VerificationCodeInput({
  verificationCode,
  setVerificationCode,
  isVerifying,
  onSubmit
}: VerificationCodeInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2">
        <InputOTP 
          maxLength={4} 
          value={verificationCode} 
          onChange={setVerificationCode} 
          render={({slots}) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          )} 
        />
        <Button 
          className="w-full mt-4" 
          onClick={onSubmit} 
          disabled={verificationCode.length < 4 || isVerifying}
        >
          {isVerifying ? "Verifying..." : "Sign In"}
        </Button>
      </div>
    </div>
  );
}
