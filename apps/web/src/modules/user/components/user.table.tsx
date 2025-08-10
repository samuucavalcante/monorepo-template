"use client";
import { userReadList } from "@/modules/user/actions/user.readList.action";
import { TableApp } from "@/shared/components/table-app";

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
        ]}
      />
    </>
  );
}
