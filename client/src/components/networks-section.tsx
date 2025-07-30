import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Atom, Coins, Sun, Link, Circle, Plus } from "lucide-react";
import type { Network } from "@shared/schema";

const networkIcons: Record<string, any> = {
  "Cosmos": Atom,
  "Ethereum": Coins,
  "Solana": Sun,
  "Polygon": Link,
  "Osmosis": Circle,
};

const networkColors: Record<string, string> = {
  "Cosmos": "from-primary to-purple-600",
  "Ethereum": "from-blue-500 to-purple-600",
  "Solana": "from-purple-500 to-pink-500",
  "Polygon": "from-red-500 to-orange-500",
  "Osmosis": "from-green-500 to-blue-500",
};

export function NetworksSection() {
  const { data: networks, isLoading } = useQuery<Network[]>({
    queryKey: ["/api/networks"],
  });

  if (isLoading) {
    return (
      <section id="networks" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Supported{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Networks
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Leading blockchain networks with proven infrastructure
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="networks" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Supported{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Networks
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Leading blockchain networks with proven infrastructure
          </p>
        </div>

        {/* Networks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {networks?.map((network: Network) => {
            const IconComponent = networkIcons[network.name] || Circle;
            const colorClass = networkColors[network.name] || "from-indigo-500 to-purple-500";

            return (
              <Card key={network.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className="text-white w-6 h-6" />
                  </div>
                  <div className="font-semibold text-sm">{network.name}</div>
                </CardContent>
              </Card>
            );
          })}
          
          {/* More Networks Card */}
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="text-white w-6 h-6" />
              </div>
              <div className="font-semibold text-sm">More</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
