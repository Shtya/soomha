
import "@/style/main.scss";
import "@/style/globals.css";

import {NextIntlClientProvider , useMessages } from 'next-intl';
import LayoutRoot from "@/components/LayoutRoot";

export const metadata = { 
  title:'Home | Premier Car Evaluation Services' , 
  description : "Discover reliable car evaluation services at our website. Get accurate car valuations for individuals, banks, and companies.",
  icons: { icon: '/favicon.png', },
};


export default function RootLayout({ children , params:{locale}  }) {
  const messages = useMessages() ;

  return (
    <html lang={locale} dir={locale == "en" ? "ltr" : "rtl"} >
      <body className=" " >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <LayoutRoot> {children} </LayoutRoot>
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
