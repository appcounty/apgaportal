import Button from "@/components/ui/button/Button";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <h1>Welcome to the APGA online membership data capturing platform. </h1>
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.button}
          text="Membership Registration"
          clickHandler={() => {
            router.push(`/register`);
          }}
        />

        <Button
          className={styles.button}
          text="Check Registration Status"
          clickHandler={() => {
            router.push(`/check-registration`);
          }}
        />
      </div>
    </div>
  );
}
