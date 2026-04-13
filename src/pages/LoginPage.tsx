import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/src/lib/supabase';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  React.useEffect(() => {
    async function checkExistingSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        const isAdminEmail = ['sactechcomputers@gmail.com', 'sheriffdeenalade@gmail.com'].includes(session.user.email || '');
        
        if (profile?.role === 'admin' || isAdminEmail) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    }
    checkExistingSession();
  }, [navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      if (isLogin) {
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;

        if (session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          // Fallback for the primary admin emails
          const isAdminEmail = ['sactechcomputers@gmail.com', 'sheriffdeenalade@gmail.com'].includes(session.user.email || '');
          
          if (profile?.role === 'admin' || isAdminEmail) {
            navigate('/admin');
            return;
          }
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        alert('Account created! Please check your email for confirmation.');
      }
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-secondary/5 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-secondary/60">
              {isLogin ? 'Access your WinnyRay portal' : 'Join Nigeria\'s premier service network'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  type="email" 
                  {...register('email')}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary/40">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  type="password" 
                  {...register('password')}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
                  Forgot Password?
                </button>
              </div>
            )}

            <button type="submit" className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2">
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-primary/10">
            <p className="text-center text-sm text-secondary/60 mb-6">Or continue with</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 py-3 border border-primary/10 rounded-xl hover:bg-secondary/5 transition-colors">
                <Chrome size={18} />
                <span className="text-sm font-bold">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 border border-primary/10 rounded-xl hover:bg-secondary/5 transition-colors">
                <Github size={18} />
                <span className="text-sm font-bold">GitHub</span>
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-secondary/60">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
