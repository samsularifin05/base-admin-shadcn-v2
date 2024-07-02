import { ColumnDef } from "@tanstack/react-table";
import { ResponseFormMasterDataDto } from "../../model";
import { AppDispatch, formActions, utilityActions } from "@/app";
import { ButtonAction } from "@/shared";
import { useDispatch } from "react-redux";

const columns: ColumnDef<ResponseFormMasterDataDto>[] = [
  {
    header: "No",
    id: "no",
    cell: ({ row }) => {
      return <div> {row.index + 1} </div>;
    }
  },
  {
    accessorKey: "user_id",
    header: "User Id"
  },
  {
    accessorKey: "user_name",
    header: "Username"
  },
  {
    accessorKey: "level",
    header: "Level"
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dispatch = useDispatch<AppDispatch>();

      const handleDelete = () => {};

      const menuItems = [
        {
          key: "Edit",
          onClick: () => {
            dispatch(
              utilityActions.showModal({
                isModalShow: true,
                isEdit: true,
                data: row.original,
                namaForm: "FormMasterData"
              })
            );

            dispatch(
              formActions.updateForm({
                form: "FormMasterData",
                values: row.original
              })
            );
          }
        },
        { key: "Delete", onClick: handleDelete }
      ];

      return <ButtonAction items={menuItems} />;
    }
  }
];

export default columns;
