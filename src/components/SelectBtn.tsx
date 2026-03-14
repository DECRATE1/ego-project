type SelectBtnType = {
  date: string;
  type: string;
  handleDate: (value: string) => void;
};

export default function SelectBtn({ date, type, handleDate }: SelectBtnType) {
  return (
    <button
      id={type == "next" ? "right" : "left"}
      onClick={() => {
        const [day, month, year] = date.split("/");
        const newDate = new Date(
          `${year}-${month}-${type == "next" ? +day + 1 : +day - 1}`,
        )
          .toLocaleDateString()
          .split(".")
          .join("/");

        handleDate(newDate);
      }}
    ></button>
  );
}
