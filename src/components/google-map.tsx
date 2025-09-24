
'use client';

export function GoogleMap() {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.601552815198!2d31.1981248151152!3d30.0482599818808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584128bf23597d%3A0x627151a6245f7823!2s5%20El-Gihad%20St%2C%20Mit%20Akaba%2C%20Agouza%2C%20Giza%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1663000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SIGHTeg Location"
        ></iframe>
    );
}
