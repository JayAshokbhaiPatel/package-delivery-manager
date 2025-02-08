import { Status } from '@/types';

export default function getStatusColor(status: Status) {
  switch (status) {
    case 'shipped':
      return 'bg-gradient-to-r from-amber-200 to-amber-100 text-amber-800';
    case 'in-transit':
      return 'bg-gradient-to-r from-blue-200 to-blue-100 text-blue-800';
    case 'delivered':
      return 'bg-gradient-to-r from-emerald-200 to-emerald-100 text-emerald-800';
    case 'cancelled':
      return 'bg-gradient-to-r from-red-200 to-red-100 text-red-800';
    default:
      return 'bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800';
  }
}
