import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { BookingFormData } from "@/hooks/useBookingForm";
import { useTimeSlots } from "@/hooks/useTimeSlots";
import { Clock } from "lucide-react";

interface TimeSlotSelectorProps {
  control: Control<BookingFormData>;
  service: string;
  date: Date | undefined;
  onTimeChange?: (time: string) => void;
}

export const TimeSlotSelector = ({ 
  control, 
  service, 
  date, 
  onTimeChange 
}: TimeSlotSelectorProps) => {
  const { timeSlots, isLoading } = useTimeSlots(service, date);

  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-foreground font-semibold">
            Godzina wizyty
          </FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onTimeChange?.(value);
            }}
            defaultValue={field.value}
            disabled={!service || !date || isLoading}
          >
            <FormControl>
              <SelectTrigger className="border-border bg-background/50">
                <SelectValue
                  placeholder={
                    isLoading
                      ? "Ładowanie dostępnych godzin..."
                      : !service
                      ? "Najpierw wybierz usługę"
                      : !date
                      ? "Najpierw wybierz datę"
                      : timeSlots.length === 0
                      ? "Brak dostępnych terminów"
                      : "Wybierz godzinę"
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent
              className="z-[60] bg-background border-border shadow-lg max-h-[200px] overflow-y-auto"
              position="popper"
              side="bottom"
              align="start"
              sideOffset={4}
              avoidCollisions={true}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {slot}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};