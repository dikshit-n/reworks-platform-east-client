import { userApi } from "@/api";
import {
  CustomButton,
  CustomIconButton,
  FixedHeaderTable,
  FlexRow,
  TableActionsWrapper,
} from "@/components";
import { useQueryState } from "@/hooks";
import { createApiFunction, handleError } from "@/utils";
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ViewUsersContent: React.FC = () => {
  const [users, loading, { refetch }] = useQueryState({
    queryFn: userApi.fetchUsers,
    queryKey: "user",
    onError: handleError,
  });

  const handleDeleteClick = (_id: string) => {
    window.modal({
      type: "confirmation",
      onConfirm: createApiFunction(() => {
        userApi.deleteUser(_id);
        refetch();
      }),
    });
  };

  const COLUMNS = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Actions", accessor: "actions" },
  ];

  const tableData = users.map((el) => ({
    ...el,
    actions: (
      <FlexRow sx={{ gap: 3 }}>
        <Tooltip title="Edit">
          <span>
            <CustomIconButton color="primary" href={`/user/${el._id}`}>
              <EditIcon />
            </CustomIconButton>
          </span>
        </Tooltip>
        <Tooltip title="Delete">
          <span>
            <CustomIconButton
              color="error"
              onClick={() => handleDeleteClick(el._id)}
            >
              <DeleteIcon />
            </CustomIconButton>
          </span>
        </Tooltip>
      </FlexRow>
    ),
  }));

  const actions = (
    <TableActionsWrapper>
      <Tooltip title="Create new User">
        <span>
          <CustomButton href="/admin/user/add">Add User</CustomButton>
        </span>
      </Tooltip>
    </TableActionsWrapper>
  );

  return (
    <FixedHeaderTable
      loading={loading}
      data={tableData}
      columns={COLUMNS}
      title="Users"
      actions={actions}
    ></FixedHeaderTable>
  );
};
