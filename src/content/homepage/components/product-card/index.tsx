import { DefaultProductAvatarSrc } from "@/data";
import { MenuItem, Paper, styled, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Tag, TagsWrapper } from "@/components";

const StyledProductCardWrapper = styled(Paper)(
  ({ theme }) => `
padding: 5px;
display: grid;
grid-template-rows: 200px auto;
border-radius: 10px;
min-width: 290px;
flex: 1 0 290px;
.image {
    background: #E9EEF1;
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
    display: grid;
    grid-template-rows: 1fr auto;
    padding: 10px;
    .main-info {
        padding: 5px;
        .title {
            margin-bottom: 2px;
        }
        .decription {
            color: ${theme.colors.secondaryText};
        }
    }
}
.actions {
    > * {
        height: 100%;
    }
}
`
);

export const ProductCard = (props) => {
  const { image_url, readable_name, item_desc, item_size, productId } = props;

  const loadImage = (url) => {
    try {
      if (url.startsWith("http")) return url;
      return DefaultProductAvatarSrc;
    } catch (err) {
      console.log(err);
      return DefaultProductAvatarSrc;
    }
  };
  return (
    <StyledProductCardWrapper>
      <div className="image">
        {/* <Image width={250} height={250} src={loadImage(image_url)} alt={readable_name} /> */}
        <img src={loadImage(image_url)} alt={readable_name} />
      </div>
      <div className="content">
        <div className="main-info">
          <Typography className="title" variant="h3">
            {readable_name}
          </Typography>
          <Typography className="decription" variant="caption">
            {item_desc}
          </Typography>
        </div>
        <TagsWrapper>
          <Tag name="size" value={item_size} />
          <Tag name="#id" value={productId} />
        </TagsWrapper>
      </div>
      <div className="actions">
        <MenuItem
          component={"a"}
          href="/"
          target="_blank"
          sx={{ display: "grid", placeContent: "center" }}
        >
          <OpenInNewIcon color="primary" />
        </MenuItem>
      </div>
    </StyledProductCardWrapper>
  );
};
