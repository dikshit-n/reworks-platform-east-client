// import { capitalize } from "../../../../utils";
import { TimePicker, TextField, LocalizationProvider } from "@mui/material";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { getValidDate } from "@/utils";

// const DatePickers = [DesktopDatePicker, MobileDatePicker];

export const TimeInput = (props) => {
  // let { datePickerType: type = "desktop", ...rest } = props;
  // if (!type) type = capitalize("desktop");
  // type = `${type}DatePicker`;
  // const Component = DatePickers[type];

  let { renderInput, helperText, error, onChange } = props;

  if (renderInput) {
    if (renderInput.props)
      renderInput = (params) => (
        <TextField
          fullWidth
          variant="outlined"
          className={props.className}
          {...renderInput.props}
          {...params}
          helperText={helperText}
          error={error}
        />
      );
  } else {
    renderInput = (params) => (
      <TextField
        fullWidth
        variant="outlined"
        className={props.className}
        {...params}
        helperText={helperText}
        error={error}
      />
    );
  }

  const getValue = () => {
    if (props.value) return getValidDate(new Date(props.value));
    return null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <TimePicker
        // inputFormat="DD/MM/YYYY"
        {...props}
        value={getValue()}
        onChange={onChange}
        renderInput={renderInput}
      />
    </LocalizationProvider>
  );
};
