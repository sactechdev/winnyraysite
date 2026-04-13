import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, User, Mail, Phone, FileText, CheckCircle2, ArrowRight, Sparkles, Home } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';
import { useSearchParams } from 'react-router-dom';

import { useContent } from '@/src/lib/ContentContext';

const bookingSchema = z.object({
  clientName: z.string().min(2, "Please enter your full name"),
  clientEmail: z.string().email("Please enter a valid email"),
  clientPhone: z.string().min(10, "Please enter a valid phone number"),
  category: z.enum(['cleaning', 'real-estate']),
  serviceType: z.string().min(1, "Please select a service or enquiry type"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(1, "Please enter city"),
  instructions: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const { content, loading } = useContent();
  const [searchParams] = useSearchParams();

  const CLEANING_SERVICES = (content.services?.cleaning || []).map(s => s.title);
  const REAL_ESTATE_ENQUIRIES = (content.services?.real_estate || []).map(s => s.title);

  const initialCategory = (searchParams.get('category') as 'cleaning' | 'real-estate') || 'cleaning';
  const initialType = searchParams.get('type') || '';

  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      category: initialCategory,
      serviceType: initialType
    }
  });

  const selectedCategory = watch('category');

  if (loading) return <div className="pt-40 text-center">Loading...</div>;

  React.useEffect(() => {
    // Reset serviceType when category changes, unless it's the initial load with a valid type
    const currentType = watch('serviceType');
    const validServices = selectedCategory === 'cleaning' ? CLEANING_SERVICES : REAL_ESTATE_ENQUIRIES;
    if (currentType && !validServices.includes(currentType)) {
      setValue('serviceType', '');
    }
  }, [selectedCategory, setValue, watch]);

  const nextStep = async () => {
    let fields: (keyof BookingFormValues)[] = [];
    if (step === 1) fields = ['clientName', 'clientEmail', 'clientPhone'];
    if (step === 2) fields = ['category', 'serviceType', 'address', 'city'];
    
    const isValid = await trigger(fields);
    if (isValid) setStep(step + 1);
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([{
          client_name: data.clientName,
          client_email: data.clientEmail,
          client_phone: data.clientPhone,
          service_type: `${data.category}: ${data.serviceType}`,
          address: data.address,
          city: data.city,
          instructions: data.instructions,
          status: 'pending'
        }]);

      if (error) throw error;
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error saving booking:', err);
      alert(`Submission Error: ${err.message || 'Please check your connection and try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-secondary/5">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Request a <span className="text-primary italic">Free Quote</span></h1>
          <p className="text-secondary/60">Professional services and expert property guidance in Kano.</p>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="flex justify-between mb-12 relative max-w-md mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={cn(
                  "relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                  step >= s ? "bg-primary text-white shadow-lg" : "bg-white text-secondary/30 border border-primary/10"
                )}
              >
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
            ))}
          </div>
        )}

        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl">
          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} className="text-primary" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">Request Submitted!</h2>
              <p className="text-secondary/60 mb-12 max-w-md mx-auto">
                Thank you for your interest. We've received your request. Our team in Kano will contact you shortly to discuss the details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => window.location.href = '/'} className="btn-primary">Return Home</button>
                <button onClick={() => window.location.href = selectedCategory === 'cleaning' ? '/cleaning' : '/real-estate'} className="btn-outline">
                  View {selectedCategory === 'cleaning' ? 'Services' : 'Real Estate'}
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-display font-bold mb-8 flex items-center">
                    <User className="mr-3 text-primary" />
                    Client Details
                  </h2>
                  <div className="space-y-6 mb-12">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <input {...register('clientName')} type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
                      </div>
                      {errors.clientName && <p className="text-red-500 text-xs">{errors.clientName.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                          <input {...register('clientEmail')} type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
                        </div>
                        {errors.clientEmail && <p className="text-red-500 text-xs">{errors.clientEmail.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                          <input {...register('clientPhone')} type="tel" placeholder="+234..." className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
                        </div>
                        {errors.clientPhone && <p className="text-red-500 text-xs">{errors.clientPhone.message}</p>}
                      </div>
                    </div>
                  </div>
                  <button onClick={nextStep} className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-2">
                    <span>Continue to Service</span>
                    <ArrowRight size={20} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-display font-bold mb-8 flex items-center">
                    <MapPin className="mr-3 text-primary" />
                    Service & Location
                  </h2>
                  <div className="space-y-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Category</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button 
                            type="button"
                            onClick={() => setValue('category', 'cleaning')}
                            className={cn(
                              "flex items-center justify-center space-x-2 p-4 rounded-xl border transition-all",
                              selectedCategory === 'cleaning' ? "bg-primary text-white border-primary" : "bg-white text-secondary/60 border-primary/10 hover:border-primary/30"
                            )}
                          >
                            <Sparkles size={18} />
                            <span className="font-bold text-sm">Cleaning</span>
                          </button>
                          <button 
                            type="button"
                            onClick={() => setValue('category', 'real-estate')}
                            className={cn(
                              "flex items-center justify-center space-x-2 p-4 rounded-xl border transition-all",
                              selectedCategory === 'real-estate' ? "bg-primary text-white border-primary" : "bg-white text-secondary/60 border-primary/10 hover:border-primary/30"
                            )}
                          >
                            <Home size={18} />
                            <span className="font-bold text-sm">Real Estate</span>
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">
                          {selectedCategory === 'cleaning' ? 'Service Type' : 'Enquiry Type'}
                        </label>
                        <select {...register('serviceType')} className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50">
                          <option value="">Select an option</option>
                          {(selectedCategory === 'cleaning' ? CLEANING_SERVICES : REAL_ESTATE_ENQUIRIES).map((item) => (
                            <option key={item} value={item}>{item}</option>
                          ))}
                        </select>
                        {errors.serviceType && <p className="text-red-500 text-xs">{errors.serviceType.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Location / Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-primary/40" size={18} />
                        <textarea {...register('address')} placeholder="Street address in Kano..." className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 h-32"></textarea>
                      </div>
                      {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">City / Area</label>
                      <input {...register('city')} type="text" placeholder="e.g. Nassarawa, Kano" className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50" />
                      {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 btn-outline py-4">Back</button>
                    <button onClick={nextStep} className="flex-[2] btn-primary py-4 text-lg flex items-center justify-center space-x-2">
                      <span>Continue to Instructions</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-display font-bold mb-8 flex items-center">
                    <FileText className="mr-3 text-primary" />
                    Specific Instructions
                  </h2>
                  <div className="space-y-6 mb-12">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Special Notes or Instructions</label>
                      <textarea {...register('instructions')} placeholder="Tell us more about your requirements..." className="w-full p-4 bg-white border border-primary/10 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 h-48"></textarea>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <p className="text-sm text-secondary/60 italic">
                        Note: This is a request for a free quote or enquiry session. Our team will review your details and contact you via phone or email with a customized response.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="flex-1 btn-outline py-4">Back</button>
                    <button 
                      onClick={handleSubmit(onSubmit)} 
                      disabled={isSubmitting}
                      className="flex-[2] btn-primary py-4 text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <CheckCircle2 size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
