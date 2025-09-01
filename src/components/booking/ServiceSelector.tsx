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
            Wybierz usługę
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="border-border bg-background/50">
                <SelectValue placeholder="Wybierz usługę, która Cię interesuje" />
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
                  BROW BAR
                </SelectLabel>
                <SelectItem value="laminacja-brwi-koloryzacja">
                  LAMINACJA BRWI • FARBKA • ODŻYWKA
                </SelectItem>
                <SelectItem value="laminacja-brwi">
                  LAMINACJA BRWI • ODŻYWKA
                </SelectItem>
                <SelectItem value="geometria-brwi-koloryzacja">
                  GEOMETRIA BRWI • FARBKA • ODŻYWKA
                </SelectItem>
                <SelectItem value="geometria-brwi">
                  GEOMETRIA BRWI • ODŻYWKA
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-primary font-semibold">
                  LASH BAR
                </SelectLabel>
                <SelectItem value="lifting-rzes-koloryzacja">
                  LIFTING RZĘS • FARBKA • ODŻYWKA
                </SelectItem>
                <SelectItem value="lifting-rzes">
                  LIFTING RZĘS • ODŻYWKA
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-primary font-semibold">
                  LASG & BROW BAR
                </SelectLabel>
                <SelectItem value="laminacja-brwi-rzes-koloryzacja">
                  PAKIET LAMINACJI • FARBKA • ODŻYWKA
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
