type SelectBtnType = {
  date: string;
  type: string;
  handleDate: (value: string) => void;
};

export default function SelectBtn({ date, type, handleDate }: SelectBtnType) {
  return (
    <button id={type === "next" ? "right" : "left"} onClick={() => {}}></button>
  );
}
