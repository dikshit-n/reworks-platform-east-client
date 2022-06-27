import { userApi } from "@/api";
import { AsyncDivSpinner } from "@/components";
import { useQueryState } from "@/hooks";
import { handleError } from "@/utils";
import { Card, Divider, styled, Typography } from "@mui/material";

const StyledCard = styled(Card)`
  padding: 20px;
  text-align: center;
`;

export const ProfileContent: React.FC = () => {
  const [profileDetails, loading] = useQueryState({
    queryKey: "profile",
    queryFn: userApi.fetchProfile,
    onError: handleError,
  });

  return loading ? (
    <AsyncDivSpinner />
  ) : (
    <StyledCard>
      <Typography variant="h2">Profile</Typography>
      <Divider />
      <br />
      <Typography variant="h4">Email</Typography>
      <Typography>{profileDetails.email}</Typography>
      <br />
      <Typography variant="h4">Name</Typography>
      <Typography>{profileDetails.name}</Typography>
    </StyledCard>
  );
};
