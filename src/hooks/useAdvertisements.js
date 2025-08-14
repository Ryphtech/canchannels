import { useState, useEffect } from 'react';
import { advertisementsService } from '../backend/advertisementsService';

export const useAdvertisements = (position = null) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (position) {
          data = await advertisementsService.fetchAdvertisementsByPosition(position);
        } else {
          data = await advertisementsService.fetchAdvertisements();
        }
        
        setAdvertisements(data);
      } catch (err) {
        console.error('Error fetching advertisements:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, [position]);

  return { advertisements, loading, error };
};
