export const AsyncDivSpinner = () => {
  return (
    <div className="d-flex flex-column" style={{ padding: 10 }}>
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
  );
};
