import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardSection() {
  const { data: status, isLoading } = useQuery({
    queryKey: ["/api/status"],
  });

  if (isLoading) {
    return (
      <section id="dashboard" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Live{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Network Status
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real-time monitoring of our validator and node infrastructure
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
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
    <section id="dashboard" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Live{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Network Status
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real-time monitoring of our validator and node infrastructure
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-green-900 dark:text-green-100">Validator Health</h3>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                {status?.validatorHealth || "100%"}
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">All validators online</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">RPC Response</h3>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {status?.rpcResponse || "127ms"}
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">Average response time</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Network Coverage</h3>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {status?.networkCoverage || "15+"}
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">Active networks</p>
            </CardContent>
          </Card>
        </div>

        {/* Mock Dashboard */}
        <Card className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <CardContent className="p-8">
            <img
              src="https://pixabay.com/get/g3a4fba134358094dc856170e415b7650bf5615240ff07211c0a95882b4cb250f480e7cbb5421452d72621864397245b9622ced1da00076c2547f811f2405be5a_1280.jpg"
              alt="Professional data center with advanced server infrastructure"
              className="w-full h-64 object-cover rounded-xl mb-6"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {status?.totalStaked || "$2.4M"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Staked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {status?.delegators || "1,247"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Delegators</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">
                  {status?.rewards || "8.3%"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg. APY</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">
                  {status?.commission || "5%"}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Commission</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
