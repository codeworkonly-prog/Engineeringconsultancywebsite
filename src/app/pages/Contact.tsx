import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export function Contact() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+977[-\s]?)?[9][6-9]\d{8}$/;

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Invalid Email Format";
        break;

      case "phone":
        if (value && !phoneRegex.test(value)) {
          error = "Invalid Phone Number";
        }
        break;

      case "message":
        if (!value.trim()) error = "Message is required";
        break;
    }

    return error;
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    emailRegex.test(formData.email) &&
    formData.message.trim() &&
    (!formData.phone || phoneRegex.test(formData.phone));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fix form errors before submitting");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      const whatsappMessage = `
Hello Diksha Consulting,

I would like to contact you regarding:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
      `;

      const whatsappURL = `https://wa.me/9779841707077?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      window.open(whatsappURL, "_blank");

      toast.success("Redirecting to WhatsApp...");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setErrors({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  return (
   <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-brand-50 max-w-3xl">
            Get in touch with us for any inquiries or project consultations
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT INFO */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Our team is ready to assist you with your engineering
                and project management needs.
              </p>
              <div className="space-y-6">

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-brand-600" />
                      </div>
                    <div>
                        <h3 className="font-semibold mb-1">Office Address</h3>
                      <p className="text-gray-600">
                          Ghattekulo-32, Kathmandu<br />
                          Nepal
                      </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-brand-600" />
                      </div>
                    <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:consultingdiksha@gmail.com"
                          className="text-brand-600 hover:underline"
                        >
                        consultingdiksha@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-brand-600" />
                      </div>
                    <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-gray-600"><a href="tel:+977-9841707077" className="text-brand-600 hover:underline">
                          +977-9841707077
                        </a></p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-brand-600" />
                      </div>
                    <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Sunday - Friday: 10:00 AM - 5:00 PM<br />
                        Saturday: Closed
                      </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* RIGHT FORM */}
            <div>
              <Card className="relative overflow-hidden rounded-3xl border-0 shadow-2xl bg-white">
                <CardHeader className="px-8 pt-8 pb-4">
                  <CardTitle className="text-3xl font-bold text-gray-900">
                    Send Us a Message
                  </CardTitle>

                  <p className="text-gray-500 mt-2 leading-relaxed">
                    Contact us instantly via WhatsApp — we usually respond within 24 hours.
                  </p>

                  {/* subtle divider instead of heavy gradient */}
                  <div className="mt-5 h-px bg-gray-100" />
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Full Name *
                        </Label>

                        <Input
                          name="name"
                          placeholder="e.g. Ram Bahadur Thapa"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-2 h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-brand-500 transition"
                        />

                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Phone
                        </Label>

                        <Input
                          name="phone"
                          placeholder="+977 98XXXXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-brand-500 transition"
                        />

                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Email *
                      </Label>

                      <Input
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-brand-500 transition"
                      />

                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Subject
                      </Label>

                      <Input
                        name="subject"
                        placeholder="e.g. Project consultation, quotation, etc."
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-2 h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-brand-500 transition"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Message *
                      </Label>

                      <Textarea
                        name="message"
                        placeholder="Write your message here..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-2 rounded-2xl bg-gray-50 border-gray-200 focus:bg-white focus:border-brand-500 focus:ring-brand-500 transition resize-none"
                      />

                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={!isFormValid || loading}
                      className={`w-full h-12 rounded-xl font-semibold text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2
    ${isFormValid && !loading
                          ? "bg-green-500 hover:bg-green-600 hover:shadow-lg active:scale-[0.98]"
                          : "bg-brand-600 hover:bg-brand-700 opacity-80 cursor-not-allowed"
                        }`}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              opacity="0.25"
                            />
                            <path
                              d="M4 12a8 8 0 018-8"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4" />
                          Send via WhatsApp
                        </>
                      )}
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}