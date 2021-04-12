import Head from "next/head";
import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
   useEffect(() => {
      document.documentElement.setAttribute("lang", "en");

      if (localStorage.getItem("user") === null) {
         async function getIdentity() {
            try {
               const res = await fetch(
                  "https://www.cloudflare.com/cdn-cgi/trace"
               );
               const result = await res.text();
               const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
               let ip = result.match(ipRegex)[0];
               localStorage.setItem("user", ip);
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
