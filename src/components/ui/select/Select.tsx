import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";
import Icon from "@/components/utilities/Icons";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  defaultOption?: Option;
  placeholder?: string;
  selectValueHandler?: (value: string) => void;
  error?: boolean;
};

const Select = ({
  options,
  defaultOption,
  placeholder,
  selectValueHandler,
  error,
}: SelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);

  const optionsListRef = useRef(null);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultOption) {
      selectValueHandler && selectValueHandler(defaultOption.value);
      setSelectedItem(defaultOption);
    }
  }, [defaultOption]);

  useEffect(() => {
    if (isOpen) {
      if (itemsWrapperRef.current) {
        const selectedOption = itemsWrapperRef.current.querySelector(
          `div.${styles.focused}`
        );
        /**
         * Checks if there's a selected option
         */
        if (selectedOption) {
          scrollTo(selectedOption);
        }
      }
    }
  }, [isOpen, selectedItem]);

  useEffect(() => {
    document.addEventListener("click", (event: MouseEvent) => {
      if (
        mainRef.current &&
        event.target instanceof Node &&
        !mainRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    });
  }, [mainRef]);

  const scrollTo = (selectedOption: Element) => {
    /**
     * Scoll to the selected option
     */
    selectedOption.scrollIntoView({
      behavior: "smooth", // Add smooth scrolling animation (optional)
      block: "nearest", // Ensure the option is fully visible
    });
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // console.log("Key: ", event.key);

    if (isOpen) {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter"
      ) {
        event.preventDefault(); // Prevent default behavior of arrow keys
      }

      if (mainRef.current) {
        mainRef.current.style.outline = "none";
      }
    }

    if (event.key === "ArrowDown") {
      if (itemsWrapperRef.current) {
        const selectedOption: HTMLElement | null =
          itemsWrapperRef.current.querySelector(`div.${styles.focused}`);
        let nextIndex = 0;
        if (selectedOption) {
          nextIndex =
            options.findIndex(
              (option) => option.value === selectedOption.dataset.value
            ) + 1;
          selectedOption.classList.remove("focused");
        }

        // Handle when length of option is reached
        if (nextIndex >= options.length) {
          nextIndex = 0;
        }

        setSelectedItem(options[nextIndex]); // Set the selected item state

        /**
         * Take care of visually updating the selected item
         */
        const currentSelectedOption = itemsWrapperRef.current.querySelector(
          `div[data-value="${options[nextIndex].value}"]`
        );

        if (currentSelectedOption) {
          currentSelectedOption.classList.add("focused");
          scrollTo(currentSelectedOption);
        }
      }
    } else if (event.key === "ArrowUp") {
      if (itemsWrapperRef.current) {
        const selectedOption: HTMLElement | null =
          itemsWrapperRef.current.querySelector(`div.${styles.focused}`);

        let nextIndex = 0;

        if (selectedOption) {
          nextIndex =
            options.findIndex(
              (option) => option.value === selectedOption.dataset.value
            ) - 1;
          selectedOption.classList.remove("focused");
        }

        // Handle when length of option is reached
        if (nextIndex < 0) {
          nextIndex = options.length - 1;
        }

        setSelectedItem(options[nextIndex]); // Set the selected item state

        /**
         * Take care of visually updating the selected item
         */
        const currentSelectedOption = itemsWrapperRef.current.querySelector(
          `div[data-value="${options[nextIndex].value}"]`
        );

        if (currentSelectedOption) {
          currentSelectedOption.classList.add("focused");
          scrollTo(currentSelectedOption);
        }
      }
    } else if (event.key === "Enter") {
      setIsOpen(false);
    }
  };

  const selectItemHandler = (selectedItem: Option): void => {
    setSelectedItem(selectedItem);
    selectValueHandler && selectValueHandler(selectedItem.value);
  };

  const clickHandler = (): void => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div
      ref={mainRef}
      className={styles.main}
      onKeyDown={handleKeydown}
      tabIndex={0}
    >
      <div className={styles.select}>
        <div
          style={{
            borderRadius: isOpen ? "0.3rem 0.3rem 0 0" : "0.3rem",
            border:
              isOpen && error
                ? "2px solid #dc0933"
                : isOpen && !error
                ? "2px solid #026334"
                : error
                ? "2px solid #dc0933"
                : "2px solid hsla(151, 96%, 20%, 0.777)",
          }}
          className={`${styles.display} ${error ? styles.error : ""}`}
        >
          <label
            className={`${selectedItem?.value ? "" : styles.placeholder}`}
            onClick={clickHandler}
          >
            {selectedItem?.label || placeholder}
          </label>
          <Icon
            clickHandler={clickHandler}
            className={styles.icon}
            name={isOpen ? "arrow-up" : "arrow-down"}
            strokeColor="#026334"
          />
        </div>
        {isOpen ? (
          <div
            ref={optionsListRef}
            style={{
              height: options.length ? `10.2rem` : `3.5rem`,
            }}
            className={styles.optionsList}
          >
            <div
              ref={itemsWrapperRef}
              className={styles.itemsWrapper}
              style={{
                height: options.length ? `9.2rem` : `100%`,
              }}
            >
              {options.map((option, index) => (
                <div
                  key={index}
                  data-value={option.value}
                  className={`${styles.option} 
                  ${
                    option.value === selectedItem?.value ? styles.focused : ""
                  }`}
                  onClick={() => {
                    selectItemHandler(option);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {/* {error ? <span className={styles.error}>This field is required</span> : null} */}
    </div>
  );
};

export default Select;
