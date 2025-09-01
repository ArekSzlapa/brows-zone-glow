import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { SERVICE_DURATIONS, BUSINESS_HOURS } from "@/constants/services";

export const useTimeSlots = (service: string, date: Date | undefined) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Generate fallback time slots when API is unavailable
   */
  const generateTimeSlots = (serviceDuration: number): string[] => {
    const slots: string[] = [];
    const { START_HOUR, END_HOUR, SLOT_INTERVAL } = BUSINESS_HOURS;

    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      for (let minute = 0; minute < 60; minute += SLOT_INTERVAL) {
        const startTime = new Date();
        startTime.setHours(hour, minute, 0, 0);

        const endTime = new Date(startTime.getTime() + serviceDuration * 60000);

        // Stop if end time exceeds business hours
        if (endTime.getHours() > END_HOUR) break;

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

  /**
   * Fetch available time slots from backend API
   */
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
      const serviceDuration = SERVICE_DURATIONS[service] || 120;
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
  };
};