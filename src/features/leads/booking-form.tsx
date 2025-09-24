
'use client';

import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  propertyTitle: string;
  propertyImage: string;
  children: React.ReactNode;
}

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

type FormValues = z.infer<typeof FormSchema>;

export function BookingForm({ propertyTitle, propertyImage, children }: BookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const message = `${t.bookingMessageIntro} "${propertyTitle}".\n${t.bookingMessageDetails}:\n${t.formLabelName}: ${data.name}\n${t.formLabelEmail}: ${data.email}\n${t.formLabelPhone}: ${data.phone}`;
      const whatsappUrl = `https://wa.me/201099993903?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      
      setIsOpen(false);
      form.reset();

    } catch (error) {
        toast({
            variant: "destructive",
            title: t.toastErrorTitle,
            description: t.toastErrorDescription,
        });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative">
            <Image 
                src={propertyImage}
                alt={propertyTitle}
                fill
                className="object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10" />
            <div className="relative z-20 p-6 sm:p-8 text-white">
                <DialogHeader className="text-left">
                    <DialogTitle className="font-antonio text-2xl text-primary">
                        {t.bookingFormTitle}
                    </DialogTitle>
                    <p className="font-antonio text-lg text-white/90">{propertyTitle}</p>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-antonio text-white/80">{t.formLabelName}</FormLabel>
                        <FormControl>
                            <Input placeholder={t.formPlaceholderName} {...field} className="bg-white/10 text-white border-white/20 focus:bg-white/20 focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-antonio text-white/80">{t.formLabelEmail}</FormLabel>
                        <FormControl>
                            <Input placeholder={t.formPlaceholderEmail} {...field} className="bg-white/10 text-white border-white/20 focus:bg-white/20 focus:ring-primary" />
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
                        <FormLabel className="font-antonio text-white/80">{t.formLabelPhone}</FormLabel>
                        <FormControl>
                            <Input placeholder={t.formPlaceholderPhone} {...field} className="bg-white/10 text-white border-white/20 focus:bg-white/20 focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <DialogFooter className="pt-4">
                    <Button type="submit" className="w-full font-antonio text-lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? t.formButtonSubmitting : t.bookingButtonProceed}
                    </Button>
                    </DialogFooter>
                </form>
                </Form>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
