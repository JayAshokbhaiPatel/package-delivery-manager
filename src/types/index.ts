export type Status = 'shipped' | 'in-transit' | 'delivered' | 'cancelled';

export interface PackageDetailsInterface {
  id: number;
  from: {
    name: string;
    location: string;
  };
  to: {
    name: string;
    location: string;
  };
  currentLocation: string;
  status: Status;
}
