import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const bookingSchema = z.object({
  serviceType: z.string().min(1, "Please select a service"),
  frequency: z.string().min(1, "Please select frequency"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(1, "Please enter city"),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const [step, setStep] = React.useState(1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      frequency: 'one-time',
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log(data);
    setStep(3); // Success step
  };

  const serviceType = watch('serviceType');
  const frequency = watch('frequency');

  return (
    <div className="pt-20 min-h-screen bg-secondary/5">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Book Your <span className="text-primary italic">Service</span></h1>
          <p className="text-secondary/60">Complete the form below to schedule your professional cleaning.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
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

        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-display font-bold mb-8">Service Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-secondary/60">Service Category</label>
                  <select {...register('serviceType')} className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none">
                    <option value="">Select a service</option>
                    <option value="standard">Standard Residential</option>
                    <option value="deep">Deep Cleaning</option>
                    <option value="commercial">Commercial/Office</option>
                    <option value="post-construction">Post-Construction</option>
                  </select>
                  {errors.serviceType && <p className="text-red-500 text-xs">{errors.serviceType.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-secondary/60">Frequency</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['one-time', 'weekly', 'bi-weekly', 'monthly'].map((f) => (
                      <label key={f} className={cn(
                        "p-3 text-center rounded-xl border cursor-pointer transition-all text-sm font-medium capitalize",
                        frequency === f ? "bg-primary text-white border-primary" : "bg-white border-primary/10 text-secondary/60 hover:border-primary/30"
                      )}>
                        <input type="radio" value={f} {...register('frequency')} className="hidden" />
                        {f.replace('-', ' ')}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-secondary/60">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input type="date" {...register('date')} className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" />
                  </div>
                  {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-secondary/60">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <select {...register('time')} className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none">
                      <option value="">Select time</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                    </select>
                  </div>
                  {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
                </div>
              </div>

              <button onClick={() => setStep(2)} className="btn-primary w-full py-4 text-lg">
                Continue to Address
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-display font-bold mb-8">Location & Payment</h2>
              <div className="space-y-6 mb-12">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-secondary/60">Service Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-primary" size={18} />
                    <textarea 
                      {...register('address')} 
                      placeholder="Street address, apartment, suite, etc."
                      className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none h-32"
                    ></textarea>
                  </div>
                  {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-secondary/60">City</label>
                    <input type="text" {...register('city')} className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" />
                    {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-secondary/60">Special Notes</label>
                    <input type="text" {...register('notes')} placeholder="Any specific instructions?" className="w-full p-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 btn-outline py-4">Back</button>
                <button onClick={handleSubmit(onSubmit)} className="flex-[2] btn-primary py-4 text-lg flex items-center justify-center space-x-2">
                  <CreditCard size={20} />
                  <span>Pay with Paystack</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} className="text-primary" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">Booking Confirmed!</h2>
              <p className="text-secondary/60 mb-12 max-w-md mx-auto">
                Thank you for choosing WinnyRay. We've received your booking and a confirmation email has been sent to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => window.location.href = '/dashboard'} className="btn-primary">View Dashboard</button>
                <button onClick={() => window.location.href = '/'} className="btn-outline">Return Home</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
