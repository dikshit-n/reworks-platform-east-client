import { DefaultProductAvatarSrc } from "@/data";
import { Paper, styled, Typography } from "@mui/material";
import Link from "next/link";

const StyledCategoryCardWrapper = styled(Paper)`
  padding: 5px;
  display: grid;
  grid-template-rows: 200px auto;
  border-radius: 10px;
  cursor: pointer;
  flex: 1 0 290px;
  .image {
    background: #e9eef1;
    background-position: center;
    background-size: cover;
    img {
      object-fit: contain;
      width: 100%;
      height: 200px;
      z-index: 0;
    }
  }
  .content {
    text-align: center;
    padding: 10px;
  }
`;

export const CategoryCard: React.FC = (props: any) => {
  const { name, image, href } = props;
  return (
    <Link href={href}>
      <StyledCategoryCardWrapper>
        <div className="image">
          {/* <Image width={250} height={250} src={image} className="img" /> */}
          <img
            alt={name}
            src={image || DefaultProductAvatarSrc}
            className="img"
          />
        </div>
        <div className="content">
          <Typography variant="h4">{name}</Typography>
        </div>
      </StyledCategoryCardWrapper>
    </Link>
  );
};
