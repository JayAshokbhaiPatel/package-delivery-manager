import { useState } from 'react';
import { usePackages } from './PackagesContext';
import InputField from './InputField';

export default function UpdateLocationForm({ packageId, onClose }: { packageId: number; onClose: () => void }) {
  const { updatePackageLocation, packages } = usePackages();

  const packageDetail = packages?.find((packageDetails) => packageDetails.id === packageId);

  const [location, setLocation] = useState(packageDetail?.currentLocation ?? '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim()) {
      setError('Location is required');
      return;
    }

    if (packageDetail) {
      updatePackageLocation({ id: packageDetail.id, location: location });
      setError('');
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <InputField
        label="Location"
        name="location"
        value={location}
        onChange={(event) => setLocation(event?.target.value)}
        error={error}
        placeholder="Enter new location"
      />

      <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Update Location
      </button>
    </form>
  );
}
