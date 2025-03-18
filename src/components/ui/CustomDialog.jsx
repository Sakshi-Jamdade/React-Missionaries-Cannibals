import { useState } from "react";

export default function CustomDialog({ title, trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            {children}
            <button
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}