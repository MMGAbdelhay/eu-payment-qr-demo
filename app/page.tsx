"use client";

import { useState } from "react";
import { GenerateTab } from "@/components/GenerateTab";
import { ParseTab } from "@/components/ParseTab";
import { ValidateTab } from "@/components/ValidateTab";

type Tab = "generate" | "parse" | "validate";

export default function Home() {
  const [tab, setTab] = useState<Tab>("generate");

  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="max-w-xl mx-auto">
        <Header />
        <TabBar tab={tab} onChange={setTab} />

        {tab === "generate" && <GenerateTab />}
        {tab === "parse" && <ParseTab />}
        {tab === "validate" && <ValidateTab />}

        <InstallSection />
        <Footer />
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">eu-payment-qr</h1>
      <p className="text-gray-400 text-sm md:text-base">
        Generate, parse, and validate EPC QR codes for SEPA payments
      </p>
      <div className="flex justify-center gap-3 mt-4">
        <ExternalLink href="https://www.npmjs.com/package/eu-payment-qr" label="npm" icon="📦" />
        <ExternalLink href="https://github.com/MMGAbdelhay/eu-payment-qr" label="GitHub" icon="🐙" />
        <ExternalLink href="https://github.com/MMGAbdelhay/eu-payment-qr-demo" label="Demo Code" icon="💻" />
        <span className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-500">
          v1.0.0
        </span>
      </div>
    </div>
  );
}

function TabBar({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  const tabs: Tab[] = ["generate", "parse", "validate"];

  return (
    <div className="flex bg-[#1a1a1a] rounded-xl p-1 mb-6">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            tab === t
              ? "bg-white/10 text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}

function InstallSection() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mt-6 mb-6">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
        Install
      </p>
      <div className="bg-black/30 p-4 rounded-xl">
        <code className="text-green-400 text-sm">npm install eu-payment-qr</code>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="text-center mt-8">
      <p className="text-gray-600 text-xs">
        Built by{" "}
        <a
          href="https://mocraft.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Mo
        </a>{" "}
        — Zero dependencies, full TypeScript support, MIT License
      </p>
    </div>
  );
}

function ExternalLink({ href, label, icon }: { href: string; label: string; icon?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-all"
    >
      {icon && <span className="mr-1">{icon}</span>}{label}
    </a>
  );
}
