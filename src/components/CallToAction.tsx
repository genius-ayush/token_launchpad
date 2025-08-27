"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InteractiveGridPattern } from "./magicui/interactive-grid-pattern";
import { useNavigate } from "react-router-dom";

export function CallToAction() {
    const navigate = useNavigate() ; 
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden  border bg-background">
      {/* Background Grid Pattern */}
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-6">
        <h2 className="text-4xl font-extrabold tracking-tight text-yellow-500 drop-shadow-md">
          Launch Your Token in Minutes
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          No coding required. Create, customize, and launch your token instantly on Solana.  
          Get started today and bring your ideas to life.
        </p>
        <Button
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-6 rounded-xl shadow-lg transition-transform hover:scale-105" onClick={()=>navigate("/create-token")}
        >
          🚀 Get Started
        </Button>
      </div>
    </div>
  );
}
