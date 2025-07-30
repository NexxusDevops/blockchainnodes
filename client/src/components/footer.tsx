import { Box } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Box className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                BlockchainNodes.io
              </span>
            </div>
            <p className="text-gray-400">
              Professional blockchain infrastructure services for the decentralized future.
            </p>
            <img
              src="https://pixabay.com/get/ge940fa4cd7c5845a1e134857eda4755c52cb2b66c435727aac1258aaa2997b023fa147341cff6fdbd518d7c86a76775df522b57d52e23d0a6db8f482282e73da_1280.jpg"
              alt="Professional blockchain infrastructure and network visualization"
              className="rounded-lg w-full h-32 object-cover"
            />
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Cosmos Validators
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  RPC Nodes
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Enterprise Solutions
                </a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-white transition-colors">
                  Monitoring & Alerts
                </a>
              </li>
            </ul>
          </div>

          {/* Networks */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Networks</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#networks" className="hover:text-white transition-colors">
                  Cosmos Hub
                </a>
              </li>
              <li>
                <a href="#networks" className="hover:text-white transition-colors">
                  Osmosis
                </a>
              </li>
              <li>
                <a href="#networks" className="hover:text-white transition-colors">
                  Ethereum
                </a>
              </li>
              <li>
                <a href="#networks" className="hover:text-white transition-colors">
                  Solana
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@blockchainnodes.io</li>
              <li>Discord: BlockchainNodes</li>
              <li>Telegram: @BlockchainNodes</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} BlockchainNodes.io. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
