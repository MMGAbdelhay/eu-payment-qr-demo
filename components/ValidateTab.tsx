"use client";

import { useState } from "react";
import { validate, validateIBAN, validateBIC, formatIBAN } from "eu-payment-qr";
import {
  Card,
  SectionLabel,
  Field,
  PrimaryButton,
  ResetButton,
  Badge,
  DataRow,
  CopyButton,
} from "./ui";

const EXAMPLES = [
  {
    title: "Valid payment",
    data: { recipient: "Max Müller", iban: "DE89370400440532013000", amount: 149.99 },
  },
  {
    title: "Missing recipient",
    data: { recipient: "", iban: "DE89370400440532013000", amount: 50 },
  },
  {
    title: "Invalid IBAN",
    data: { recipient: "Anna Schmidt", iban: "DE00000000000000000000", amount: 25 },
  },
  {
    title: "Amount too high",
    data: { recipient: "Hans Weber", iban: "DE89370400440532013000", amount: 9999999999 },
  },
  {
    title: "Multiple errors",
    data: { recipient: "", iban: "INVALID", amount: -5 },
  },
];

export function ValidateTab() {
  return (
    <div>
      <IbanSection />
      <BicSection />
      <ExamplesSection />
    </div>
  );
}

function IbanSection() {
  const [input, setInput] = useState("DE89370400440532013000");
  const [result, setResult] = useState<any>(null);

  const handleValidate = () => {
    const r = validateIBAN(input);
    setResult({ ...r, formatted: formatIBAN(input) });
  };

  return (
    <Card>
      <SectionLabel>validateIBAN() + formatIBAN()</SectionLabel>
      <Field label="IBAN" value={input} onChange={setInput} />

      <div className="flex gap-3 mb-2">
        <PrimaryButton label="Validate & Format" onClick={handleValidate} />
        {result && <ResetButton onClick={() => setResult(null)} />}
      </div>

      {result && (
        <div>
          <div className="bg-black/20 rounded-xl overflow-hidden mt-2">
            <DataRow
              label="valid"
              value={result.valid ? "Valid IBAN" : "Invalid IBAN"}
              valueColor={result.valid ? "text-green-400" : "text-red-400"}
            />
            <DataRow
              label="formatted"
              value={result.formatted || "—"}
              valueColor="text-white font-semibold"
            />
            <DataRow
              label="error"
              value={result.error?.message || "None"}
              valueColor={result.error ? "text-red-400" : "text-gray-600"}
              last
            />
          </div>
          {result.formatted && (
            <div className="flex justify-end mt-2">
              <CopyButton text={result.formatted} label="Copy Formatted" />
            </div>
          )}
        </div>
      )}

      <p className="text-gray-600 text-xs mt-3 italic">
        Try: AT611904300234573201 or GB29NWBK60161331926819
      </p>
    </Card>
  );
}

function BicSection() {
  const [input, setInput] = useState("COBADEFFXXX");
  const [result, setResult] = useState<any>(null);

  const handleValidate = () => {
    setResult(validateBIC(input));
  };

  return (
    <Card>
      <SectionLabel>validateBIC()</SectionLabel>
      <Field label="BIC / SWIFT" value={input} onChange={setInput} />

      <div className="flex gap-3 mb-2">
        <PrimaryButton label="Validate" onClick={handleValidate} />
        {result && <ResetButton onClick={() => setResult(null)} />}
      </div>

      {result && (
        <div className="bg-black/20 rounded-xl overflow-hidden mt-2">
          <DataRow
            label="valid"
            value={result.valid ? "Valid BIC" : "Invalid BIC"}
            valueColor={result.valid ? "text-green-400" : "text-red-400"}
          />
          <DataRow
            label="error"
            value={result.error?.message || "None"}
            valueColor={result.error ? "text-red-400" : "text-gray-600"}
            last
          />
        </div>
      )}

      <p className="text-gray-600 text-xs mt-3 italic">
        Try: DEUTDEFF (8-char) or BNPAFRPP
      </p>
    </Card>
  );
}

function ExamplesSection() {
  const [results, setResults] = useState<any[]>([]);

  const runAll = () => {
    setResults(EXAMPLES.map((ex) => validate(ex.data as any)));
  };

  return (
    <Card>
      <SectionLabel>Validation Examples</SectionLabel>
      <p className="text-gray-500 text-xs mb-4">
        Test real-world scenarios and see how validation detects issues.
      </p>

      <div className="flex gap-3 mb-4">
        <PrimaryButton label="Run All Examples" onClick={runAll} />
        {results.length > 0 && (
          <ResetButton onClick={() => setResults([])} />
        )}
      </div>

      {EXAMPLES.map((ex, i) => (
        <div
          key={i}
          className={`p-4 rounded-xl border mb-3 ${
            results[i]
              ? results[i].valid
                ? "border-green-500/20 bg-green-500/5"
                : "border-red-500/20 bg-red-500/5"
              : "border-white/10 bg-white/[0.02]"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm font-medium">{ex.title}</span>
            {results[i] && (
              <Badge
                value={results[i].valid}
                label={
                  results[i].valid
                    ? "Pass"
                    : `${results[i].errors.length} error(s)`
                }
              />
            )}
          </div>

          <pre className="text-gray-500 text-xs font-mono">
            {`recipient: "${ex.data.recipient}"\niban: "${ex.data.iban}"\namount: ${ex.data.amount}`}
          </pre>

          {results[i] && !results[i].valid && (
            <div className="mt-3 pt-3 border-t border-white/5">
              {results[i].errors.map((err: any, j: number) => (
                <div key={j} className="mb-2 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-400 text-xs font-semibold">
                      {err.field}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                      {err.code}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{err.message}</p>
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <CopyButton
                  text={JSON.stringify(results[i].errors, null, 2)}
                  label="Copy Errors"
                />
              </div>
            </div>
          )}

          {results[i]?.valid && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-green-400 text-xs">
                All fields pass validation
              </p>
            </div>
          )}
        </div>
      ))}
    </Card>
  );
}
