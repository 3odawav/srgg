'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingForm } from '@/features/leads/booking-form';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

const properties = [
    { 
        id: 10,
        type: 'sale',
        titleKey: 'propTitle10',
        price: 'Contact for price',
        image: 'https://i.ibb.co/99MV2rn0/10.png',
        hint: 'modern amenities new alamein',
        detailsKeys: ['prop10Detail1', 'prop10Detail2', 'prop10Detail3', 'prop10Detail4'],
        featured: false,
    },
    { 
        id: 3, 
        type: 'sale', 
        titleKey: 'propTitle3', 
        price: '35,760,000 LE', 
        image: 'https://i.ibb.co/BV0R1bVh/Whisk-ff8a25183e6593f8e80440e1f16936f5dr.jpg', 
        hint: 'luxury towers',
        detailsKeys: ['prop3Detail1', 'prop3Detail2', 'prop3Detail3', 'prop3Detail4', 'prop3Detail5', 'prop3Detail6', 'prop3Detail7', 'prop3Detail8'],
        featured: false,
    },
    { 
        id: 4, 
        type: 'sale', 
        titleKey: 'propTitle4', 
        price: '9,187,000 LE', 
        image: 'https://i.ibb.co/Hfb5yLB7/Whisk-b1b928524b38ce0bb1c4c42721665c96dr.jpg', 
        hint: 'seaside residence',
        detailsKeys: ['prop4Detail1', 'prop4Detail2', 'prop4Detail3', 'prop4Detail4', 'prop4Detail5', 'prop4Detail6', 'prop4Detail7', 'prop4Detail8'],
        featured: false,
    },
    { 
        id: 8, 
        type: 'sale', 
        titleKey: 'propTitle8', 
        price: 'Contact for price', 
        image: 'https://i.ibb.co/vxbVjcM0/7.png', 
        hint: 'luxury residence new alamein',
        detailsKeys: ['prop8Detail1', 'prop8Detail2', 'prop8Detail3', 'prop8Detail4', 'prop8Detail5'],
        featured: false,
    },
    { 
        id: 9, 
        type: 'sale', 
        titleKey: 'propTitle9', 
        price: '1% Down Payment', 
        image: 'https://i.ibb.co/dJML7pMG/Dark-Blue-and-Gold-Minimalist-Real-Estate-Facebook-Ad.png', 
        hint: 'luxury living north coast',
        detailsKeys: ['prop9Detail1', 'prop9Detail2', 'prop9Detail3', 'prop9Detail4', 'prop9Detail5'],
        featured: true,
        isWide: true,
    },
];

const RenderPropertyList = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Separate wide and regular properties
  const wideProperties = properties.filter(p => p.isWide);
  const regularProperties = properties.filter(p => !p.isWide);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
        {regularProperties.map(property => {
          const title = t[property.titleKey as keyof typeof t] || 'Property';
          return (
            <Card key={property.id} className="bg-card/80 backdrop-blur-sm overflow-hidden group flex flex-col border-border/60 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:scale-105 hover:-translate-y-1 active:scale-100">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={property.image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
                  data-ai-hint={property.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
              </div>
              <CardContent className="p-4 flex-grow flex flex-col">
                <h3 className="font-antonio font-bold text-lg text-card-foreground">{title}</h3>
                <p className="font-rubik text-accent font-semibold text-base mb-2">{property.price}</p>
                {property.detailsKeys && (
                    <ul className="font-body text-xs text-foreground/80 space-y-1 list-disc list-inside flex-grow text-left">
                        {property.detailsKeys.map((detailKey, index) => (
                            <li key={index}>{t[detailKey as keyof typeof t]}</li>
                        ))}
                    </ul>
                )}
              </CardContent>
               <div className="p-4 pt-0 mt-auto">
                <BookingForm propertyTitle={title} propertyImage={property.image}>
                  <Button className="w-full font-antonio text-lg bg-primary/80 hover:bg-primary text-primary-foreground font-bold">BOOK NOW</Button>
                </BookingForm>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8">
        {wideProperties.map(property => {
          const title = t[property.titleKey as keyof typeof t] || 'Property';
          return (
            <Card key={property.id} className="bg-card/80 backdrop-blur-sm overflow-hidden group relative sm:col-span-2 border-2 border-primary/30 shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 active:scale-100">
                <CardHeader>
                    <CardTitle className="font-antonio font-extralight text-2xl md:text-4xl text-primary drop-shadow-lg text-center tracking-widest">{title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative h-auto aspect-[1.91/1] overflow-hidden">
                        <Image
                            src={property.image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"
                            data-ai-hint={property.hint}
                        />
                    </div>
                    <div className="p-6 text-center">
                        <p className="font-rubik font-semibold text-lg md:text-xl text-foreground mb-4">{property.price}</p>
                        {property.detailsKeys && (
                            <ul className="font-body text-sm md:text-base text-foreground/90 space-y-1 mb-6 max-w-xl mx-auto list-disc list-inside text-left">
                                {property.detailsKeys.map((detailKey, index) => (
                                    <li key={index}>{t[detailKey as keyof typeof t]}</li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-auto">
                            <BookingForm propertyTitle={title} propertyImage={property.image}>
                                <Button className="bg-yellow-400 text-black font-antonio font-bold text-lg px-8 py-3 h-auto rounded-full hover:bg-yellow-500 shadow-lg transition-all duration-300 transform hover:scale-105">
                                    {t.bookNow}
                                </Button>
                            </BookingForm>
                        </div>
                    </div>
                </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export function GallerySection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="gallery" className="py-12 md:py-16 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="font-antonio font-extralight text-3xl md:text-4xl mb-4 text-card-foreground tracking-widest">{t.galleryTitle}</h2>
        <RenderPropertyList />
      </div>
    </section>
  );
}
