
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-mobile";
import { AdminPinDialog } from "@/components/auth/AdminPinDialog";
import { LoginTabContent } from "@/components/auth/LoginTabContent";

export default function Login() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const {
    login,
    requestLoginCode,
    isAuthenticated,
    userRole,
    currentOtp
  } = useAuth();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [currentTab, setCurrentTab] = useState("customer");
  const [adminPinDialogOpen, setAdminPinDialogOpen] = useState(false);

  // Handle redirects based on authentication
  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, userRole, navigate]);
  
  const handleRequestCode = async () => {
    if (!email) return;
    setIsRequestingCode(true);
    try {
      const success = await requestLoginCode(email);
      if (success) {
        setCodeSent(true);
      }
    } finally {
      setIsRequestingCode(false);
    }
  };
  
  const handleLogin = async () => {
    if (!email || !verificationCode) return;
    setIsVerifying(true);
    try {
      const role = currentTab === "admin" ? "admin" : "customer";
      const success = await login(email, role, verificationCode);
      if (success && role === "admin") {
        setAdminPinDialogOpen(true);
      }
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your email to receive a verification code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer">
                  <User className={`${isMobile ? '' : 'mr-2'} h-4 w-4`} />
                  {!isMobile && "Customer"}
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <Shield className={`${isMobile ? '' : 'mr-2'} h-4 w-4`} />
                  {!isMobile && "Admin"}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="customer" className="pt-4">
                <p className="mb-4 text-sm text-muted-foreground">
                  Sign in as a customer to access resume templates and tools.
                </p>
              </TabsContent>
              
              <TabsContent value="admin" className="pt-4">
                <p className="mb-4 text-sm text-muted-foreground">
                  Admin access requires verification and a PIN code.
                </p>
              </TabsContent>
              
              <LoginTabContent
                email={email}
                setEmail={setEmail}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                isRequestingCode={isRequestingCode}
                isVerifying={isVerifying}
                codeSent={codeSent}
                currentOtp={currentOtp}
                isMobile={isMobile}
                handleRequestCode={handleRequestCode}
                handleLogin={handleLogin}
              />
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </CardFooter>
        </Card>
        
        <AdminPinDialog open={adminPinDialogOpen} onOpenChange={setAdminPinDialogOpen} />
      </main>
    </div>
  );
}
