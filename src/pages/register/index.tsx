import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import Form, { Input, Select } from "@/components/form/Form";
import Separator from "@/components/ui/separator/Separator";
import Button from "@/components/ui/button/Button";
import { HTTPMethods, makeRequest } from "@/util/httpConfig";
import { generateRandomCode } from "@/util/util";
import { useRouter } from "next/router";
import Alert from "@/components/ui/alert/Alert";

interface Fields {
  title: string;
  gender: string;
  firstName: string;
  middleName: string;
  surname: string;
  dateOfBirth: string;
  vin: string;
  phoneNumber: string;
  email: string | null | "";
  occupation: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  stateOfResidence: string;
  lgaOfResidence: string;
  ward: string;
  pollingUnit: string;
  religion: string;
  referral: string;
}

interface ErrorFields {
  title: boolean;
  gender: boolean;
  firstName: boolean;
  middleName: boolean;
  surname: boolean;
  dateOfBirth: boolean;
  vin: boolean;
  phoneNumber: boolean;
  email: boolean;
  occupation: boolean;
  stateOfOrigin: boolean;
  lgaOfOrigin: boolean;
  stateOfResidence: boolean;
  lgaOfResidence: boolean;
  ward: boolean;
  pollingUnit: boolean;
  religion: boolean;
  referral: boolean;
}
const Register = (): JSX.Element => {
  const [fields, setFields] = useState<Fields>({
    title: "",
    gender: "",
    firstName: "",
    middleName: "",
    surname: "",
    dateOfBirth: "",
    vin: "",
    phoneNumber: "",
    email: "",
    occupation: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    stateOfResidence: "",
    lgaOfResidence: "",
    ward: "",
    pollingUnit: "",
    religion: "",
    referral: "",
  });

  const [errorField, setErrorField] = useState<ErrorFields>({
    title: false,
    gender: false,
    firstName: false,
    middleName: false,
    surname: false,
    dateOfBirth: false,
    vin: false,
    phoneNumber: false,
    email: false,
    occupation: false,
    stateOfOrigin: false,
    lgaOfOrigin: false,
    stateOfResidence: false,
    lgaOfResidence: false,
    ward: false,
    pollingUnit: false,
    religion: false,
    referral: false,
  });

  const [referenceCode, setReferenceCode] = useState<number>();

  const [states, setStates] = useState([]);
  const [lgaOfOrigin, setLgaOfOrigin] = useState([]);
  const [lgaOfResidence, setLgaOfResidence] = useState([]);
  const [wards, setWards] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const religions = [
    {
      value: "African traditional religion",
      label: "African Traditional Religion",
    },
    { value: "Christianity", label: "Christianity" },
    { value: "Islam", label: "Islam" },
    { value: "Others", label: "Others" },
  ];

  const titles = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Prof", label: "Prof" },
    { value: "Dr", label: "Dr" },
    { value: "Chief", label: "Chief" },
    { value: "Barr", label: "Barr" },
    { value: "Senator", label: "Senator" },
  ];

  useEffect(() => {
    fetchState();
  }, []);

  const fetchState = async () => {
    try {
      const response = await makeRequest(
        "/getState",
        HTTPMethods.GET,
        undefined,
        undefined
      );
      const { feedback, data } = response;
      if (feedback) {
        setStates(
          data.map((state: any) => ({
            label: state.name,
            value: state.id,
          }))
        );
        // console.log(data);
      } else {
        console.error("Server error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLga = async (stateId: string | number, entity: string) => {
    try {
      const response = await makeRequest(
        `/getLga?state_id=${stateId}`,
        HTTPMethods.GET,
        undefined,
        undefined
      );
      const { feedback, data } = response;

      if (feedback) {
        if (entity === "lgaOfOrigin") {
          setLgaOfOrigin(
            data.map((lga: any) => ({
              value: lga.id,
              label: lga.name,
            }))
          );
        } else {
          setLgaOfResidence(
            data.map((lga: any) => ({
              value: lga.id,
              label: lga.name,
            }))
          );
        }
      } else {
        console.error("Server error");
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWards = async (stateId: string, lgaId: string) => {
    try {
      const response = await makeRequest(
        `/getwards?lga_id=${lgaId}&state_id=${stateId}`,
        HTTPMethods.GET,
        undefined,
        undefined
      );
      const { feedback, data } = response;

      if (feedback) {
        setWards(
          data.map((ward: any) => ({
            value: ward.id,
            label: ward.name,
          }))
        );
      } else {
        console.error("Server error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPollingUnits = async (
    stateId: string,
    lgaId: string,
    wardId: string
  ) => {
    try {
      const response = await makeRequest(
        `/getPollingUnit?state_id=${stateId}&lga_id=${lgaId}&ward_id=${wardId}`,
        HTTPMethods.GET,
        undefined,
        undefined
      );
      const { feedback, data } = response;

      if (feedback) {
        setPollingUnits(
          data.map((pUnit: any) => ({
            value: pUnit.id,
            label: pUnit.name,
          }))
        );
      } else {
        console.error("Server error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const ref = generateRandomCode();
      if (validateFields()) {
        setLoading(true);
        const payload = {
          title: fields.title,
          firstName: fields.firstName,
          middleName: fields.middleName,
          lastName: fields.surname,
          phoneNumber: fields.phoneNumber,
          DOB: fields.dateOfBirth,
          Occupation: fields.occupation,
          stateOfResidence: fields.stateOfResidence,
          localGovernmentOfOrigin: fields.lgaOfOrigin,
          Religious: fields.religion,
          email: fields.email,
          password: "",
          voterIdNo: fields.vin,
          stateOfOrigin: fields.stateOfOrigin,
          localGovernment: fields.lgaOfResidence,
          Ward: fields.ward || 1,
          pollingUnit: fields.pollingUnit || 1,
          status: 0,
          Gender: fields.gender,
          photo: "",
          referenceCode: ref,
          referral: fields.referral,
        };

        console.log("PAYLOAD: ", payload);
        const response = await makeRequest(
          "/addNewMember",
          HTTPMethods.POST,
          payload,
          undefined
        );

        const { feedback, message, cause } = response;

        if (feedback !== "error") {
          router.push({
            pathname: `/confirm`,
            query: { referenceCode: String(ref) },
          });
        } else {
          setIsError(true);
          setErrorMessage(cause.sqlMessage);
          if (String(cause.sqlMessage).includes("Duplicate")) {
            setErrorMessage("Sorry! This member already exists.");
          }

          setLoading(false);
        }
      }
    } catch (error: any) {
      console.error(error);
      setIsError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const validateFields = () => {
    if (!fields.title) {
      setErrorField((errorFields) => ({ ...errorFields, title: true }));
    } else {
      console.log("Not Title");
      setErrorField((errorFields) => ({ ...errorFields, title: false }));
    }

    if (!fields.gender) {
      setErrorField((errorFields) => ({ ...errorFields, gender: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, gender: false }));
    }

    if (!fields.firstName) {
      setErrorField((errorFields) => ({ ...errorFields, firstName: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, firstName: false }));
    }

    if (!fields.middleName) {
      setErrorField((errorFields) => ({ ...errorFields, middleName: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, middleName: false }));
    }

    if (!fields.surname) {
      setErrorField((errorFields) => ({ ...errorFields, surname: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, surname: false }));
    }

    if (!fields.dateOfBirth) {
      setErrorField((errorFields) => ({ ...errorFields, dateOfBirth: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, dateOfBirth: false }));
    }

    if (!fields.email) {
      setErrorField((errorFields) => ({ ...errorFields, email: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, email: false }));
    }

    if (!fields.phoneNumber) {
      setErrorField((errorFields) => ({ ...errorFields, phoneNumber: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, phoneNumber: false }));
    }

    if (!fields.vin) {
      setErrorField((errorFields) => ({ ...errorFields, vin: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, vin: false }));
    }

    if (!fields.occupation) {
      setErrorField((errorFields) => ({ ...errorFields, occupation: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, occupation: false }));
    }

    if (!fields.religion) {
      setErrorField((errorFields) => ({ ...errorFields, religion: true }));
    } else {
      setErrorField((errorFields) => ({ ...errorFields, religion: false }));
    }

    if (!fields.stateOfOrigin) {
      setErrorField((errorFields) => ({ ...errorFields, stateOfOrigin: true }));
    } else {
      setErrorField((errorFields) => ({
        ...errorFields,
        stateOfOrigin: false,
      }));
    }

    if (!fields.lgaOfOrigin) {
      setErrorField((errorFields) => ({ ...errorFields, lgaOfOrigin: true }));
    } else {
      setErrorField((errorFields) => ({
        ...errorFields,
        lgaOfOrigin: false,
      }));
    }

    if (!fields.stateOfResidence) {
      setErrorField((errorFields) => ({
        ...errorFields,
        stateOfResidence: true,
      }));
    } else {
      setErrorField((errorFields) => ({
        ...errorFields,
        stateOfResidence: false,
      }));
    }

    if (!fields.lgaOfResidence) {
      setErrorField((errorFields) => ({
        ...errorFields,
        lgaOfResidence: true,
      }));
    } else {
      setErrorField((errorFields) => ({
        ...errorFields,
        lgaOfResidence: false,
      }));
    }

    return (
      fields.title &&
      fields.gender &&
      fields.firstName &&
      fields.middleName &&
      fields.surname &&
      fields.dateOfBirth &&
      fields.email &&
      fields.phoneNumber &&
      fields.vin &&
      fields.occupation &&
      fields.religion &&
      fields.stateOfOrigin &&
      fields.lgaOfOrigin &&
      fields.stateOfResidence &&
      fields.lgaOfResidence
    );
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const selectGenderHandler = (gender: string) => {
    setFields((values) => ({
      ...values,
      gender: gender,
    }));
  };

  const selectStateOfOriginHandler = (state: string) => {
    setFields((values) => ({
      ...values,
      stateOfOrigin: state,
    }));

    fetchLga(state, "lgaOfOrigin");

    setFields((values) => ({
      ...values,
      lgaOfOrigin: "",
    }));
  };

  const selectStateOfResidenceHandler = (state: string) => {
    setFields((values) => ({
      ...values,
      stateOfResidence: state,
    }));

    fetchLga(state, "lgaOfResidence");
    setWards([]);
    setPollingUnits([]);

    setFields((values) => ({
      ...values,
      lgaOfResidence: "",
      ward: "",
      pollingUnit: "",
    }));
  };

  const selectLgaOriginHandler = (lga: string) => {
    setFields((values) => ({
      ...values,
      lgaOfOrigin: lga,
    }));
  };

  const selectLgaResidenceHandler = (lga: string) => {
    setFields((values) => ({
      ...values,
      lgaOfResidence: lga,
    }));
    fetchWards(fields.stateOfResidence, lga);

    setPollingUnits([]);
    setFields((values) => ({
      ...values,
      ward: "",
      pollingUnit: "",
    }));
  };

  const selectReligionHandler = (religion: string) => {
    setFields((values) => ({
      ...values,
      religion: religion,
    }));
  };

  const selectTitleHandler = (title: string) => {
    setFields((values) => ({
      ...values,
      title: title,
    }));
  };

  const selectWardHandler = (ward: string) => {
    setFields((values) => ({
      ...values,
      ward: ward,
    }));
    fetchPollingUnits(fields.stateOfResidence, fields.lgaOfResidence, ward);
    setFields((values) => ({
      ...values,
      pollingUnit: "",
    }));
  };

  const selectPollingUnitHandler = (pUnit: string) => {
    setFields((values) => ({
      ...values,
      pollingUnit: pUnit,
    }));
  };

  const clickHandler = () => {
    setIsError(false);
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
        title="Bio information"
        className={styles.form}
        submitHandler={submitHandler}
      >
        {/* Title Field */}
        <Select
          error={errorField.title}
          selectValueHandler={selectTitleHandler}
          placeholder="title"
          options={titles}
        />

        {/* Gender Select */}
        <Select
          defaultValue={fields.gender}
          error={errorField.gender}
          selectValueHandler={selectGenderHandler}
          placeholder="Gender"
          options={genders}
        />

        <Separator />

        <section className={`${styles.section} ${styles.columnSection}`}>
          {/* Firstname Field */}
          <Input
            error={errorField.firstName}
            name={"firstName"}
            value={fields.firstName}
            placeholder="Firstname"
            changeHandler={changeHandler}
          />

          {/* Middle name Field */}
          <Input
            error={errorField.middleName}
            name={"middleName"}
            value={fields.middleName}
            placeholder="Middle name"
            changeHandler={changeHandler}
          />

          {/* Surname Field */}
          <Input
            error={errorField.surname}
            name={"surname"}
            value={fields.surname}
            placeholder="Surname"
            changeHandler={changeHandler}
          />
        </section>

        <Separator />

        <section className={`${styles.section} ${styles.columnSection}`}>
          {/* Date of Field */}
          <Input
            error={errorField.dateOfBirth}
            type="date"
            name={"dateOfBirth"}
            value={fields.dateOfBirth}
            placeholder="Date of Birth"
            changeHandler={changeHandler}
          />

          {/* Email Field */}
          <Input
            error={errorField.email}
            type="email"
            name={"email"}
            value={fields.email}
            placeholder="Email"
            changeHandler={changeHandler}
          />

          {/* phoneNumber Field */}
          <Input
            error={errorField.phoneNumber}
            type="number"
            name={"phoneNumber"}
            value={fields.phoneNumber}
            placeholder="Phone number"
            changeHandler={changeHandler}
          />
        </section>

        <Separator />

        <section className={`${styles.section} ${styles.columnSection}`}>
          {/* Vin Field */}
          <Input
            error={errorField.vin}
            name={"vin"}
            value={fields.vin}
            placeholder="VIN"
            changeHandler={changeHandler}
          />

          {/* Occupation Field */}
          <Input
            error={errorField.occupation}
            name={"occupation"}
            value={fields.occupation}
            placeholder="Occupation"
            changeHandler={changeHandler}
          />

          {/* Religion Select */}
          <Select
            error={errorField.religion}
            selectValueHandler={selectReligionHandler}
            placeholder="Religion"
            options={religions}
          />
        </section>

        <Separator />

        <section className={`${styles.section} ${styles.columnSection}`}>
          {/* State of Origin Select */}
          <Select
            defaultValue={fields.stateOfOrigin}
            error={errorField.stateOfOrigin}
            selectValueHandler={selectStateOfOriginHandler}
            placeholder="State of Origin"
            options={states}
          />

          {/* LGA of Origin Select */}
          <Select
            defaultValue={fields.lgaOfOrigin}
            error={errorField.lgaOfOrigin}
            selectValueHandler={selectLgaOriginHandler}
            placeholder="LGA of Origin"
            options={lgaOfOrigin}
          />
        </section>

        <Separator />
        <h4 style={{ color: "#003a03" }}>Polling Unit Information</h4>
        <Separator />

        <section className={`${styles.section} ${styles.columnSection}`}>
          {/* State Select */}
          <Select
            defaultValue={fields.stateOfResidence}
            error={errorField.stateOfResidence}
            selectValueHandler={selectStateOfResidenceHandler}
            placeholder="State"
            options={states}
          />

          {/* LGA Select */}
          <Select
            defaultValue={fields.lgaOfResidence}
            error={errorField.lgaOfResidence}
            selectValueHandler={selectLgaResidenceHandler}
            placeholder="Local government"
            options={lgaOfResidence}
          />
        </section>

        <section className={`${styles.section} ${styles.columnSection}`}>
          {/* Ward Select */}
          <Select
            defaultValue={fields.ward}
            error={errorField.ward}
            selectValueHandler={selectWardHandler}
            placeholder="Ward"
            options={wards}
          />

          {/* Polling Unit Select */}
          <Select
            defaultValue={fields.pollingUnit}
            error={errorField.pollingUnit}
            selectValueHandler={selectPollingUnitHandler}
            placeholder="Polling Unit"
            options={pollingUnits}
          />
        </section>

        <Separator />

        <section className={`${styles.section} ${styles.columnSection}`}>
          {/* Occupation Field */}
          <Input
            error={errorField.referral}
            name={"referral"}
            value={fields.referral}
            placeholder="Referral"
            changeHandler={changeHandler}
          />
        </section>

        <section className={`${styles.section} ${styles.buttonWrapper}`}>
          <Button
            loading={loading}
            type="submit"
            clickHandler={() => {}}
            text="Register"
          />
        </section>
      </Form>
    </div>
  );
};

export default Register;
