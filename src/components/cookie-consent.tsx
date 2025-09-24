
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';

const translations = {
    en: {
        message: 'This site uses cookies. By continuing to use this site, you agree to our use of cookies and our',
        privacyPolicy: 'Privacy Policy',
        accept: 'Got it!',
    },
    ar: {
        message: 'يستخدم هذا الموقع ملفات تعريف الارتباط. من خلال الاستمرار في استخدام هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط و',
        privacyPolicy: 'سياسة الخصوصية',
        accept: 'فهمت!',
    }
}

export function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        // To make it always visible for demonstration, we can comment out the check.
        // Or for real use, ensure you can reset it.
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500 ease-in-out",
            visible ? "translate-y-0" : "translate-y-full"
        )}>
            <div className="max-w-4xl mx-auto bg-secondary/90 backdrop-blur-sm rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-secondary-foreground text-center sm:text-left">
                    {t.message}{' '}
                    <a 
                        href="mailto:adelmansour@sighteg.com?subject=Privacy%20Policy%20Inquiry" 
                        className="underline hover:text-primary"
                    >
                        {t.privacyPolicy}
                    </a>.
                </p>
                <Button onClick={handleAccept} size="sm" className="shrink-0">{t.accept}</Button>
            </div>
        </div>
    );
}
