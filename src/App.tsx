import ListHeader from '@components/ListHeader';
import PackageDetails from '@components/package-details';

import { usePackages } from './components/PackagesContext';

export default function App() {
  const { packages } = usePackages();

  return (
    <div className="container mx-auto min-h-screen p-6">
      <ListHeader />

      <div className="space-y-6">
        {packages.length > 0 ? (
          packages.map((packageDetails) => <PackageDetails key={packageDetails.id} {...packageDetails} />)
        ) : (
          <p>Please add packages to show the list</p>
        )}
      </div>
    </div>
  );
}
