import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWallet } from "./wallet-provider";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Shield, Zap, Coins, ChevronRight, CheckCircle } from "lucide-react";

export function WalletSection() {
  const { isConnected, connectWallet, address } = useWallet();
  const { toast } = useToast();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");

  const payInvoiceMutation = useMutation({
    mutationFn: async (data: { invoiceNumber: string; walletAddress: string; transactionHash: string }) => {
      return apiRequest("POST", "/api/invoices/pay", data);
    },
    onSuccess: () => {
      toast({
        title: "Payment Successful",
        description: "Your invoice has been paid successfully.",
      });
      setInvoiceNumber("");
      setAmount("");
    },
    onError: (error) => {
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to process payment.",
        variant: "destructive",
      });
    },
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }

    if (!invoiceNumber || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Mock transaction hash for demo
    const mockTxHash = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    payInvoiceMutation.mutate({
      invoiceNumber,
      walletAddress: address,
      transactionHash: mockTxHash,
    });
  };

  return (
    <section id="wallet" className="py-20 bg-gradient-to-br from-primary/5 via-purple-50/50 to-pink-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Connect &{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Pay
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Seamless wallet integration with crypto payment processing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Wallet Connection Panel */}
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Connect Your Wallet</h3>

              {/* Wallet Options */}
              <div className="space-y-4 mb-8">
                <Button
                  onClick={() => connectWallet("keplr")}
                  variant="outline"
                  className="w-full flex items-center justify-between p-4 h-auto border-2 hover:border-primary transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Wallet className="text-white w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Keplr Wallet</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Cosmos ecosystem wallet</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </Button>

                <Button
                  onClick={() => connectWallet("leap")}
                  variant="outline"
                  className="w-full flex items-center justify-between p-4 h-auto border-2 hover:border-primary transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Wallet className="text-white w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Leap Wallet</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Multi-chain Cosmos wallet</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </Button>
              </div>

              {/* Connected State */}
              {isConnected && (
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-8">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-700 dark:text-green-300">Wallet Connected</span>
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-mono">
                      {address}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Form */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h4 className="font-semibold text-lg mb-4">Pay Invoice</h4>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      type="text"
                      placeholder="INV-2024-001"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative mt-2">
                      <Input
                        id="amount"
                        type="text"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pr-16"
                      />
                      <div className="absolute right-3 top-3 text-gray-500">ATOM</div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={!isConnected || payInvoiceMutation.isPending}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    {payInvoiceMutation.isPending ? "Processing..." : "Pay with Crypto"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="space-y-8">
            <img
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
              alt="Modern cryptocurrency payment interface with transaction visualization"
              className="w-full rounded-2xl shadow-lg"
            />

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Secure Payments</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    End-to-end encrypted transactions with multi-signature security protocols.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Instant Processing</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Lightning-fast transaction processing with real-time confirmation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Coins className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Multi-Token Support</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Accept payments in ATOM, OSMO, and other Cosmos ecosystem tokens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
