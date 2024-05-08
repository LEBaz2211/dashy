"use client";

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

export default function ConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
