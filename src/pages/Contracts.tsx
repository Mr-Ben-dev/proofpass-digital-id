import NotaryRegistryAbi from "@/abi/NotaryRegistry.json";
import ResidencyPassAbi from "@/abi/ResidencyPass.json";
import SPJurisdictionAbi from "@/abi/SPJurisdiction.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ENV } from "@/config/environment";
import { useToast } from "@/hooks/use-toast";
import { Transaction, useTransactionHistory } from "@/hooks/useTransactions";
import { contracts } from "@/utils/constants";
import { fadeIn, staggerContainer, staggerItem } from "@/utils/motionPresets";
import { motion } from "framer-motion";
import {
    Activity,
    Copy,
    Database,
    ExternalLink,
    FileCheck,
    Shield,
} from "lucide-react";

const Contracts = () => {
  const { toast } = useToast();
  const { transactions } = useTransactionHistory();

  const contractsList = [
    {
      name: "NotaryRegistry",
      address: contracts.NotaryRegistry,
      description:
        "Manages trusted notary signatures and attestation validation",
      icon: FileCheck,
      abi: NotaryRegistryAbi,
    },
    {
      name: "SPJurisdiction",
      address: contracts.SPJurisdiction,
      description:
        "Storage Provider jurisdiction compliance and verification registry",
      icon: Database,
      abi: SPJurisdictionAbi,
    },
    {
      name: "ResidencyPass",
      address: contracts.ResidencyPass,
      description:
        "Soulbound NFT residency passes with PDP verification integration",
      icon: Shield,
      abi: ResidencyPassAbi,
    },
  ];

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${description} copied to clipboard`,
    });
  };

  return (
    <motion.div
      className="min-h-screen py-12 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-cyan-500/5"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Smart Contracts</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time monitoring and interaction dashboard for ProofPass smart
            contracts
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {contractsList.map((contract) => (
            <motion.div variants={staggerItem} key={contract.name}>
              <Card className="glass-card h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg">
                      <contract.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{contract.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {contract.description}
                  </p>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <code className="text-xs font-mono">
                      {contract.address.slice(0, 10)}...
                      {contract.address.slice(-8)}
                    </code>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(
                            contract.address,
                            `${contract.name} address`
                          )
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          window.open(
                            `${ENV.EXPLORER_BASE}/address/${contract.address}`,
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Functions</div>
                    <div className="flex flex-wrap gap-1">
                      {contract.abi
                        .filter((item) => item.type === "function")
                        .map((func, i) => (
                          <Badge
                            key={func.name + i}
                            variant="outline"
                            className="text-xs"
                          >
                            {func.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-emerald-500" />
              <span>Recent Transactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactions.length > 0 ? (
                transactions.map((tx: Transaction, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          tx.status === "success"
                            ? "bg-emerald-400"
                            : tx.status === "pending"
                            ? "bg-yellow-400 animate-pulse"
                            : "bg-red-400"
                        }`}
                      />
                      <span className="font-medium">{tx.description}</span>
                    </div>
                    <div className="text-muted-foreground font-mono">
                      {tx.hash.slice(0, 10)}...
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No recent transactions.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Contracts;
