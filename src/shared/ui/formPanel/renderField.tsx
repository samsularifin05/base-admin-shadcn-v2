/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldValues, Path } from 'react-hook-form';
import { PasswordInput } from '../custom';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '../../';

interface TypedFieldProps<FormValues extends FieldValues> {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
  placeholder: string;
  hiddenText?: boolean;
  readOnly?: boolean;
}

const ReanderField = <FormValues extends Record<string, any>>({
  name,
  label,
  placeholder,
  control,
  hiddenText,
  readOnly
}: TypedFieldProps<FormValues>) => (
  <>
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {hiddenText ? (
              <PasswordInput
                readOnly={readOnly}
                placeholder="********"
                {...field}
              />
            ) : (
              <Input disabled={readOnly} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export default ReanderField;
