"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function HowToUseAndFAQ() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
        How to Use & FAQs
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {/* How to Use */}
        <AccordionItem value="how-to-use">
          <AccordionTrigger>🚀 How to Create a New Token</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>First, connect your wallet (required before creating a token).</li>
              <li>Enter the token details:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li><strong>Name</strong> – Your token’s full name.</li>
                  <li><strong>Symbol</strong> – Short symbol (e.g. TKN).</li>
                  <li><strong>Decimals</strong> – Choose between 0 and 18 decimals.</li>
                  <li><strong>Supply</strong> – Total number of tokens to mint.</li>
                  <li><strong>Image URL</strong> – Optional logo for your token.</li>
                </ul>
              </li>
              <li>Review the details and click <strong>Create Token</strong>.</li>
              <li>Your token will be deployed instantly on the <span className="font-semibold text-yellow-600">DeNet</span> network 🎉</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        {/* FAQs */}
        <AccordionItem value="faq1">
          <AccordionTrigger>❓ Do I need to connect my wallet first?</AccordionTrigger>
          <AccordionContent>
            Yes. You must connect your wallet before you can create a token. If not connected, you’ll only see the “Connect Wallet” button.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq2">
          <AccordionTrigger>❓ On which network does it currently work?</AccordionTrigger>
          <AccordionContent>
            At the moment, our launchpad only works on the <span className="font-semibold text-yellow-600">DeNet</span> network.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq3">
          <AccordionTrigger>❓ Can I customize token metadata?</AccordionTrigger>
          <AccordionContent>
            Yes. You can add metadata like <strong>name, symbol, decimals, supply, and image URL</strong> during creation.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq4">
          <AccordionTrigger>❓ What happens after I click Create Token?</AccordionTrigger>
          <AccordionContent>
            Once you confirm the transaction in your wallet, your token will be deployed instantly and ready to use.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
