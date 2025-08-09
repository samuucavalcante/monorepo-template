import { TableApp } from "@/shared/components/table-app";

export default function UserTable() {
  return (
    <>
      <TableApp
        data={[
          {
            id: "1",
            name: "João",
            email: "5tT8o@example.com",
          },
          {
            id: "2",
            name: "Maria",
            email: "5tT8o@example.com",
          },
          {
            id: "3",
            name: "Pedro",
            email: "5tT8o@example.com",
          },
        ]}
        columns={[
          {
            header: "ID",
            accessorKey: "id",
          },
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Email",
            accessorKey: "email",
          },
        ]}
      />
    </>
  );
}
