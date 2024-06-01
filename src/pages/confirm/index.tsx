import React, { useEffect, useState } from "react";
import styles from "./Confirm.module.css";
import { useRouter } from "next/router";
import Display from "@/components/display/Display";
import { HTTPMethods, makeRequest } from "@/util/httpConfig";

const Confirm = (): JSX.Element => {
  const router = useRouter();
  const { referenceCode } = router.query;

  const [items, setItems] = useState<{label: string, value: string}[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(()=> {
    const fetchData = async() => {
      try {
        const response = await makeRequest(
          `/verifyMember?referenceCode=${referenceCode}`,
          HTTPMethods.GET,
          undefined
        );
  
        const { feedback, data } = response;
        console.log(feedback, data, response);
  
        if (feedback !== "error") {
          const items = data[0];
          setName(
            `${items.title} ${items.firstName} ${items.middleName} ${items.surname}`
          );
    
          console.log(items);
    
          setItems(Object.keys(items).map(key => ({
            label: key,
            value: items[key]
          })));
        } else {
          // error handling...
        }
      } catch (error) {
        // error handling...
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.messageBox}>
        <p>
          Your registration has been submitted successfully. Find your reference
          code below:
        </p>
        <br />
        <p style={{ fontWeight: "600" }}>{referenceCode}</p>
        <br />
        <p>
          You can use the reference code to track your registration status by
          coming back to this portal and using the{" "}
          <span style={{ fontWeight: "600" }}>Check Registration</span>
          Link.
        </p>
        <br />
        <p>
          You will also receive an email and text notification once your
          application is approved.
        </p>
        <br />

        <p>
          You can also refer your friends and family to register as an APGA
          member using your referral code:{" "}
          <span style={{ fontWeight: "600" }}>
            https://apga.ng/refer/
            {referenceCode}
          </span>
        </p>
      </div>

      {/* <Display items={items} title={`${name} Profile`} /> */}
    </div>
  );
};

export default Confirm;
