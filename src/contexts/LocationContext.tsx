import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import { createContext, useContext } from "react";

interface LocationProps {
  ip: string | null | undefined;
  city: {
    name: string | null | undefined;
    postalCode: string | null | undefined;
  };
  country: {
    name: string | null | undefined;
  };
}

export const LocationContext = createContext<LocationProps | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationProps | null>();

  const getLocation = useCallback(async () => {
    try {
      const response = await fetch(
        "https://solid-geolocation.vercel.app/location",
      );
      const location = await response.json();
      const { ip, city, country } = location;
      setLocation({
        ip,
        city: { name: city.name, postalCode: city.postalCode },
        country: { name: country.name },
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const values = {
    ip: location?.ip,
    city: { name: location?.city.name, postalCode: location?.city.postalCode },
    country: { name: location?.country.name },
  };

  return <LocationContext value={values}>{children}</LocationContext>;
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("El contexto debe ser usado dentro del provider");
  return ctx;
};
