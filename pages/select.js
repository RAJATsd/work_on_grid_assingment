import CustomSelect from "@/Components/CustomSelect";
import Head from "next/head";

const options = [
  {
    value: "1",
    label: "Not Identified",
  },
  {
    value: "2",
    label: "Closed",
  },
  {
    value: "3",
    label: "Communicated",
  },
  {
    value: "4",
    label: "Identified",
  },
  {
    value: "5",
    label: "Resolved",
  },
  {
    value: "6",
    label: "Cancelled",
  },
];

export default function Select() {
  return (
    <>
      <Head>
        <title>WOG</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ padding: "20px" }}>
        <div>Single Select No input No sort :</div>
        <CustomSelect options={options} />
        <div>Multi Select No input No sort :</div>
        <CustomSelect options={options} multiSelect />

        <div>Single Select With input No sort :</div>
        <CustomSelect options={options} inputSearch />

        <div>Multi Select With input No sort :</div>
        <CustomSelect options={options} inputSearch multiSelect />

        <div>Multi Select With input And sort :</div>
        <CustomSelect
          options={options}
          inputSearch
          multiSelect
          sortComparator={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
      </div>
    </>
  );
}
