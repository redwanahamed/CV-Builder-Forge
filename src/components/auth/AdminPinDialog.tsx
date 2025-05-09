
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

interface AdminPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminPinDialog({ open, onOpenChange }: AdminPinDialogProps) {
  const navigate = useNavigate();
  const { unlockAdmin, isAdminLocked } = useAuth();
  const [pin, setPin] = useState("");
  
  // Clear PIN when dialog opens
  useEffect(() => {
    if (open) {
      setPin("");
    }
  }, [open]);
  
  // Auto-close dialog if admin is unlocked
  useEffect(() => {
    if (!isAdminLocked && open) {
      onOpenChange(false);
      navigate("/admin", { replace: true });
      toast.success("Admin panel unlocked");
    }
  }, [isAdminLocked, open, navigate, onOpenChange]);
  
  const handleUnlock = () => {
    if (unlockAdmin(pin)) {
      // The admin is now unlocked, the useEffect above will handle the navigation
    } else {
      setPin("");
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin PIN Required</DialogTitle>
          <DialogDescription>
            Enter the admin PIN to unlock the admin dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <InputOTP maxLength={4} value={pin} onChange={setPin} render={({slots}) => (
            <InputOTPGroup>
              {slots.map((slot, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          )} />
        </div>
        <DialogFooter>
          <Button onClick={handleUnlock} disabled={pin.length < 4}>
            Unlock Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
