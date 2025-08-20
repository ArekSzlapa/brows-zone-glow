import { useState } from "react";
import { HeroButton } from "@/components/ui/hero-button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBookingForm } from "@/hooks/useBookingForm";
import { ServiceSelector } from "./ServiceSelector";
import { TimeSlotSelector } from "./TimeSlotSelector";

export const BookingForm = () => {
  const { form, onSubmit, isSubmitting } = useBookingForm();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Watch form values for conditional rendering
  const watchedService = form.watch("service");
  const watchedDate = form.watch("date");

  // Filter to allow only Monday-Friday
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5; // 1 = Monday, 5 = Friday
  };

  return (
    <div className="max-w-2xl mx-auto" style={{ minHeight: "500px" }}>
      <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel className="text-foreground/80 font-semibold">
                        Imię i nazwisko
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Wprowadź swoje imię i nazwisko"
                          {...field}
                          className="border-border bg-background/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel className="text-foreground/80 font-semibold">
                        Numer telefonu
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+48 xxx xxx xxx"
                          type="tel"
                          {...field}
                          className="border-border bg-background/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-foreground/80 font-semibold">
                      Adres email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="TwojMail@brwi.pl"
                        type="email"
                        {...field}
                        className="border-border bg-background/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ServiceSelector control={form.control} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-foreground/80 font-semibold">
                        Data wizyty
                      </FormLabel>
                      <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal border-border bg-background/50",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Wybierz datę</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsCalendarOpen(false);
                              // Reset time when date changes
                              form.setValue("time", "");
                            }}
                            disabled={(date) =>
                              !isWeekday(date) || date < new Date()
                            }
                            initialFocus
                            weekStartsOn={1}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <TimeSlotSelector
                  control={form.control}
                  service={watchedService}
                  date={watchedDate}
                />
              </div>

              <div className="space-y-4">
                <p className="text-sm text-foreground/60 text-center">
                  Klikając "Umów wizytę" wyrażasz zgodę na{" "}
                  <a 
                    href="/privacy-policy" 
                    target="_blank"
                    className="text-primary hover:underline font-medium"
                  >
                    przetwarzanie danych osobowych
                  </a>
                  {" "}zgodnie z naszą polityką prywatności.
                </p>
                
                <HeroButton
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Wysyłanie..." : "Umów wizytę"}
                </HeroButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};