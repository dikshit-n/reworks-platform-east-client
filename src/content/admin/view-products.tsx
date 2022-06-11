import { FixedHeaderTable } from "@/components";

const DUMMY_DATA = [
  { name: "iPhone", type: "Phone" },
  { name: "HP", type: "Laptop" },
  { name: "Suzuki", type: "Scooty" },
  { name: "Hero Splender", type: "Bike" },
  { name: "Inova", type: "Car" },
  { name: "Sasuke", type: "Man" },
];

export const ViewProductsContent: React.FC = () => {
  const COLUMNS = [
    { Header: "Product Name", accessor: "name" },
    { Header: "Product Type", accessor: "type" },
  ];
  return (
    <FixedHeaderTable
      title="List of Products"
      columns={COLUMNS}
      data={DUMMY_DATA}
    />
  );
};
