import { useState } from 'react';
import InputField from './InputField';
import { useDialog } from './Dialog';
import { usePackages } from './PackagesContext';

interface ShippingFormData {
  senderName: string;
  receiverName: string;
  sourceLocation: string;
  destinationLocation: string;
}

interface FormErrors {
  senderName?: string;
  receiverName?: string;
  sourceLocation?: string;
  destinationLocation?: string;
}

export default function ShippingForm() {
  const [formData, setFormData] = useState<ShippingFormData>({
    senderName: '',
    receiverName: '',
    sourceLocation: '',
    destinationLocation: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const { setIsOpen } = useDialog();
  const { addPackage } = usePackages();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Sender Name validation
    if (!formData.senderName.trim()) {
      newErrors.senderName = 'Sender name is required';
    } else if (formData.senderName.length < 2) {
      newErrors.senderName = 'Sender name must be at least 2 characters';
    }

    // Receiver Name validation
    if (!formData.receiverName.trim()) {
      newErrors.receiverName = 'Receiver name is required';
    } else if (formData.receiverName.length < 2) {
      newErrors.receiverName = 'Receiver name must be at least 2 characters';
    }

    // Source Location validation
    if (!formData.sourceLocation.trim()) {
      newErrors.sourceLocation = 'Source location is required';
    }

    // Destination Location validation
    if (!formData.destinationLocation.trim()) {
      newErrors.destinationLocation = 'Destination location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission
      console.log('Form submitted:', formData);

      const { sourceLocation, senderName, destinationLocation, receiverName } = formData;

      const requestBody = {
        currentLocation: sourceLocation,
        from: {
          name: senderName,
          location: sourceLocation,
        },
        to: {
          name: receiverName,
          location: destinationLocation,
        },
      };
      addPackage({ ...requestBody, id: Math.floor(Math.random() * 100), status: 'shipped' });
      setIsOpen(false);
      // Reset form
      setFormData({
        senderName: '',
        receiverName: '',
        sourceLocation: '',
        destinationLocation: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <InputField
        label="Sender Name"
        name="senderName"
        value={formData.senderName}
        onChange={handleChange}
        error={errors.senderName}
      />

      <InputField
        label="Receiver Name"
        name="receiverName"
        value={formData.receiverName}
        onChange={handleChange}
        error={errors.receiverName}
      />

      <InputField
        label="Source Location"
        name="sourceLocation"
        value={formData.sourceLocation}
        onChange={handleChange}
        error={errors.sourceLocation}
      />

      <InputField
        label="Destination Location"
        name="destinationLocation"
        value={formData.destinationLocation}
        onChange={handleChange}
        error={errors.destinationLocation}
      />

      <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Create Shipment
      </button>
    </form>
  );
}
