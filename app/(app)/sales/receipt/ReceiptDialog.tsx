"use client";

import Receipt from "./Receipt";
import { ReceiptData } from "./types";

type ReceiptDialogProps = {
  open: boolean;
  receipt: ReceiptData | null;
  onClose: () => void;
  onPrint: () => void;
};

export function ReceiptDialog({
  open,
  receipt,
  onClose,
  onPrint,
}: ReceiptDialogProps) {
  if (!open || !receipt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-md flex-col rounded-xl bg-white shadow-xl">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">
            Receipt Preview
          </h2>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          <Receipt receipt={receipt} />
        </div>

        <div className="flex justify-end gap-2 border-t p-4">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Close
          </button>

          <button
            onClick={onPrint}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}