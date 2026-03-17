"use client";

import { useState } from "react";
import { generate } from "eu-payment-qr";
import QRCode from "qrcode";
import {
  Card,
  SectionLabel,
  Field,
  PrimaryButton,
  ErrorBox,
  CopyButton,
  InfoBox,
} from "./ui";

export function GenerateTab() {
  const [recipient, setRecipient] = useState("Max Müller");
  const [iban, setIban] = useState("DE89370400440532013000");
  const [bic, setBic] = useState("COBADEFFXXX");
  const [amount, setAmount] = useState("149.99");
  const [reference, setReference] = useState("INV-2024-001");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setResult("");
    setQrDataUrl("");
    try {
      const payload = generate({
        recipient,
        iban,
        bic: bic || undefined,
        amount: amount ? parseFloat(amount) : undefined,
        reference: reference || undefined,
        message: message || undefined,
      });
      setResult(payload);

      const dataUrl = await QRCode.toDataURL(payload, {
        width: 240,
        margin: 2,
        color: { dark: "#000", light: "#fff" },
      });
      setQrDataUrl(dataUrl);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div>
      <Card>
        <SectionLabel>generate()</SectionLabel>
        <p className="text-gray-500 text-xs mb-5">
          Create an EPC-compliant string from payment data. This is what goes
          inside a QR code.
        </p>

        <Field label="Recipient *" value={recipient} onChange={setRecipient} />
        <Field label="IBAN *" value={iban} onChange={setIban} />
        <Field label="BIC" value={bic} onChange={setBic} placeholder="Optional" />
        <Field label="Amount (EUR)" value={amount} onChange={setAmount} type="number" />
        <Field label="Reference" value={reference} onChange={setReference} placeholder="Optional" />
        <Field label="Message" value={message} onChange={setMessage} placeholder="Optional" />

        <PrimaryButton label="Generate EPC String" onClick={handleGenerate} />
      </Card>

      {error && <ErrorBox value={error} />}

      {result && (
        <Card>
          <div className="flex justify-between items-center mb-3">
            <SectionLabel>EPC Payload (used by banking apps)</SectionLabel>
            <CopyButton text={result} />
          </div>
          <pre className="text-green-400 text-xs font-mono bg-black/30 p-4 rounded-xl overflow-x-auto whitespace-pre">
            {result}
          </pre>
        </Card>
      )}

      {qrDataUrl && (
        <Card>
          <SectionLabel>QR Preview (payload encoded with a QR library)</SectionLabel>
          <p className="text-gray-500 text-xs mb-4">
            Scan with any European banking app to pre-fill payment details
          </p>
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-xl">
              <img src={qrDataUrl} alt="EPC QR Code" width={240} height={240} />
            </div>
          </div>
          <InfoBox>
            QR rendered with <code className="font-mono">qrcode</code> library
            — not part of eu-payment-qr
          </InfoBox>
        </Card>
      )}
    </div>
  );
}
