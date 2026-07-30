## Usage

The Calendar component is used to select a single date, multiple dates, or a range of dates.

## Notes

The startMonth, endMonth, and initMonth passed in must be strings in the format YYYYMM, and initMonth must be between startMonth and endMonth. Additionally, when other attributes that use year-month or year-month-day are used, please ensure that the data format passed in is either YYYYMM or YYYYMMDD. If the month or day is less than two digits long, add a 0 before it.

## Week Start Day

Some countries or regions habitually consider Sunday as the first day of the week in daily life. However, according to international standard [ISO 8601](https://wikipedia.org/wiki/ISO_8601), Monday is considered as the first day of the week. Also from the meaning of "weekend," Saturday and Sunday should be at the end of a week rather than at its beginning.

Therefore by default Calendar considers Monday as the first day of a week; we also recommend using this as your standard whenever possible. If you need to set Sunday as your first day instead for some reason you can do so with startSunday attribute.

## infoDates

Calendar can display some prompt information about certain days by passing an infoDates attribute. It's recommended to keep these messages short; otherwise they may cause calendar display issues.

## disabledDates

Calendar can disable certain dates by passing disabledDates attribute; if range selection mode is enabled then any selected date(s) will automatically filter out any disabled ones.

## Quick Selections

When in range selection mode Calendar can enable quick selections via passing an array property called quickSelects:

- When quickSelects contains 'week', clicking on current week will quickly select all dates within that same week.
- When quickSelects contains 'month', clicking on current month will quickly select all dates within that same month.
- When quickSelects contains 'quarter', clicking on current quarter will quickly select all dates within that same quarter.
- When positive integers are included inside quickSelects array component internally displays corresponding future days' shortcut buttons (e.g., [3，7] shows shortcuts for next three days & seven days).
- Similarly when negative integers are included inside quickSelects array component internally displays corresponding past few days' shortcut buttons (e.g., [-3,-7] shows shortcuts for last three & seven days).
- By default when specifying number of days through Quick Select feature today's date isn't included but includeToday value can be modified accordingly - see example below.

## Return Date Format

When user clicks confirm button located at bottom part of Calendar component it triggers confirm event which returns an array containing character data representing currently selected date(s). The format for each individual date depends upon outFormat parameter: Year corresponds with Y from outFormat while Month corresponds with M from outFormat and Day corresponds with D from outFormat - see example below.

## Month Watermark

By setting monthMark property Calendar component decides whether watermark text displaying name(s)of months appears inside every calendar month view; since different languages have varying lengths for their respective names one may adjust font size via monthMarkSize property.

### Note

Calendar was built atop Popup module utilizing predefined Props thus allowing various effects achieved through properties passed into Popup object itself e.g., radius style change demonstrated via sample code snippet provided hereunder.

Calendar's Confirm Button uses Button Component enabling customization options available through button parameter - refer to examples provided below.

## Without Popup

By default, Calendar uses Popup to display. If you need to render the calendar directly on the page, you can set popup to null. The calendar will be rendered inline without popping up, which is suitable for scenarios where you need to embed the calendar into the page layout.

## Month Card Style

When the monthCard property is true, each month will be wrapped and displayed using the Card component. You can customize the card style by passing the card parameter, such as setting dashed borders, theme background colors, etc. Please refer to the examples.
