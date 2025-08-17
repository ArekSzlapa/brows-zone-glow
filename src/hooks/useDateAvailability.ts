import { useState, useEffect } from 'react';
import axios from 'axios';

export const useDateAvailability = (service: string) => {
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!service) {
      setUnavailableDates(new Set());
      return;
    }

    const checkDateAvailability = async () => {
      setIsLoading(true);
      const unavailable = new Set<string>();

      // Check availability for the next 30 days
      const today = new Date();
      const endDate = new Date();
      endDate.setDate(today.getDate() + 30);

      const promises = [];
      for (let date = new Date(today); date <= endDate; date.setDate(date.getDate() + 1)) {
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) {
          unavailable.add(date.toDateString());
          continue;
        }

        // Skip past dates
        if (date < today) {
          unavailable.add(date.toDateString());
          continue;
        }

        const dateString = date.toISOString().split('T')[0];
        promises.push(
          axios.get(`/api/bookings/available-slots`, {
            params: { date: dateString, service }
          }).then(response => {
            if (!response.data?.availableSlots || response.data.availableSlots.length === 0) {
              unavailable.add(new Date(dateString).toDateString());
            }
          }).catch(() => {
            // If API fails, assume date is unavailable
            unavailable.add(new Date(dateString).toDateString());
          })
        );
      }

      await Promise.all(promises);
      setUnavailableDates(unavailable);
      setIsLoading(false);
    };

    checkDateAvailability();
  }, [service]);

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.has(date.toDateString());
  };

  return { isDateUnavailable, isLoading };
};