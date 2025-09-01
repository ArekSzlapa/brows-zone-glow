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
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { BookingFormData } from "@/hooks/useBookingForm";

interface ServiceSelectorProps {
  control: Control<BookingFormData>;
}

export const ServiceSelector = ({ control }: ServiceSelectorProps) => {
  return (
    <FormField
      control={control}
      name="service"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-foreground/80 font-semibold">
            Select Service
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="border-border bg-background/50">
                <SelectValue placeholder="Choose the service that interests you" />
              </SelectTrigger>
            </FormControl>
            <SelectContent
              className="z-50 bg-background border-border shadow-lg overflow-hidden"
              position="popper"
              side="bottom"
              align="start"
              sideOffset={4}
              avoidCollisions={true}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <SelectGroup>
                <SelectLabel className="text-primary font-semibold">
                  Brow Bar
                </SelectLabel>
                <SelectItem value="laminacja-brwi">Eyebrow Lamination</SelectItem>
                <SelectItem value="laminacja-brwi-koloryzacja">
                  Eyebrow Lamination with Tinting
                </SelectItem>
                <SelectItem value="geometria-brwi-koloryzacja">
                  Eyebrow Shaping with Tinting
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-primary font-semibold">
                  Lash Bar
                </SelectLabel>
                <SelectItem value="lifting-rzes">Lash Lift</SelectItem>
                <SelectItem value="lifting-rzes-koloryzacja">
                  Lash Lift with Tinting
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-primary font-semibold">
                  Brow & Lash
                </SelectLabel>
                <SelectItem value="laminacja-brwi-rzes">
                  Eyebrow & Lash Lamination
                </SelectItem>
                <SelectItem value="laminacja-brwi-rzes-koloryzacja">
                  Eyebrow & Lash Lamination with Tinting
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
