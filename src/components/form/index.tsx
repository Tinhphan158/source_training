import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useImperativeHandle } from 'react';
// eslint-disable-next-line @typescript-eslint/naming-convention
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface IFormProps<T = any> {
  children: React.ReactNode;
  onSubmit?: (data: T) => void;
  validator?: yup.ObjectShape;
  defaultValues?: DefaultValues<any>;
  customClassName?: string;
}

export interface IFormRef {
  getFormData: () => any;
  reset: () => void;
}

// eslint-disable-next-line react/display-name, @typescript-eslint/naming-convention
const Form = forwardRef<IFormRef, IFormProps>(({ validator = {}, defaultValues = {}, ...props }, ref) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(yup.object().shape(validator)),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    props.onSubmit && props.onSubmit(data);
  };

  useImperativeHandle(ref, () => ({
    getFormData: () => methods.getValues(),
    reset: () => {
      methods.reset();
    },
  }));

  return (
    <FormProvider {...methods}>
      <form
        className={`${props.customClassName}`}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={methods.handleSubmit(onSubmit)}>
        {props.children}
      </form>
    </FormProvider>
  );
});

export default Form;
