"use client";
import { userReadList } from "@/modules/user/actions/user.readList.action";
import { TableApp, TableMetaInternal } from "@/shared/components/table-app";
import { Button } from "@/shared/components/ui/button";

export default function UserTable() {
  return (
    <>
      <TableApp
        title="Usuários"
        filters={[
          {
            queryKey: "query",
            label: "Filtro",
            type: "search",
            placeholder: "Buscar por nome ou email",
          },
        ]}
        fetchAction={userReadList}
        columns={[
          {
            header: "ID",
            accessorKey: "_id",
          },
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Email",
            accessorKey: "email",
          },
          {
            header: "Criado em",
            accessorKey: "createdAt",
            cell: (info) => new Date(info.getValue<string>()).toLocaleString(),
          },

          {
            header: "Ação",
            accessorKey: "action",
            cell: (info) => {
              const onRefetch = (info.table.options.meta as TableMetaInternal)
                .onRefetch;

              return <Button onClick={() => onRefetch?.()}>Atualizar</Button>;
            },
          },
        ]}
      />
    </>
  );
}
