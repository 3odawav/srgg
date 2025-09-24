
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutUsSection } from "@/components/about-us-section";
import { GoogleMap } from "@/components/google-map";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function ConnectSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="contact" className="py-12 md:py-16 bg-gradient-to-b from-transparent to-background">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/80 backdrop-blur-sm">
            <TabsTrigger value="about">{t.tabAboutUs}</TabsTrigger>
            <TabsTrigger value="map">{t.tabOurLocation}</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="bg-card/80 backdrop-blur-sm rounded-b-lg p-4">
            <AboutUsSection />
          </TabsContent>
          <TabsContent value="map">
            <div className="aspect-video max-w-4xl mx-auto mt-6 rounded-lg overflow-hidden border border-border backdrop-blur-sm">
                <GoogleMap />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
