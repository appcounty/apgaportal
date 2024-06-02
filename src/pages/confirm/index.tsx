import React, { useEffect, useState } from "react";
import styles from "./Confirm.module.css";
import { useRouter } from "next/router";
import Display from "@/components/display/Display";
import { HTTPMethods, makeRequest } from "@/util/httpConfig";
import Link from "next/link";
import { useBroswer } from "@/providers/BrowserProvider";

const Confirm = (): JSX.Element => {
  const router = useRouter();
  const { referenceCode } = router.query;

  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { setBrowserTitle } = useBroswer();

  useEffect(()=>{
    setBrowserTitle("Confirmation");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (referenceCode) {
        try {
          const response = await makeRequest(
            `/verifyMember?referenceCode=${referenceCode}`,
            HTTPMethods.GET,
            undefined
          );

          const { feedback, message, data } = response;
          console.log(feedback, data, response);

          if (feedback !== "error") {
            const items = data[0];
            setName(
              `${items.title} ${items.firstName} ${items.middleName} ${items.lastName}`
            );

            setStatus(feedback);

            console.log(items);

            setItems(
              Object.keys(items).map((key) => ({
                label: key,
                value: items[key],
              }))
            );
          } else {
            // error handling...
          }
        } catch (error) {
          // error handling...
          console.error(error);
        }
      }
    };

    fetchData();
  }, [referenceCode]);

  return (
    <div className={styles.main}>
      <div className={styles.messageBox}>
        <p>
          Hello,{" "}
          <span style={{ fontWeight: "600" }}>
            {String(name).toUpperCase()}
          </span>
          !
        </p>
        <br />

        <p>
          Your registration has been submitted successfully and is pending
          approval.
        </p>
        <br />

        <p>
          Your reference code is:{" "}
            <span style={{ fontWeight: "600" }}>{referenceCode}</span>
        </p>
        <br />

        <p>
          Copy and keep this reference code for future reference. You can also
          use it to check the status of your registration by coming back to this
          site and clicking on Check Registration.
        </p>
        <br />

        <p>
          Your referral link is:{" "}
          <Link href={`https://www.apga.ng?ref=${referenceCode}`}>
            <span style={{ fontWeight: "600" }}>
              https://apga.ng?ref={referenceCode}
            </span>
          </Link>
        </p>
        <br />
        <p>You can use it to invite your friends and family to join APGA!</p>
      </div>

      {/* <Display items={items} title={`${name} Profile`} /> */}
    </div>
  );
};

export default Confirm;
