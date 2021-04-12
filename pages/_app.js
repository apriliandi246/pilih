import Head from "next/head";
import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
   useEffect(() => {
      document.documentElement.setAttribute("lang", "en");

      if (localStorage.getItem("user") === null) {
         async function getIdentity() {
            try {
               const res = await fetch("https://api.ipify.org/?format=json");
               const result = await res.json();
               localStorage.setItem("user", result.ip);
            } catch (err) {
               throw new Error(err.message);
            }
         }

         getIdentity();
      }
   }, []);

   return (
      <>
         <Head>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <Component {...pageProps} />
      </>
   );
}

export default MyApp;
