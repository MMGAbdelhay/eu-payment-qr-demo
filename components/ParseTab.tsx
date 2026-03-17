"use client";

import { useState } from "react";
import { parse, isEpcQR, formatIBAN } from "eu-payment-qr";
import {
  Card,
  SectionLabel,
  PrimaryButton,
  ErrorBox,
  Badge,
  DataRow,
  CopyButton,
} from "./ui";

const DEFAULT_INPUT =
  "BCD\n002\n1\nSCT\nCOBADEFFXXX\nMax Müller\nDE89370400440532013000\nEUR149.99\n\nINV-2024-001\nPayment for order #1234";

export function ParseTab() {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [result, setResult] = useState<any>(null);
  const [isEpc, setIsEpc] = useState<boolean | null>(null);

  const handleParse = () => {
    const epc = isEpcQR(input);
    setIsEpc(epc);
    setResult(epc ? parse(input) : null);
  };

  return (
    <div>
      <Card>
        <SectionLabel>parse() + isEpcQR()</SectionLabel>
        <p className="text-gray-500 text-xs mb-5">
          Paste an EPC QR string to detect, parse, and extract payment data.
        </p>

        <div className="mb-4">
          <label className="text-gray-400 text-xs block mb-1.5">
            EPC String
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="w-full bg-[#1a1a1a] text-white px-4 py-3 rounded-xl border border-white/10 text-xs font-mono outline-none focus:border-white/30 transition-colors resize-none"
          />
        </div>

        <PrimaryButton label="Parse String" onClick={handleParse} />
      </Card>

      {isEpc !== null && (
        <Card>
          <SectionLabel>Parsed Payment Details</SectionLabel>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-500 text-xs">isEpcQR():</span>
            <Badge
              value={isEpc}
              label={isEpc ? "Valid EPC QR" : "Not EPC QR"}
            />
          </div>

          {isEpc && result?.valid ? (
            <div>
              <div className="bg-black/20 rounded-xl overflow-hidden">
                <DataRow label="recipient" value={result.data.recipient} />
                <DataRow label="iban" value={formatIBAN(result.data.iban)} />
                <DataRow label="bic" value={result.data.bic || "—"} />
                <DataRow
                  label="amount"
                  value={
                    result.data.amount ? `€${result.data.amount}` : "—"
                  }
                />
                <DataRow
                  label="reference"
                  value={result.data.reference || "—"}
                />
                <DataRow
                  label="message"
                  value={result.data.message || "—"}
                  last
                />
              </div>
              <div className="flex justify-end mt-3">
                <CopyButton
                  text={JSON.stringify(result.data, null, 2)}
                  label="Copy JSON"
                />
              </div>
            </div>
          ) : isEpc && !result?.valid ? (
            <ErrorBox value={result?.error || "Failed to parse"} />
          ) : (
            <p className="text-gray-500 text-xs">
              This string is not an EPC/SEPA QR code format.
            </p>
          )}
        </Card>
      )}
    </div>
  );
}
