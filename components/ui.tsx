"use client";

import { useState } from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-4">
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-white text-sm font-semibold mb-2">{children}</p>;
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="text-gray-400 text-xs block mb-1.5">{label}</label>
      <input
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full bg-[#1a1a1a] text-white px-4 py-3 rounded-xl border border-white/10 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-gray-600"
      />
    </div>
  );
}

export function PrimaryButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer mb-2"
    >
      {label}
    </button>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/15 transition-colors cursor-pointer mb-2"
    >
      Reset
    </button>
  );
}

export function ErrorBox({ value }: { value: string }) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-4">
      <p className="text-red-400 text-sm font-mono">{value}</p>
    </div>
  );
}

export function Badge({ value, label }: { value: boolean; label: string }) {
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
        value
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {label}
    </span>
  );
}

export function DataRow({
  label,
  value,
  valueColor,
  last,
}: {
  label: string;
  value: string;
  valueColor?: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between px-4 py-3 ${!last ? "border-b border-white/5" : ""}`}
    >
      <span className="text-gray-500 text-xs">{label}</span>
      <span className={`text-xs ${valueColor || "text-white"}`}>{value}</span>
    </div>
  );
}

export function CopyButton({
  text,
  label,
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-gray-500 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
    >
      {copied ? "Copied!" : label || "Copy"}
    </button>
  );
}

export function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
      <p className="text-blue-400 text-xs text-center">{children}</p>
    </div>
  );
}
