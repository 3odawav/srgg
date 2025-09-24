
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, User, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth";
import { app, googleProvider, facebookProvider } from '@/lib/firebase';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Facebook, Instagram, Mail, Phone, QrCode, ChevronsRight, ChevronsLeft, ArrowRightLeft, LogOut, Music4 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28px" height="28px" fill="currentColor" {...props}>
        <path fill="currentColor" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="currentColor" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="currentColor" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.22,0-9.65-3.88-11.303-9h-6.571C9.044,35.091,15.999,44,24,44z" />
        <path fill="currentColor" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.591,44,30.134,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.48 1.34 5l-1.4 5.02 5.13-1.37c1.45.81 3.09 1.25 4.74 1.25h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2M12.04 20.15h-.01c-1.5 0-2.98-.48-4.2-1.37l-.3-.18-3.12.83.85-3.05-.2-.32C3.54 14.6 3.06 13.06 3.06 12c0-4.98 4.05-9.03 9.03-9.03s9.03 4.05 9.03 9.03-4.05 9.12-9.03 9.12m4.23-5.88c-.22-.11-.53-.26-.61-.29-.08-.03-.28-.05-.4.1-.12.16-.45.58-.55.7-.1.12-.2.13-.37.03-.17-.1-.71-.26-1.35-.83-.5-.45-.84-.8-1.09-1.25-.25-.45-.13-.68.08-.88s.22-.25.33-.38c.11-.12.15-.2.23-.34.08-.14.04-.26-.02-.48s-.61-1.48-.84-2.02c-.23-.55-.46-.47-.64-.47h-.23c-.18 0-.47.07-.71.32-.24.25-.93.9-1.08 2.18-.15 1.28.78 2.53.88 2.71s1.74 2.8 4.22 3.72c.59.22 1.05.35 1.42.45.59.15 1.13.13 1.55.08.47-.06 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.05-.1-.18-.17-.37-.28"/>
    </svg>
);


const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/SIGHTRealEstate.eg', icon: <Facebook className="w-6 h-6"/> },
    { name: 'Instagram', href: 'https://www.instagram.com/sightrealestate.eg', icon: <Instagram className="w-6 h-6"/> },
    { name: 'WhatsApp', href: 'https://wa.me/201099993903', icon: <WhatsAppIcon className="w-6 h-6"/> },
    { name: 'Call Us', href: 'tel:+201099993903', icon: <Phone className="w-6 h-6"/> },
    { name: 'Email Us', href: 'mailto:info@sighteg.com', icon: <Mail className="w-6 h-6"/> },
];

const RADIO_STREAM_URL = 'https://streams.ilovemusic.de/iloveradio-chilly.mp3';

