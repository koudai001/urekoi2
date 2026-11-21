import { Host, DatePicker as SwiftUIDatePicker } from "@expo/ui/swift-ui";
import { datePickerStyle, environment } from "@expo/ui/swift-ui/modifiers";

export function DatePicker({
  title,
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
    <Host matchContents={{ vertical: true }}>
      <SwiftUIDatePicker
        title={title}
        selection={value}
        range={range}
        onDateChange={onChange}
        displayedComponents={["date"]}
        modifiers={[datePickerStyle("wheel"), environment("locale", "ja_JP")]}
      />
    </Host>
  );
}
