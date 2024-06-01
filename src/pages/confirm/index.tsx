import React, { useEffect, useState } from "react";
import styles from "./Confirm.module.css";
import { useRouter } from "next/router";
import Display from "@/components/display/Display";
import { HTTPMethods, makeRequest } from "@/util/httpConfig";

const Confirm = (): JSX.Element => {
  const router = useRouter();
  const { referenceCode } = router.query;

  const [items, setItems] = useState<{ label: string; value: string }[]>([]);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");

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
          {String(status).toLowerCase() === "waiting" ? "Hello" : "Congratulations🎉"},{" "}
          <span style={{ fontWeight: "600" }}>
            {String(name).toUpperCase()}
          </span>!
        </p>
        <br />
        <p>
          {String(status).toLowerCase() === "waiting"
            ? `Your registration is awaiting confirmation. Please check back with us on this portal in a bit using your reference code😉`
            : `Your application has been confirmed. You are now a legitimate APGA party member.`}
        </p>
        <br />
        <p>
          However, you can always refer your friends and family to register as
          an APGA member using your referral code:{" "}
          <span style={{ fontWeight: "600" }}>
            https://apga.ng?ref={referenceCode}
          </span>
        </p>
        <br />
        {status === "waiting" ? (
          <p>
            Please note that you will receive an email and text notification
            once your application for membership is approved.
          </p>
        ) : null}
      </div>

      <Display items={items} title={`${name} Profile`} />
    </div>
  );
};

export default Confirm;
