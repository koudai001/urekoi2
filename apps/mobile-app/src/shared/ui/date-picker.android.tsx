import { DateTimePicker, Host } from "@expo/ui/jetpack-compose";

export function DatePicker({
  value,
  range,
  onChange,
}: {
  title?: string;
  value: Date;
  range?: { start?: Date; end?: Date };
  onChange: (date: Date) => void;
}) {
  return (
    <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
      <DateTimePicker
        initialDate={value.toISOString()}
        displayedComponents="date"
        variant="picker"
        selectableDates={range}
        onDateSelected={(date) => {
          if (date !== null) onChange(date);
        }}
      />
    </Host>
  );
}
