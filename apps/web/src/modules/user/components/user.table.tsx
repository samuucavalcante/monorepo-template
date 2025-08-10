import { userReadList } from "@/modules/user/actions/user.readList.action";
import { TableApp } from "@/shared/components/table-app";

export default async function UserTable() {
  return (
    <>
      <TableApp
        fetchAction={userReadList}
        pageSize={10}
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
        ]}
      />
    </>
  );
}
