
import { useState } from "react";
import { Mail, Key, ToggleLeft, PaintBucket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const AdminSettings = () => {
  const [featuresState, setFeaturesState] = useState({
    skillGapAI: true,
    autoSuggestions: true,
    multiLanguage: false,
    pdfWatermark: true
  });

  const handleFeatureToggle = (feature: string) => {
    setFeaturesState(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }));
  };

  return (
    <Tabs defaultValue="email-templates">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="email-templates" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Email Templates</span>
        </TabsTrigger>
        <TabsTrigger value="payment-settings" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          <span className="hidden sm:inline">Payment Settings</span>
        </TabsTrigger>
        <TabsTrigger value="features" className="flex items-center gap-2">
          <ToggleLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Features</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <PaintBucket className="h-4 w-4" />
          <span className="hidden sm:inline">Appearance</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="email-templates" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Email</CardTitle>
            <CardDescription>
              Customize the email sent to new users when they register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="welcome-subject">Subject Line</Label>
                <Input
                  id="welcome-subject"
                  defaultValue="Welcome to ResumeBuilder - Get Started with Your Professional Resume!"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="welcome-content">Email Content</Label>
                <Textarea
                  id="welcome-content"
                  rows={10}
                  defaultValue={`Dear {user_name},

Thank you for joining ResumeBuilder! We're excited to help you create professional, eye-catching resumes that will help you stand out to potential employers.

To get started:
1. Complete your profile information
2. Browse our template gallery
3. Create your first resume

If you need any assistance, please don't hesitate to contact our support team.

Best regards,
The ResumeBuilder Team`}
                />
              </div>
              <div className="grid gap-2">
                <Label>Available Variables</Label>
                <div className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-muted mr-2 mb-2">{'{user_name}'}</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-muted mr-2 mb-2">{'{user_email}'}</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-muted mr-2 mb-2">{'{signup_date}'}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Password Reset Email</CardTitle>
            <CardDescription>
              Customize the email sent when users request a password reset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="reset-subject">Subject Line</Label>
                <Input
                  id="reset-subject"
                  defaultValue="Reset Your ResumeBuilder Password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reset-content">Email Content</Label>
                <Textarea
                  id="reset-content"
                  rows={8}
                  defaultValue={`Hello,

We received a request to reset your password for your ResumeBuilder account.

Please click the link below to reset your password:
{reset_link}

This link will expire in 24 hours.

If you didn't request a password reset, you can safely ignore this email.

Regards,
The ResumeBuilder Team`}
                />
              </div>
              <div className="grid gap-2">
                <Label>Available Variables</Label>
                <div className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-muted mr-2 mb-2">{'{reset_link}'}</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-muted mr-2 mb-2">{'{user_email}'}</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-muted mr-2 mb-2">{'{expiry_time}'}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="payment-settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Stripe Configuration</CardTitle>
            <CardDescription>
              Configure your Stripe API keys and payment settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stripe-public">Stripe Public Key</Label>
                <Input
                  id="stripe-public"
                  type="password"
                  placeholder="pk_test_..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                <Input
                  id="stripe-secret"
                  type="password"
                  placeholder="sk_test_..."
                />
                <p className="text-sm text-muted-foreground">
                  Note: Secret keys are stored securely and encrypted
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input
                    id="currency"
                    defaultValue="USD"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subscription-price">Monthly Subscription Price</Label>
                  <Input
                    id="subscription-price"
                    type="number"
                    defaultValue="9.99"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-end gap-4">
            <Button variant="outline">Test Connection</Button>
            <Button>Save Settings</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Plans</CardTitle>
            <CardDescription>
              Configure the available subscription plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">Basic Plan</h4>
                    <p className="text-sm text-muted-foreground">Limited features with ads</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">$0</span>
                    <p className="text-xs text-muted-foreground">Free</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Features (comma-separated)</Label>
                  <Input 
                    className="mt-1"
                    defaultValue="3 Templates, 2 Downloads per month, Basic formatting"
                  />
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">Premium Plan</h4>
                    <p className="text-sm text-muted-foreground">Full features without limitations</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">$9.99</span>
                    <p className="text-xs text-muted-foreground">Monthly</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Features (comma-separated)</Label>
                  <Input 
                    className="mt-1"
                    defaultValue="All Templates, Unlimited Downloads, Advanced formatting, No ads, AI suggestions, Priority support"
                  />
                </div>
              </div>
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add New Plan</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Plans</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="features" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
            <CardDescription>
              Enable or disable specific features in the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="skill-gap-ai">Skill Gap AI</Label>
                  <p className="text-sm text-muted-foreground">
                    AI-powered suggestions for improving skills based on job requirements
                  </p>
                </div>
                <Switch
                  id="skill-gap-ai"
                  checked={featuresState.skillGapAI}
                  onCheckedChange={() => handleFeatureToggle('skillGapAI')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-suggestions">Auto-Suggestions</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically suggest content improvements for resumes
                  </p>
                </div>
                <Switch
                  id="auto-suggestions"
                  checked={featuresState.autoSuggestions}
                  onCheckedChange={() => handleFeatureToggle('autoSuggestions')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="multi-language">Multi-Language Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable resume creation in multiple languages
                  </p>
                </div>
                <Switch
                  id="multi-language"
                  checked={featuresState.multiLanguage}
                  onCheckedChange={() => handleFeatureToggle('multiLanguage')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pdf-watermark">PDF Watermark</Label>
                  <p className="text-sm text-muted-foreground">
                    Add a subtle watermark to free-tier PDF downloads
                  </p>
                </div>
                <Switch
                  id="pdf-watermark"
                  checked={featuresState.pdfWatermark}
                  onCheckedChange={() => handleFeatureToggle('pdfWatermark')}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="appearance" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Brand Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="app-name">Application Name</Label>
                <Input
                  id="app-name"
                  defaultValue="ResumeBuilder"
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Brand Colors</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary-color" className="text-xs">Primary Color</Label>
                    <div className="flex mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        defaultValue="#3b82f6"
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        type="text"
                        defaultValue="#3b82f6"
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color" className="text-xs">Secondary Color</Label>
                    <div className="flex mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        defaultValue="#64748b"
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        type="text"
                        defaultValue="#64748b"
                        className="flex-1 ml-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Logo Upload</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border rounded bg-muted/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended size: 200x80px
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="favicon">Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border rounded bg-muted/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Input
                      id="favicon-upload"
                      type="file"
                      accept="image/png,image/x-icon,image/svg+xml"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: .ico or .png (32x32px)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="mr-2">Reset to Default</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
