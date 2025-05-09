
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';

// Plan feature type
interface PlanFeature {
  name: string;
  included: boolean;
}

// Plan type
interface PricingPlan {
  id: string;
  name: string;
  color: string;
  description: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  oneTimePrice?: number;
  features: PlanFeature[];
  popularPlan?: boolean;
  buttonText: string;
}

const Pricing = () => {
  // State for the billing period
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Define the plans based on your pricing structure
  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      color: 'bg-green-500',
      description: 'Get started with the basics',
      features: [
        { name: 'Upload and parse 1 old CV', included: true },
        { name: 'Use 2 free templates', included: true },
        { name: 'Basic editing & PDF download', included: true },
        { name: '1-time AI grammar check', included: true },
        { name: 'Save 1 CV version', included: true },
        { name: 'Unlimited uploads and edits', included: false },
        { name: 'Access all templates', included: false },
        { name: 'Cover letter builder', included: false },
        { name: 'LinkedIn import', included: false },
        { name: 'Expert CV review', included: false }
      ],
      buttonText: 'Get Started'
    },
    {
      id: 'pro',
      name: 'Pro',
      color: 'bg-amber-500',
      description: 'Perfect for job seekers',
      monthlyPrice: 5,
      yearlyPrice: 49,
      oneTimePrice: 9.99,
      features: [
        { name: 'Upload and parse 1 old CV', included: true },
        { name: 'Use 2 free templates', included: true },
        { name: 'Basic editing & PDF download', included: true },
        { name: '1-time AI grammar check', included: true },
        { name: 'Save 1 CV version', included: true },
        { name: 'Unlimited uploads and edits', included: true },
        { name: 'Access all templates', included: true },
        { name: 'AI grammar & structure suggestions', included: true },
        { name: 'Cover letter builder', included: true },
        { name: 'LinkedIn import', included: true },
        { name: 'Save up to 10 CV versions', included: true },
        { name: 'Export to PDF or DOCX', included: true },
        { name: 'Expert CV review', included: false },
        { name: 'Job match analyzer', included: false }
      ],
      popularPlan: true,
      buttonText: 'Upgrade to Pro'
    },
    {
      id: 'premium',
      name: 'Premium Plus',
      color: 'bg-blue-500',
      description: 'For serious career advancement',
      yearlyPrice: 49,
      features: [
        { name: 'All Pro features', included: true },
        { name: 'Monthly expert CV review', included: true },
        { name: 'Job match analyzer', included: true },
        { name: 'AI interview questions', included: true },
        { name: 'Priority support', included: true },
        { name: 'Unlimited CV version history', included: true },
        { name: 'Custom branding', included: true }
      ],
      buttonText: 'Get Premium Plus'
    }
  ];

  // Add-on products
  const addOns = [
    {
      id: 'expert-review',
      name: 'Extra Expert Review',
      price: 19,
      description: 'Get feedback from CV professionals'
    },
    {
      id: 'premium-templates',
      name: '5 Premium Templates',
      price: 4.99,
      description: 'Stand out with exclusive designs'
    },
    {
      id: 'cv-feedback',
      name: '24h CV Feedback',
      price: 9.99,
      description: 'Quick turnaround on your CV'
    },
    {
      id: 'mock-interview',
      name: 'AI Mock Interview',
      price: 7.99,
      description: 'Prepare for your interviews'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan to elevate your CV and boost your career opportunities. 
              All plans include our core AI CV builder functionality.
            </p>
          </div>

          {/* Billing toggle for Pro plan */}
          <div className="flex justify-center mb-8">
            <Tabs value={billingPeriod} onValueChange={(v: string) => setBillingPeriod(v as 'monthly' | 'yearly')} className="w-full max-w-xs">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly <Badge variant="outline" className="ml-1.5 bg-green-100 text-green-800 border-0 text-xs">20% OFF</Badge></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Main plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative flex flex-col h-full ${plan.popularPlan ? 'border-primary shadow-lg' : ''}`}>
                {plan.popularPlan && (
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2">
                    <Badge className="bg-primary text-white py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 ${plan.color}`}>
                    {plan.id === 'free' ? '🟢' : plan.id === 'pro' ? '🟡' : '🔵'}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    {plan.id === 'free' ? (
                      <div className="mb-2">
                        <span className="text-3xl font-bold">Free</span>
                        <span className="text-muted-foreground ml-2">forever</span>
                      </div>
                    ) : plan.id === 'pro' ? (
                      <div>
                        {billingPeriod === 'monthly' ? (
                          <div className="mb-2">
                            <span className="text-3xl font-bold">${plan.monthlyPrice}</span>
                            <span className="text-muted-foreground">/month</span>
                            <div className="text-muted-foreground mt-1 text-sm">or ${plan.oneTimePrice} one-time payment</div>
                          </div>
                        ) : (
                          <div className="mb-2">
                            <span className="text-3xl font-bold">${plan.yearlyPrice}</span>
                            <span className="text-muted-foreground">/year</span>
                            <div className="text-muted-foreground mt-1 text-sm">Save $11 compared to monthly</div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mb-2">
                        <span className="text-3xl font-bold">${plan.yearlyPrice}</span>
                        <span className="text-muted-foreground">/year</span>
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className={`flex items-start gap-2 ${feature.included ? '' : 'text-muted-foreground'}`}>
                        <span className="mt-0.5">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="h-5 w-5 block"></span>
                          )}
                        </span>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${plan.popularPlan ? 'bg-primary' : ''}`}>
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Add-ons section */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-center mb-8">Power-Up Add-ons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon) => (
                <Card key={addon.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{addon.name}</CardTitle>
                    <CardDescription>{addon.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="font-bold text-2xl">
                      ${addon.price}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Add to cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* FAQ section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Can I switch plans later?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">We offer a 14-day money-back guarantee on all paid plans if you're not satisfied with our service.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay through our secure Stripe payment system.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Can I get team or bulk licenses?</h3>
                <p className="text-muted-foreground">Yes! Contact our sales team for special pricing on team plans or bulk licenses for educational institutions and large organizations.</p>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Ready to transform your CV?</h2>
            <p className="mb-6 text-muted-foreground">Start with our free plan or upgrade for premium features.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" asChild>
                <Link to="/">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">View Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
