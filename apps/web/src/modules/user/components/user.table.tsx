"use client";
import { userReadList } from "@/modules/user/actions/user.readList.action";
import { TableApp } from "@/shared/components/table-app";

export default function UserTable() {
  return (
    <>
      <TableApp
        filters={[
          {
            queryKey: "query",
            label: "Pesquisar",
            type: "search",
            placeholder: "Buscar por nome ou email",
          },
        ]}
        fetchAction={userReadList}
        pageSize={5}
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
