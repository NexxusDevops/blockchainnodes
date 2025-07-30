import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface StatusData {
  validatorHealth: string;
  rpcResponse: string;
  networkCoverage: string;
  totalStaked: string;
  delegators: string;
  rewards: string;
  commission: string;
  uptime: string;
  networks: number;
  validators: number;
}

export function HeroSection() {
  const { data: status } = useQuery<StatusData>({
    queryKey: ["/api/status"],
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Professional{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Blockchain
                </span>{" "}
                Node Services
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Reliable deployment and maintenance of blockchain nodes for consumers and businesses. 
                Specializing in Cosmos validators and RPC nodes across leading networks.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {status?.uptime || "99.9%"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {status?.networks || "15+"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Networks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {status?.validators || "50+"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Validators</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection("services")}
                className="bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Deploy Node
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("services")}
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                View Services
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Advanced blockchain technology infrastructure"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Network</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">24/7</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
