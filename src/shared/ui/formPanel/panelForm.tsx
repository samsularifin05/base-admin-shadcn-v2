import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  useForm,
  FieldValues,
  UseFormReturn,
  DefaultValues,
  Resolver
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '../';
import * as yup from 'yup';
import { AppDispatch, formActions, useAppSelector } from '@/app';
import { FormState } from '@/app/store/model';

interface FormPanelProps<FormValues extends FieldValues> {
  formName: keyof FormState;
  onSubmit: (values: FormValues) => void;
  children: (props: { form: UseFormReturn<FormValues> }) => React.ReactNode;
  validate: yup.ObjectSchema<FormValues>;
}

const FormPanel = <FormValues extends FieldValues>({
  onSubmit,
  children,
  validate,
  formName
}: FormPanelProps<FormValues>): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  // Get initial values from the Redux store
  const initialValues = useAppSelector(
    (state) => state.form[formName as keyof FormState]
  ) as DefaultValues<FormValues>;

  // Initialize the form with the useForm hook
  const form = useForm<FormValues>({
    resolver: yupResolver(validate) as unknown as Resolver<FormValues>,
    defaultValues: initialValues,
    mode: 'onChange'
  });

  // UseEffect to reset form values when initialValues change
  useEffect(() => {
    // Only reset if initialValues are different to avoid unnecessary resets
    const currentValues = form.getValues();
    if (JSON.stringify(currentValues) !== JSON.stringify(initialValues)) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  // Watch form values and dispatch updates
  useEffect(() => {
    const watchSubscription = form.watch(async (values) => {
      try {
        const validValues = await validate.validate(values);
        dispatch(formActions.setValue({ form: formName, values: validValues }));
      } catch (error) {
        console.log(error);
      }
    });

    // Cleanup watch subscription on unmount
    return () => {
      watchSubscription.unsubscribe();
    };
  }, [form, dispatch, validate, formName]);

  // Return the form component unconditionally
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children({ form })}</form>
    </Form>
  );
};

export default FormPanel;
