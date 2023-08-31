import { useEffect, useRef, useState } from "react";
import { DownOutlined, UpOutlined, CheckOutlined } from "@ant-design/icons";
import Styles from "./styles.module.css";

const CustomSelect = ({
  options,
  multiSelect,
  inputSearch = true,
  sortComparator,
}) => {
  const optionsRef = useRef();
  const [value, setValue] = useState(multiSelect ? [] : "");
  const [open, setOpen] = useState(false);
  const [optionsToRender, setOptionsToRender] = useState(
    sortComparator ? options?.sort(sortComparator) : options
  );

  const handleOutsideClick = (event) => {
    if (optionsRef?.current && !optionsRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOptionSelect = (optionValue) => {
    if (multiSelect) {
      const isSelected = value.includes(optionValue);
      if (isSelected) {
        const newArray = value.filter((val) => val !== optionValue);
        setValue(newArray);
      } else {
        setValue([...value, optionValue]);
      }
    } else {
      setOpen(false);
      setValue(optionValue);
    }
  };

  const findLabel = (optionValue) =>
    options?.find(({ value: optionVal }) => optionValue === optionVal)?.label;

  const renderSelectValue = () => {
    if (!multiSelect) {
      return findLabel(value);
    }

    return value.map((val) => (
      <div key={val} className={Styles.selectedOptionLabel}>
        {findLabel(val)}
      </div>
    ));
  };

  const filterSearchedOptions = (evt) => {
    const searchedString = evt.target.value;
    const filteredOptions = options?.filter((opt) =>
      opt.options?.length
        ? opt.options.find((innerOpt) =>
            innerOpt.label.toLowerCase().includes(searchedString.toLowerCase())
          )
        : opt.label.toLowerCase().includes(searchedString.toLowerCase())
    );

    setOptionsToRender(
      sortComparator ? filteredOptions?.sort(sortComparator) : filteredOptions
    );
  };

  const renderSelectableOption = ({ optionValue, label }) => (
    <div
      key={optionValue}
      onClick={() => handleOptionSelect(optionValue)}
      className={Styles.option}
    >
      {label}
      {multiSelect && value.includes(optionValue) && <CheckOutlined />}
    </div>
  );

  return (
    <span ref={optionsRef}>
      <div
        className={Styles.inputOrValueArea}
        onClick={() => setOpen((prev) => !prev)}
      >
        {inputSearch && (
          <input
            type="text"
            className={Styles.searchInput}
            placeholder={multiSelect ? "" : renderSelectValue()}
            onChange={filterSearchedOptions}
          />
        )}

        <div>{renderSelectValue()}</div>

        {open ? !inputSearch && <UpOutlined /> : <DownOutlined />}
      </div>
      {open && (
        <div className={Styles.optionsContainer}>
          {optionsToRender?.map(
            ({ value: optionValue, label, options: innerOptions }) =>
              innerOptions?.length ? (
                <div key={label}>
                  <div style={{ color: "grey" }}>{label}</div>
                  <div className={Styles.multilevelOption}>
                    {innerOptions?.map(
                      ({ value: innerOptionValue, label: innerOptionlabel }) =>
                        renderSelectableOption({
                          optionValue: innerOptionValue,
                          label: innerOptionlabel,
                        })
                    )}
                  </div>
                </div>
              ) : (
                renderSelectableOption({ optionValue, label })
              )
          )}
        </div>
      )}
    </span>
  );
};

export default CustomSelect;
