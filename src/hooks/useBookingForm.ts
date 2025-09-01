import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import axios from "axios";
import { SERVICE_DURATIONS } from "@/constants/services";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(9, "Phone number is required"),
  service: z.string().min(1, "Please select a service"),
  email: z.string().optional(),
  date: z.date({
    required_error: "Please select an appointment date",
  }),
  time: z.string().min(1, "Please select an appointment time"),
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
        title: "Form submitted successfully!",
        description: "Your appointment has been booked.",
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
        title: "Submission error",
        description: "Please try again or contact us by phone.",
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
