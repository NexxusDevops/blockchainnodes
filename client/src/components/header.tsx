import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "./theme-provider";
import { useWallet } from "./wallet-provider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sun, Moon, Menu, Wallet, Box } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isConnected, connectWallet, disconnectWallet, address } = useWallet();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleWalletConnect = async (type: "keplr" | "leap") => {
    await connectWallet(type);
    setWalletModalOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Services", href: "services" },
    { label: "Validators", href: "dashboard" },
    { label: "Networks", href: "networks" },
    { label: "Pricing", href: "pricing" },
    { label: "Contact", href: "wallet" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Box className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              BlockchainNodes.io
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-blue-400" />
              )}
            </Button>

            {/* Wallet Connect Button */}
            {isConnected ? (
              <Button
                onClick={disconnectWallet}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connected
              </Button>
            ) : (
              <Dialog open={walletModalOpen} onOpenChange={setWalletModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold mb-2">
                      Connect Wallet
                    </DialogTitle>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      Choose your preferred wallet to connect
                    </p>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button
                      onClick={() => handleWalletConnect("keplr")}
                      className="w-full flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-transparent text-foreground hover:text-foreground"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Wallet className="text-white w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Keplr Wallet</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Most popular Cosmos wallet
                        </div>
                      </div>
                    </Button>

                    <Button
                      onClick={() => handleWalletConnect("leap")}
                      className="w-full flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-transparent text-foreground hover:text-foreground"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <Wallet className="text-white w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Leap Wallet</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Multi-chain Cosmos wallet
                        </div>
                      </div>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
