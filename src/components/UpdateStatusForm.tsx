import React, { useState } from 'react';

import { usePackages } from './PackagesContext';
import { Status } from '@/types';
import InputField from './InputField';

const STATUS_LABEL = ['shipped', 'in-transit', 'delivered', 'cancelled'];

type UpdatePackageFormProps = {
  packageId: number;
  onClose: () => void;
};

export default function UpdateStatusForm({ packageId, onClose }: UpdatePackageFormProps) {
  const { packages, updatePackageStatus } = usePackages();
  const packageDetail = packages.find((packageDetails) => packageDetails.id === packageId);

  // Form state
  const [location, setLocation] = useState(packageDetail?.currentLocation ?? '');
  const [status, setStatus] = useState<Status>(packageDetail?.status ?? 'shipped');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim()) {
      setError('Location is required');
      return;
    }

    if (packageDetail) {
      updatePackageStatus({ id: packageId, location, status });
      setError('');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <InputField
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Enter new location"
        error={error}
        label="Location"
        name="location"
      />

      <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
        Status:
      </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
        className="w-full rounded-md border bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {STATUS_LABEL.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Update Status
      </button>
    </form>
  );
}
