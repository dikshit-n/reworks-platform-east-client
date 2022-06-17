import { useDebounce } from "@/hooks";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

export const DebounceInput = (props) => {
  const [fieldValue, setFieldValue] = useState("");
  const [event, setEvent] = useState({});
  const debouncedFieldValue = useDebounce(fieldValue, props.delay || 500);

  useEffect(
    () => {
      if (props.onChange) {
        props.onChange({
          ...event,
          target: { ...event?.target, value: fieldValue },
        });
      }
    },
    [debouncedFieldValue] // Only call effect if debounced search term changes
  );

  useEffect(() => {
    setFieldValue(props.value);
  }, [props.value]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFieldValue(value);
    setEvent(event);
  };

  return <TextField {...props} value={fieldValue} onChange={handleChange} />;
};
