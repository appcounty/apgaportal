import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Alert from "@/components/ui/alert/Alert";
import Form, { Input } from "@/components/form/Form";
import Button from "@/components/ui/button/Button";
import { HTTPMethods, makeRequest } from "@/util/httpConfig";
import { useRouter } from "next/router";
import { useBroswer } from "@/providers/BrowserProvider";

const CheckRegistration = (): JSX.Element => {
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [referenceCode, setReferenceCode] = useState<string>("");
  const [referenceCodeError, setReferenceCodeError] = useState<boolean>(false);

  const router = useRouter();

  const { setBrowserTitle } = useBroswer();

  useEffect(() => {
    setBrowserTitle("Registration Status");
  }, []);

  const clickHandler = () => {
    setIsError(false);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (validateFields()) {
        setLoading(true);

        const response = await makeRequest(
          `/verifyMember?referenceCode=${referenceCode}`,
          HTTPMethods.GET,
          undefined
        );

        const { feedback, message, cause } = response;
        console.log(response);

        if (feedback !== "error") {
          router.push({
            pathname: `/confirm`,
            query: { referenceCode: String(referenceCode) },
          });
        } else {
          setIsError(true);
          setErrorMessage(message);
          if (cause) {
            setErrorMessage(cause.sqlMessage);
          }
          setLoading(false);
        }
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setReferenceCode(event.target.value);
  };

  const validateFields = () => {
    if (
      !referenceCode ||
      referenceCode.length < 8 ||
      referenceCode.length > 8
    ) {
      setReferenceCodeError(true);
    } else {
      setReferenceCodeError(false);
    }
    return referenceCode && referenceCode.length === 8;
  };

  return (
    <div className={styles.main}>
      {isError ? (
        <Alert
          type={"error"}
          message={errorMessage}
          clickHandler={clickHandler}
        />
      ) : null}
      <Form
        title="Check Registration Status"
        className={styles.form}
        submitHandler={submitHandler}
      >
        <section className={`${styles.section} ${styles.columnSection}`}>
          {/* Occupation Field */}
          <Input
            error={referenceCodeError}
            value={referenceCode}
            placeholder="Enter your 8 digit reference code"
            changeHandler={changeHandler}
          />
        </section>

        <section className={`${styles.section} ${styles.buttonWrapper}`}>
          <Button
            loading={loading}
            type="submit"
            clickHandler={() => {}}
            text="Check Status"
          />
        </section>
      </Form>
    </div>
  );
};

export default CheckRegistration;
