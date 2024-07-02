import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { DataTable } from "@/shared";
import columns from "./columns";
import { AppDispatch, useAppSelector } from "@/app";
import { serviceMasterData } from "../../service";

const TableMasterData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const service = serviceMasterData();

  useEffect(() => {
    dispatch(service.getMasterData());
  }, [dispatch]);

  const masterData = useAppSelector(
    (state) => state.master.masterData.getMasterData
  );

  return (
    <DataTable
      columns={columns}
      data={masterData.data}
      titleButton="Data User"
    />
  );
};

export default TableMasterData;
