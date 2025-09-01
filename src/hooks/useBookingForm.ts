import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import axios from "axios";
import { SERVICE_DURATIONS } from "@/constants/services";

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
    const bookingDate = format(values.date, "dd/MM/yyyy");
    const bookingTime = values.time;
    const serviceDuration = SERVICE_DURATIONS[values.service] || 120;

    const payload = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      service: values.service,
      date: bookingDate,
      time: bookingTime,
      serviceDuration,
    };

    try {
      await axios.post("/api/send-mail", payload).then((response) => {
        if (response.status === 200) {
          axios.post("/api/bookings", payload);
        }
      });

      toast({
        title: "Formularz wysłany!",
        description: "Wizyta została zarezerwowana.",
      });

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
