import { useUniqueIds } from "@/hooks";
import { ASYNC_DIV_SPINNER_PROPS } from "@/model";
import { createArray } from "@/utils";

export const AsyncDivSpinner: React.FC<ASYNC_DIV_SPINNER_PROPS> = (props) => {
  const { count = 1 } = props;
  const uniqueIds = useUniqueIds(count);
  return (
    <>
      {createArray(count).map((_, index) => (
        <div
          key={uniqueIds[index]}
          className="d-flex flex-column"
          style={{ padding: 10 }}
        >
          <div
            style={{ width: "50%", minWidth: 50, height: 20, borderRadius: 20 }}
            className="skeleton-box"
          />
          <div
            style={{ width: "80%", height: 20, borderRadius: 20 }}
            className="skeleton-box mt-3"
          />
          <div
            style={{ width: "100%", height: 20, borderRadius: 20 }}
            className="skeleton-box mt-3"
          />
          <div
            style={{ width: "70%", height: 20, borderRadius: 20 }}
            className="skeleton-box mt-3"
          />
        </div>
      ))}
    </>
  );
};
