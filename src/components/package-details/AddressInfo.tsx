interface AddressInfoProps {
  label: string;
  name: string;
  location: string;
}

export default function AddressInfo({ label, name, location }: AddressInfoProps) {
  return (
    <div className="flex-1">
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{name}</p>
      <p className="text-sm text-gray-600">{location}</p>
    </div>
  );
}
