import Head from "next/head";
import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
   useEffect(() => {
      if (localStorage.getItem("user") === null) {
         async function getIdentity() {
            try {
               const res = await fetch("http://api.ipify.org/?format=json");
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
