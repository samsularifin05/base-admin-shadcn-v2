import { ModalGlobal, PanelAdmin } from "@/shared";
import FormMasterData from "./form";
import { useAppSelector } from "@/app";
import TableMasterData from "./table";

const MasterData = () => {
  const modal = useAppSelector((state) => state.utility.getModal);

  return (
    <PanelAdmin>
      <TableMasterData />
      <ModalGlobal
        title={`${modal.isEdit ? "Edit" : "Tambah"} Data`}
        size="medium"
        namaForm={"FormMasterData"}
      >
        <FormMasterData />
      </ModalGlobal>
    </PanelAdmin>
  );
};

export default MasterData;
