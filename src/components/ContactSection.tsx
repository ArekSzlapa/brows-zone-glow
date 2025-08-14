import { HeroButton } from "@/components/ui/hero-button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import "./mediaQueryStyles.css";

const formSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
  phone: z.string().min(9, "Numer telefonu jest wymagany"),
  service: z.string().min(1, "Wybierz usługę"),
  email: z.string().optional(),
  date: z.date({
    required_error: "Wybierz datę wizyty",
  }),
  time: z.string().min(1, "Wybierz godzinę wizyty"),
});

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

const ContactSection = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      email: "",
      date: undefined,
      time: "",
    },
  });

  // Helper function to generate time slots
  const generateTimeSlots = (serviceDuration: number): string[] => {
    const slots: string[] = [];
    const startHour = 8; // 8:00 AM
    const endHour = 18; // 6:00 PM
    const slotDuration = serviceDuration; // Duration in minutes
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const startTime = new Date();
        startTime.setHours(hour, minute, 0, 0);
        
        const endTime = new Date(startTime.getTime() + slotDuration * 60000);
        
        // Stop if end time exceeds business hours
        if (endTime.getHours() > endHour) break;
        
        const formatTime = (date: Date) => 
          date.toLocaleTimeString('pl-PL', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          });
        
        slots.push(`${formatTime(startTime)} - ${formatTime(endTime)}`);
      }
    }
    return slots;
  };

  // Filter to allow only Monday-Friday
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5; // 1 = Monday, 5 = Friday
  };

  const selectedService = form.watch("service");
  const serviceDuration = selectedService ? serviceDurations[selectedService] || 120 : 120;
  const timeSlots = generateTimeSlots(serviceDuration);

  const callNumber = () => {
    window.location.href = "tel:+48516170052";
  };

  const openIG = () => {
    window.open(
      "https://instagram.com/direct/inbox/?recipient=szlapa.brows",
      "_blank"
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;
    
    // Format booking date and time
    const bookingDate = format(values.date, "dd/MM/yyyy");
    const bookingTime = values.time;
    const serviceDuration = serviceDurations[values.service] || 120;

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const sendNotification = async () => {
        try {
          const response = await emailjs.send(
            serviceId,
            "template_btecl8r",
            notificationParams,
            publicKey
          );
          console.log("Notification sent!", response.status, response.text);
        } catch (err) {
          console.error("Error sending notification:", err);
        }
      };

      const bookingDetails = `
📅 Data wizyty: ${bookingDate}
⏰ Godzina: ${bookingTime}
💅 Usługa: ${values.service}
⏱️ Czas trwania: ${serviceDuration} minut
📱 Telefon: ${values.phone}
📧 Email: ${values.email || "Nie podano"}
      `;

      const notificationParams = {
        from_name: values.name,
        from_email: values.email,
        phone: values.phone,
        booking_date: bookingDate,
        booking_time: bookingTime,
        service: values.service,
        duration: serviceDuration,
        reservation_date: formattedDateTime,
        message: `Nowa rezerwacja od ${values.name}${bookingDetails}`,
      };

      const templateParams = {
        from_name: values.name,
        from_phone: values.phone,
        selected_service: values.service,
        booking_date: bookingDate,
        booking_time: bookingTime,
        service_duration: serviceDuration,
        customer_email: values.email,
        from_email: "asbrows.zone@gmail.com",
        message: `Nowa rezerwacja od ${values.name}${bookingDetails}`,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      await sendNotification();

      toast({
        title: "Formularz wysłany!",
        description: "Skontaktujemy się z Tobą wkrótce.",
      });
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Błąd wysyłania",
        description: "Spróbuj ponownie lub skontaktuj się telefonicznie.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="mx-auto px-6 mediaSmall">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground" style={{ wordBreak: "keep-all" }}>
              Porozmawiajmy o{" "}
            </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent smallBlock">
              Twoich brwiach
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gotowa na metamorfozę swoich brwi? Umów się na wizytę już dziś lub
            skontaktuj się z nami, aby dowiedzieć się więcej o naszych usługach
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Card
              className="border-0 shadow-soft bg-card/80 backdrop-blur-sm"
              style={{ width: "98%" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 small-flex ">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div style={{ width: "100%" }}>
                    <h3 className="font-semibold text-foreground mb-1">
                      Lokalizacja
                    </h3>
                    <p className="text-muted-foreground">
                      Czaniec, ul. Cisowa 3, 43-354
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-soft bg-card/80 backdrop-blur-sm"
              style={{ width: "98%" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 small-flex ">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div style={{ width: "100%" }}>
                    <h3 className="font-semibold text-foreground mb-1">
                      Telefon
                    </h3>
                    <p className="text-muted-foreground">+48 516 170 052</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-soft bg-card/80 backdrop-blur-sm"
              style={{ width: "98%" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 small-flex ">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div style={{ width: "100%" }}>
                    <h3 className="font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <p className="text-muted-foreground">
                      asbrows.zone@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col justify-center">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-border/30">
              <h3
                className="text-2xl font-bold text-foreground mb-4"
                style={{ wordBreak: "break-word" }}
              >
                Gotowa na perfekcyjne brwi?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Umów wizyte i przekonaj się sama, dlaczego klientki wybrały
                Brows•Zone w kwestii stylizacji brwi. Nowe klientki otrzymują
                10% zniżki na wszystkie usługi!
              </p>

              <div className="space-y-4">
                <HeroButton
                  onClick={() => openIG()}
                  size="lg"
                  className="w-full text-lg py-4 smallText"
                >
                  10% Zniżki na pierwszą wizyte
                </HeroButton>
                <HeroButton
                  onClick={() => callNumber()}
                  variant="outline"
                  size="lg"
                  className="w-full text-lg py-4 smallText"
                >
                  Zadzwoń: +48 516 170 052
                </HeroButton>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-sm text-muted-foreground text-center">
                  Śledź mnie w mediach społecznościowych, aby otrzymywać porady
                  urodowe oraz wyjątkowe oferty!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-20" id="form">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-foreground">Umów się na </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                wizytę
              </span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin
            </p>
          </div>

          <div className="max-w-2xl mx-auto" style={{ minHeight: "500px" }}>
            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">
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
                            <FormLabel className="text-foreground font-semibold">
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
                          <FormLabel className="text-foreground font-semibold">
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

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold">
                            Wybierz usługę
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-border bg-background/50">
                                <SelectValue placeholder="Wybierz usługę, która Cię interesuje" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent
                              className="z-50 bg-background border-border shadow-lg max-h-[300px] overflow-y-auto"
                              position="popper"
                              sideOffset={4}
                              avoidCollisions={false}
                              sticky="partial"
                            >
                              <SelectGroup>
                                <SelectLabel className="text-primary font-semibold">
                                  Brow Bar
                                </SelectLabel>
                                <SelectItem value="laminacja-brwi">
                                  Laminacja brwi
                                </SelectItem>
                                <SelectItem value="laminacja-brwi-koloryzacja">
                                  Laminacja brwi z koloryzacją
                                </SelectItem>
                                <SelectItem value="geometria-brwi-koloryzacja">
                                  Geometria brwi z koloryzacją
                                </SelectItem>
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="text-primary font-semibold">
                                  Lash Bar
                                </SelectLabel>
                                <SelectItem value="lifting-rzes">
                                  Lifting rzęs
                                </SelectItem>
                                <SelectItem value="lifting-rzes-koloryzacja">
                                  Lifting rzęs z koloryzacją
                                </SelectItem>
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel className="text-primary font-semibold">
                                  Brow & Lash
                                </SelectLabel>
                                <SelectItem value="laminacja-brwi-rzes">
                                  Laminacja brwi i rzęs
                                </SelectItem>
                                <SelectItem value="laminacja-brwi-rzes-koloryzacja">
                                  Laminacja brwi i rzęs z koloryzacją
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-foreground font-semibold">
                              Data wizyty
                            </FormLabel>
                            <Popover>
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
                                  onSelect={field.onChange}
                                  disabled={(date) => !isWeekday(date) || date < new Date()}
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-semibold">
                              Godzina wizyty
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!selectedService}
                            >
                              <FormControl>
                                <SelectTrigger className="border-border bg-background/50">
                                  <SelectValue placeholder={selectedService ? "Wybierz godzinę" : "Najpierw wybierz usługę"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent
                                className="z-50 bg-background border-border shadow-lg max-h-[300px] overflow-y-auto"
                                position="popper"
                                sideOffset={4}
                                avoidCollisions={false}
                                sticky="partial"
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
                    </div>

                    <HeroButton
                      type="submit"
                      size="lg"
                      className="w-full text-lg py-4"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Wysyłanie..."
                        : "Umów wizytę"}
                    </HeroButton>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
