import Head from "next/head";
import styles from "../../styles/vote.module.css";

export default function VotePage({ id }) {
   function scrollToBottom() {
      setTimeout(() => {
         window.scrollTo(0, 99999);
      }, 0);
   }

   return (
      <>
         <Head>
            <title>Let's voting </title>
         </Head>

         <div className={styles.container}>
            <h1 className={styles.total_votes}>Let's voting {id}</h1>

            <div className={styles.subject_desc}>
               <h2 className={styles.subject_title}>Subject 1</h2>
               <span className={styles.subject_votes}>20 votes</span>
            </div>

            <div className={styles.subject_one}>
               <div className={styles.subject_progress}></div>
            </div>

            <div className={styles.subject_desc}>
               <h2 className={styles.subject_title}>Subject 2</h2>
               <span className={styles.subject_votes}>20 votes</span>
            </div>

            <div className={styles.subject_two}>
               <div className={styles.subject_progress}></div>
            </div>

            <div className={styles.subject_buttons}>
               <button>Voting Subject 1</button>
               <button>Voting Subject 2</button>
            </div>

            <details className={styles.subject_detail}>
               <summary onClick={scrollToBottom}>Vote description</summary>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur unde quia ex eaque quidem tenetur recusandae
                  cupiditate autem excepturi voluptatum. Ipsa alias laboriosam
                  in recusandae possimus molestias dolores fugit doloremque!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur unde quia ex eaque quidem tenetur recusandae
                  cupiditate autem excepturi voluptatum. Ipsa alias laboriosam
                  in recusandae possimus molestias dolores fugit doloremque!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur unde quia ex eaque quidem tenetur recusandae
                  cupiditate autem excepturi voluptatum. Ipsa alias laboriosam
                  in recusandae possimus molestias dolores fugit doloremque!
               </p>
            </details>
         </div>
      </>
   );
}

export async function getServerSideProps({ params }) {
   return {
      props: {
         id: params.id,
      },
   };
}
