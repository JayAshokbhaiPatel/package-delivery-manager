import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './Dialog';
import ShippingForm from './ShippingForm';

export default function ListHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Package List</h1>
        <button
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add New Package
        </button>
      </div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>Add New Package</DialogHeader>
        <DialogContent>
          <ShippingForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
