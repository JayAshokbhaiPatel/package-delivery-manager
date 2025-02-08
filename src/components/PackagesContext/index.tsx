import { createContext, ReactNode, useReducer, useContext } from 'react';
import { PackageDetailsInterface, Status } from '@/types';

type PayloadUpdatePackageStatus = {
  location: string;
  status: Status;
  id: number;
};

type PayloadUpdateLocation = {
  location: string;
  id: number;
};

type Action =
  | { type: 'ADD_PACKAGE'; payload: PackageDetailsInterface }
  | { type: 'UPDATE_PACKAGE_STATUS'; payload: PayloadUpdatePackageStatus }
  | { type: 'UPDATE_PACKAGE_CURRENT_LOCATION'; payload: PayloadUpdateLocation };

type State = {
  packages: PackageDetailsInterface[];
};

const initialState: State = {
  packages: (() => {
    const storedPackages = window.localStorage.getItem('packages');
    return storedPackages ? (JSON.parse(storedPackages) as PackageDetailsInterface[]) : [];
  })(),
};

const packagesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PACKAGE': {
      const updatedPackages = [...state.packages, action.payload];
      window.localStorage.setItem('packages', JSON.stringify(updatedPackages));
      return { ...state, packages: updatedPackages };
    }
    case 'UPDATE_PACKAGE_CURRENT_LOCATION': {
      const findPackage = state.packages.find((packageDetails) => packageDetails.id === action.payload.id);

      if (findPackage) {
        const copyObj = { ...findPackage };
        copyObj['currentLocation'] = action.payload.location;

        const updatedPackages = state.packages.map((packageDetails) =>
          packageDetails.id === action.payload.id ? copyObj : packageDetails,
        );

        window.localStorage.setItem('packages', JSON.stringify(updatedPackages));

        return {
          ...state,
          packages: updatedPackages,
        };
      } else {
        return state;
      }
    }
    case 'UPDATE_PACKAGE_STATUS': {
      const findPackage = state.packages.find((packageDetails) => packageDetails.id === action.payload.id);

      if (findPackage) {
        const copyObj = { ...findPackage };
        copyObj['currentLocation'] = action.payload.location;
        copyObj['status'] = action.payload.status;

        const updatedPackages = state.packages.map((packageDetails) =>
          packageDetails.id === action.payload.id ? copyObj : packageDetails,
        );

        window.localStorage.setItem('packages', JSON.stringify(updatedPackages));

        return {
          ...state,
          packages: updatedPackages,
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

const PackageContext = createContext<
  | (State & {
      addPackage: (packageDetails: PackageDetailsInterface) => void;
      updatePackageLocation: (payload: PayloadUpdateLocation) => void;
      updatePackageStatus: (payload: PayloadUpdatePackageStatus) => void;
    })
  | null
>(null);

export const PackagesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(packagesReducer, initialState);
  console.log('state', state);

  // Action dispatchers
  const addPackage = (packageDetails: PackageDetailsInterface) =>
    dispatch({ type: 'ADD_PACKAGE', payload: packageDetails });
  const updatePackageLocation = (payload: PayloadUpdateLocation) =>
    dispatch({ type: 'UPDATE_PACKAGE_CURRENT_LOCATION', payload });
  const updatePackageStatus = (payload: PayloadUpdatePackageStatus) =>
    dispatch({ type: 'UPDATE_PACKAGE_STATUS', payload: payload });

  return (
    <PackageContext.Provider value={{ ...state, addPackage, updatePackageLocation, updatePackageStatus }}>
      {children}
    </PackageContext.Provider>
  );
};

// Custom Hook to use Shipment Context
export const usePackages = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('useShipments must be used within a ShipmentProvider');
  }
  return context;
};
