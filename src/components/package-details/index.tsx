import { PackageDetailsInterface } from '@/types';
import StatusPil from './StatusPil';
import AddressInfo from './AddressInfo';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '../Dialog';
import UpdateLocationForm from '../UpdateLocationForm';
import UpdateStatusForm from '../UpdateStatusForm';

export default function PackageDetails({ ...packageDetails }: PackageDetailsInterface) {
  const disableActionButton = packageDetails.status === 'cancelled' || packageDetails.status === 'delivered';

  const [isOpenUpdateLocation, setIsOpenUpdateLocation] = useState(false);
  const [isOpenUpdateStatus, setIsOpenUpdateStatus] = useState(false);

  const handleCloseUpdateLocation = () => {
    setIsOpenUpdateLocation(false);
  };

  const handleCloseUpdateStatus = () => {
    setIsOpenUpdateStatus(false);
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white/70 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            {/* Status Container With Basic Details */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Package ID:</span>
              <span className="text-sm font-bold text-gray-800">#{packageDetails.id}</span>
              <StatusPil status={packageDetails.status} />
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">
                Current Location: <strong className="text-gray-800">{packageDetails.currentLocation}</strong>
              </p>
            </div>

            {/* From and To Components */}
            <div className="flex items-center gap-8">
              <AddressInfo label="From" name={packageDetails.from.name} location={packageDetails.from.location} />
              <AddressInfo label="To" name={packageDetails.to.name} location={packageDetails.to.location} />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                className="cursor-pointer rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-50"
                disabled={disableActionButton}
                onClick={() => setIsOpenUpdateStatus(true)}
              >
                Update Status
              </button>

              <button
                className="cursor-pointer rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-50"
                disabled={disableActionButton}
                onClick={() => setIsOpenUpdateLocation(true)}
              >
                Update Location
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Location Dialog */}
      <Dialog isOpen={isOpenUpdateLocation} onClose={handleCloseUpdateLocation}>
        <DialogHeader>Update location</DialogHeader>
        <DialogContent>
          <UpdateLocationForm packageId={packageDetails.id} onClose={handleCloseUpdateLocation} />
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog isOpen={isOpenUpdateStatus} onClose={handleCloseUpdateStatus}>
        <DialogHeader>Update Status</DialogHeader>
        <DialogContent>
          <UpdateStatusForm packageId={packageDetails.id} onClose={handleCloseUpdateStatus} />
        </DialogContent>
      </Dialog>
    </>
  );
}
