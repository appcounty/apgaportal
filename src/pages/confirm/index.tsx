import React, { useEffect, useState } from "react";
import styles from "./Confirm.module.css";
import { useRouter } from "next/router";
import Display from "@/components/display/Display";
import { HTTPMethods, makeRequest } from "@/util/httpConfig";

const Confirm = (): JSX.Element => {
  const router = useRouter();
  const { referenceCode } = router.query;

  const [items, setItems] = useState([]);

  useEffect(()=> {
    const fetchData = async() => {
      const response = await makeRequest(
        `/verifyMember?referenceCode=${referenceCode}`,
        HTTPMethods.GET,
        undefined
      );

      const { feedback, data } = response;
      const items = data[0];

      console.log(items);
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

      {/* <Display /> */}
    </div>
  );
};

export default Confirm;
