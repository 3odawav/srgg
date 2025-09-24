'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';


const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

type FormValues = z.infer<typeof FormSchema>;

export function NewLeadForm() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
        const message = `${t.leadMessageName}: ${data.name}\n${t.leadMessageEmail}: ${data.email}\n${t.leadMessagePhone}: ${data.phone}`;
        const whatsappUrl = `https://wa.me/201099993903?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        
        form.reset();
        
        toast({
            title: t.toastSuccessTitle,
            description: t.toastSuccessDescription,
        });
        
    } catch (error) {
        toast({
            variant: "destructive",
            title: t.toastErrorTitle,
            description: t.toastErrorDescription,
        });
    }
  };

  return (
    <section id="new-lead-form" className="py-12 md:py-16 bg-transparent">
        <div className="max-w-md mx-auto px-6">
            <Card className="bg-card/95 backdrop-blur-sm border border-border/50 shadow-2xl shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/30">
                <CardHeader className="p-0">
                    <div className="relative h-56 w-full">
                        <Image
                            src="https://i.ibb.co/0RS3Dvhd/f23dfca5-21bc-4bf8-a561-1f012c3e7582.png"
                            alt="SIGHTeg Lead Form"
                            fill
                            sizes="100vw"
                            className="object-cover rounded-t-lg"
                        />
                         <div className="absolute inset-0 rounded-t-lg border-t-2 border-x-2 border-primary/30"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className='text-center mb-6'>
                        <CardTitle className="text-card-foreground font-antonio text-2xl">{t.leadFormTitle}</CardTitle>
                        <CardDescription className="font-body">{t.leadFormDescription}</CardDescription>
                    </div>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-antonio">{t.formLabelName}</FormLabel>
                            <FormControl>
                                <Input placeholder={t.formPlaceholderName} {...field} />
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
                            <FormLabel className="font-antonio">{t.formLabelEmail}</FormLabel>
                            <FormControl>
                                <Input placeholder={t.formPlaceholderEmail} {...field} />
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
                            <FormLabel className="font-antonio">{t.formLabelPhone}</FormLabel>
                            <FormControl>
                                <Input placeholder={t.formPlaceholderPhone} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full font-antonio text-lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? t.formButtonSubmitting : t.formButtonSubmit}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </section>
  );
}
