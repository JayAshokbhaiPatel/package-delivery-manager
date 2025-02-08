import { Status } from '@/types';
import getStatusColor from '@/utils/functions';

export default function StatusPil({ status }: { status: Status }) {
  const statusColorClass = getStatusColor(status);

  return <span className={`rounded-full px-4 py-1 text-sm font-medium capitalize ${statusColorClass}`}>{status}</span>;
}
