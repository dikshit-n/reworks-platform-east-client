import { MenuItem, styled, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { TagsWrapper } from "@/components";
import { DefaultProductAvatarSrc } from "@/data";

const StyledProductCardWrapper = styled(Paper)(
  ({ theme }) => `
    display: grid;
    grid-template-columns: 200px 1fr 100px;
    border-radius: 20px;
    margin: 10px 0;
    height: fit-content;
    width: 100%;
    ${theme.breakpoints.down("md")} {
      grid-template-rows: 150px auto;
      grid-template-columns: unset;
      .image {
        border-top-right-radius: 20px;
        border-bottom-left-radius: 0 !important;
      }
    }
    .image {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background-position: center;
        background-size: cover;
        overflow: hidden;
        background-color: #E5E5E5;
        img {
            object-fit: contain;
            width: 100%;
            height: 150px;
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

const Tag = (props) => {
  const { name, value } = props;
  return (
    <div className="tag">
      <div className="tag-name">
        <small>{name}</small>
      </div>
      <div className="tag-content">
        <small>{value}</small>
      </div>
    </div>
  );
};

export const ProductCard = (props) => {
  const { readable_name, image_url, item_desc, item_size, productId } = props;

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
