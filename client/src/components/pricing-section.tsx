import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for individual developers",
    features: [
      "1 RPC Node",
      "99.5% Uptime SLA",
      "Basic monitoring",
      "Email support",
      "5 Networks"
    ],
    buttonText: "Get Started",
    buttonVariant: "default" as const,
  },
  {
    name: "Professional",
    price: "$299",
    period: "/month",
    description: "For growing businesses",
    features: [
      "5 RPC Nodes",
      "99.9% Uptime SLA",
      "Advanced monitoring",
      "Priority support",
      "All Networks",
      "Validator service"
    ],
    buttonText: "Get Started",
    buttonVariant: "default" as const,
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Unlimited nodes",
      "99.99% Uptime SLA",
      "Custom monitoring",
      "24/7 dedicated support",
      "White-label options",
      "Custom integrations"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Simple{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Transparent pricing for professional blockchain infrastructure
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative ${
                plan.isPopular 
                  ? "bg-gradient-to-br from-primary/5 to-purple-50/50 dark:from-primary/10 dark:to-purple-900/20 border-2 border-primary" 
                  : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-2">
                    {plan.price}
                    {plan.period && (
                      <span className="text-lg text-gray-600 dark:text-gray-400">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg"
                      : plan.buttonVariant === "outline"
                      ? "border-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white"
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
