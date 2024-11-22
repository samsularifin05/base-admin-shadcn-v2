import { Button, cn, FormPanel, RenderField } from '@/shared';
import {} from 'react-redux';
import { useAppSelector } from '@/app';
import { validateFormMasterData } from './validate';

const FormMasterData = () => {
  const utility = useAppSelector((state) => state.utility);
  // const formValues = useAppSelector((state) => state.form.FormMasterData);

  function onSubmit() {}

  return (
    <div className={cn('grid gap-6')}>
      <FormPanel
        formName={'LoginForm'}
        onSubmit={onSubmit}
        validate={validateFormMasterData}
      >
        {({ form }) => (
          <>
            <div className="grid gap-2">
              <RenderField
                control={form.control}
                label="Name"
                placeholder="Masukan Name"
                name="name"
              />

              <Button
                type="submit"
                className="mt-2"
                loading={utility.getLoading.button}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </FormPanel>
    </div>
  );
};

export default FormMasterData;