export function SocialSidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [position, setPosition] = useState<'left' | 'right'>('left');
    const [user, setUser] = useState<User | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const auth = getAuth(app);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio(RADIO_STREAM_URL);
            audioRef.current.volume = 0.5; // Set initial volume
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        
        return () => {
            unsubscribe();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [auth]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Audio play failed:", error);
                    setIsPlaying(false); // Reset state if play fails
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);
    
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .catch((error) => {
            console.error("Google Sign-in Error:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                console.error("The user closed the sign-in popup.");
            } else if (error.code === 'auth/cancelled-popup-request') {
                console.error("A popup request was cancelled.");
            } else {
                console.error("An unexpected authentication error occurred.", error.message);
            }
        });
    };

    const handleFacebookSignIn = () => {
        signInWithPopup(auth, new FacebookAuthProvider())
        .catch((error) => {
            console.error("Facebook Sign-in Error:", error);
            // Log credential if available to help debug auth issues
            if (error.credential) {
                const credential = OAuthProvider.credentialFromError(error);
                console.error("OAuth Credential:", credential);
            }
            if (error.code === 'auth/account-exists-with-different-credential') {
                console.error("An account already exists with the same email address but different sign-in credentials.");
            } else {
                 console.error("An unexpected authentication error occurred.", error.message);
            }
        });
    };
    
    const handleSignOut = () => {
        signOut(auth).catch((error) => {
            console.error("Sign out error:", error);
        });
    };

    const toggleRadio = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleSidebar = () => setIsOpen(!isOpen);
    const togglePosition = () => {
      setPosition(pos => {
        const newPos = pos === 'left' ? 'right' : 'left';
        setIsOpen(true);
        return newPos;
      });
    };

    const sidebarClasses = cn(
        "group fixed top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2 p-2 rounded-full border border-border/30 bg-background/50 backdrop-blur-sm shadow-lg",
        "transition-transform duration-300 ease-in-out",
        "hidden md:flex",
        {
            'left-2 transform-none': position === 'left' && isOpen,
            'right-2 transform-none': position === 'right' && isOpen,
            '-translate-x-full left-[10px]': position === 'left' && !isOpen,
            'translate-x-full right-[10px]': position === 'right' && !isOpen,
        }
    );

    const handleClasses = cn(
        "absolute top-1/2 -translate-y-1/2 z-10 h-24 w-6 rounded-r-full bg-primary/50 backdrop-blur-sm border-y border-r border-border/30 cursor-pointer items-center justify-center",
        "hover:bg-primary/80 transition-colors",
        "hidden md:flex",
        {
            'left-full': position === 'left',
            'right-full rounded-r-none rounded-l-full border-r-0 border-l': position === 'right',
        }
    );

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    };

    return (
        <TooltipProvider>
            <div className={sidebarClasses} style={{width: '3.5rem'}}>
                 <div className={handleClasses} onClick={toggleSidebar}>
                    {position === 'left' && (isOpen ? <ChevronsLeft className="h-5 w-5 text-primary-foreground" /> : <ChevronsRight className="h-5 w-5 text-primary-foreground" />)}
                    {position === 'right' && (isOpen ? <ChevronsRight className="h-5 w-5 text-primary-foreground" /> : <ChevronsLeft className="h-5 w-5 text-primary-foreground" />)}
                 </div>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={togglePosition} className="p-2 text-primary/70 hover:text-accent">
                            <ArrowRightLeft className="w-5 h-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={position === 'left' ? 'right' : 'left'} className="bg-background/80 border-border text-foreground backdrop-blur-sm">
                        <p>Move Sidebar</p>
                    </TooltipContent>
                </Tooltip>

                {user && (
                    <>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Avatar className="w-8 h-8 my-1 cursor-pointer border-2 border-primary/50">
                                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent side={position === 'left' ? 'right' : 'left'} className="bg-background/80 border-border text-foreground backdrop-blur-sm">
                                <p>{user.displayName || 'Welcome'}</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button onClick={handleSignOut} className="p-2 text-destructive/70 hover:text-destructive transition-all duration-300" aria-label="Sign out">
                                    <LogOut className="w-6 h-6" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side={position === 'left' ? 'right' : 'left'} className="bg-background/80 border-border text-foreground backdrop-blur-sm">
                                <p>Sign Out</p>
                            </TooltipContent>
                        </Tooltip>
                        <Separator className="my-1 bg-border/50" />
                    </>
                )}

                {socialLinks.map((item) => (
                    <Tooltip key={item.name}>
                        <TooltipTrigger asChild>
                            <Link 
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="p-2 text-primary/70 hover:text-accent transition-all duration-300"
                                aria-label={item.name}
                            >
                                {item.icon}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side={position === 'left' ? 'right' : 'left'} className="bg-background/80 border-border text-foreground backdrop-blur-sm">
                            <p>{item.name}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
                
                <Dialog>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <button className="p-2 text-primary/70 hover:text-accent transition-all duration-300">
                                    <QrCode className="w-6 h-6" />
                                </button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent side={position === 'left' ? 'right' : 'left'} className="bg-background/80 border-border text-foreground backdrop-blur-sm">
                            <p>Scan for All Links</p>
                        </TooltipContent>
                    </Tooltip>
                    <DialogContent className="sm:max-w-xs bg-background/80 backdrop-blur-md">
                        <DialogHeader>
                            <DialogTitle className="text-center text-card-foreground">Connect with SIGHTeg</DialogTitle>
                        </DialogHeader>
                        <div className="p-4 bg-white rounded-lg">
                            <Image src="https://i.ibb.co/xL28YpG/SIGHTeg-QR.png" alt="SIGHTeg QR Code" width={400} height={400} />
                        </div>
                    </DialogContent>
                </Dialog>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button 
                            onClick={toggleRadio} 
                            className={cn(
                                "p-2 text-primary/70 hover:text-accent transition-all duration-300",
                                isPlaying && "text-accent animate-pulse"
                            )}
                            aria-label={isPlaying ? "Stop radio" : "Play radio"}
                        >
                            <Music4 className="w-6 h-6" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side={position === 'left' ? 'right' : 'left'} className="bg-background/80 border-border text-foreground backdrop-blur-sm">
                        <p>{isPlaying ? "Stop Music" : "Play Music"}</p>
                    </TooltipContent>
                </Tooltip>
                
                {!user && (
                  <>
                    <Separator className="my-1 bg-border/50" />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button 
                                onClick={handleGoogleSignIn} 
                                className="p-2 text-primary/70 hover:text-accent transition-all duration-300"
                                aria-label="Sign in with Google"
                            >
                                <GoogleIcon className="w-7 h-7" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side={position === 'left' ? 'right' : 'left'} className="bg-background/80 border-border text-foreground backdrop-blur-sm">
                            <p>Sign in with Google</p>
                        </TooltipContent>
                    </Tooltip>

                     <Tooltip>
                        <TooltipTrigger asChild>
                            <button 
                                onClick={handleFacebookSignIn} 
                                className="p-2 text-primary/70 hover:text-accent transition-all duration-300"
                                aria-label="Sign in with Facebook"
                            >
                               <Facebook className="w-6 h-6" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side={position === 'left' ? 'right' : 'left'} className="bg-background/80 border-border text-foreground backdrop-blur-sm">
                            <p>Sign in with Facebook</p>
                        </TooltipContent>
                    </Tooltip>
                  </>
                )}
            </div>
        </TooltipProvider>
    );
}
