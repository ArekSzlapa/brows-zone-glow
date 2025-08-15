import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import axios from "axios";

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

export type BookingFormData = z.infer<typeof formSchema>;

const serviceDurations: Record<string, number> = {
  "laminacja-brwi": 120,
  "laminacja-brwi-koloryzacja": 120,
  "geometria-brwi-koloryzacja": 120,
  "lifting-rzes": 90,
  "lifting-rzes-koloryzacja": 90,
  "laminacja-brwi-rzes": 120,
  "laminacja-brwi-rzes-koloryzacja": 120,
};

export const useBookingForm = () => {
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
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

  const onSubmit = async (values: BookingFormData) => {
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
      const bookingDetails = `
📅 Data wizyty: ${bookingDate}
⏰ Godzina: ${bookingTime}
💅 Usługa: ${values.service}
⏱️ Czas trwania: ${serviceDuration} minut
📱 Telefon: ${values.phone}
📧 Email: ${values.email || "Nie podano"}
      `;

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

      await axios.post("/api/bookings", {
        ...templateParams,
        booking_date: values.date,
      });

      toast({
        title: "Formularz wysłany!",
        description: "Wizyta została zarezerwowana.",
      });

      // Reset form
      form.reset({
        name: "",
        phone: "",
        service: "",
        email: "",
        date: undefined,
        time: "",
      });

      return true;
    } catch (error) {
      console.error("Error sending booking:", error);
      toast({
        title: "Błąd wysyłania",
        description: "Spróbuj ponownie lub skontaktuj się telefonicznie.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
};
