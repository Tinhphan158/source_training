import { DatePicker, type DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface IDatePickerFieldProps {
  name: string;
  placeholder: any;
  className: string;
  displayFormat?: string;
  disabled?: boolean;
  initialValue?: string | null;
  isChecked?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatePickerField = ({
  name,
  placeholder,
  className,
  displayFormat = 'DD/MM/YYYY',
  disabled = false,
  initialValue = null,
  ...props
}: IDatePickerFieldProps) => {
  const methods = useFormContext();
  const [state, setState] = useState(initialValue ? dayjs(initialValue) : null);
  useEffect(() => {
    const formValue = methods?.watch(name);
    if (formValue) {
      setState(dayjs(formValue));
    }
  }, [methods, name]);

  useEffect(() => {
    if (disabled) {
      setState(null);
      methods?.setValue(name, null);
    }
  }, [disabled]);

  useEffect(() => {
    if (name === 'resignDate' && initialValue) {
      setState(dayjs(initialValue));
      methods?.setValue('resignDate', initialValue);
    }
  }, []);

  const onChange: DatePickerProps['onChange'] = date => {
    if (date) {
      setState(date);
      methods?.setValue(name, date);
      methods?.trigger(name);
    } else {
      setState(null);
      methods?.setValue(name, null);
      methods?.trigger(name);
    }
  };

  return (
    <DatePicker
      disabled={disabled}
      className={className}
      placeholder={placeholder}
      value={state}
      onChange={onChange}
      format={displayFormat}
      {...props}
    />
  );
};
