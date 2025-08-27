import { cn } from "@/lib/utils";
import {
  IconBolt,
  IconChartLine,
  IconCode,
  IconCoins,
  IconRocket,
  IconShield,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react";

export function Features() {
  const features = [

    {

      title: "No-Code Token Creation",

      description:

        "Create custom tokens on Solana without writing a single line of code. Our intuitive interface makes token creation accessible to everyone.",

      icon: <IconCode className="text-yellow-500"/>,

    },

    {

      title: "Lightning Fast Deployment",

      description:

        "Deploy your tokens in minutes, not hours. Solana's high-performance blockchain ensures instant token creation and transactions.",

      icon: <IconBolt className="text-yellow-500"/>,

    },

    {

      title: "Secure & Reliable",

      description:

        "Built on Solana's battle-tested infrastructure with enterprise-grade security. Your tokens are protected by the most secure blockchain network.",

      icon: <IconShield className="text-yellow-500"/>,

    },

    {

      title: "Wallet Integration",

      description:

        "Seamlessly connect with popular Solana wallets. Support for Phantom, Solflare, and other major wallet providers.",

      icon: <IconWallet className="text-yellow-500"/>,

    },

    {

      title: "Token Analytics",

      description:

        "Track your token's performance with real-time analytics. Monitor supply, transactions, and market activity all in one dashboard.",

      icon: <IconChartLine className="text-yellow-500"/>,

    },

    {

      title: "Community Building",

      description:

        "Build and grow your token community with built-in social features. Share your token with the world and attract investors.",

      icon: <IconUsers className="text-yellow-500"/>,

    },

    {

      title: "Low Transaction Fees",

      description:

        "Enjoy Solana's ultra-low transaction fees. Create and manage tokens at a fraction of the cost compared to other blockchains.",

      icon: <IconCoins className="text-yellow-500"/>,

    },

    {

      title: "Launchpad Ready",

      description:

        "Your tokens are ready for launchpads and exchanges. Built with industry standards for easy listing and trading.",

      icon: <IconRocket className="text-yellow-500"/>,

    },

  ];
  return (
    <section id="features">
      <div className="text-center mb-10">

        <h2 className="text-4xl md:text-5xl font-bold text-slate-300 mb-4">

          Why Choose Our Token Launchpad?

        </h2>

        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">

          Experience the future of token creation with our comprehensive Solana-based platform

        </p>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>

    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (



      <div
        className={cn(
          "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800 ",
          (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
          index < 4 && "lg:border-b dark:border-neutral-800 "
        )}
      >
        {index < 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        {index >= 4 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
          {icon}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
            {title}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
          {description}
        </p>
      </div>
  );
};
