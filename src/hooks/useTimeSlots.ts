import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

// Service duration mapping in minutes
const serviceDurations: Record<string, number> = {
  "laminacja-brwi": 120,
  "laminacja-brwi-koloryzacja": 120,
  "geometria-brwi-koloryzacja": 120,
  "lifting-rzes": 90,
  "lifting-rzes-koloryzacja": 90,
  "laminacja-brwi-rzes": 120,
  "laminacja-brwi-rzes-koloryzacja": 120,
};

export const useTimeSlots = (service: string, date: Date | undefined) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate fallback time slots
  const generateTimeSlots = (serviceDuration: number): string[] => {
    const slots: string[] = [];
    const startHour = 8; // 8:00 AM
    const endHour = 18; // 6:00 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += serviceDuration) {
        const startTime = new Date();
        startTime.setHours(hour, minute, 0, 0);

        const endTime = new Date(startTime.getTime() + serviceDuration * 60000);

        // Stop if end time exceeds business hours
        if (endTime.getHours() > endHour) break;

        const formatTime = (date: Date) =>
          date.toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

        slots.push(`${formatTime(startTime)} - ${formatTime(endTime)}`);
      }
    }
    return slots;
  };

  // Fetch available time slots from backend
  const fetchAvailableTimeSlots = async (date: Date, service: string) => {
    setIsLoading(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await axios.get(
        `/api/bookings/available-slots?date=${formattedDate}&service=${service}`
      );
      setTimeSlots(response.data.availableSlots || []);
    } catch (error) {
      console.error("Error fetching available time slots:", error);
      // Fallback to generated time slots if API fails
      const serviceDuration = serviceDurations[service] || 120;
      setTimeSlots(generateTimeSlots(serviceDuration));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch availability when both service and date are selected
  useEffect(() => {
    if (service && date) {
      fetchAvailableTimeSlots(date, service);
    } else {
      setTimeSlots([]);
    }
  }, [service, date]);

  return {
    timeSlots,
    isLoading,
    serviceDurations,
  };
};