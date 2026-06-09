I need you to redesign the "Manage Exemptions" tab on the Assignment Tool page in the Coordinator view only. Rename the tab and restructure its content completely as described below. Do not change anything else in the file.

Change 1 — Rename the tab:

Change the third tab label from "Manage Exemptions" to "Staff Leave & Status"
Keep exact same tab styling — same font, same dark maroon active underline, same position as third tab


Change 2 — Full restructure of tab content:
Below the tab row show the page description in small grey italic text: "Manage staff who cannot meet the standard 12-credit minimum. Select a lecturer below to view or update their status." — same small grey font as all other helper text in the prototype
Lecturer selector:

Bold dark label "Select Lecturer" above
Dropdown showing all staff in this order — same dropdown style as all other dropdowns in prototype:

Dr. Aisyah Rahman
Prof. Muhammad Ali
Dr. Siti Aminah
Dr. Ahmad Hassan — with small amber "On Leave" pill badge next to name
Dr. Fatimah Zahra
Dr. Noor Hayati
Prof. Ibrahim Malik
Dr. Zatul Alwani


Show Dr. Ahmad Hassan pre-selected as the example

Below the dropdown — three separate white cards side by side, each with light grey border, same card style as all other cards in prototype:

Card 1 — "Staff on Leave":

Card header: bold dark text "Staff on Leave" with a small calendar icon on the left
Small grey subtitle: "For staff temporarily away — maternity, medical, study, or annual leave"
Thin light grey divider below header
Field 1: label "Leave Type *" with red asterisk — a plain text input field (not a dropdown) — placeholder: "e.g. Maternity Leave, Medical Leave, Study Leave..." — same text input style as Activity Title field in My Activity Tracker Add Activity tab — show "Maternity Leave" pre-filled for Dr. Ahmad Hassan example
Field 2: two date fields side by side:

Left: label "Start Date *" with red asterisk — date input mm/dd/yyyy — show "01/01/2026" pre-filled
Right: label "End Date *" with red asterisk — date input mm/dd/yyyy — show "12/31/2026" pre-filled
Same date field style as My Activity Tracker filter


Small red helper text below dates: "Both dates are required. Leave period will appear on the department calendar." — same small red validation text style as other required field messages
Small amber info box below: light amber background, amber left border, small text: "This lecturer will be able to freely decline assignments during the leave period without triggering a compliance error." — same info box style as NFR-03 Compliance box on Export Reports page
"Save Leave" button at bottom of card — solid dark maroon background white text — same style as "Send Assignment" button — show as active/enabled for Dr. Ahmad Hassan example


Card 2 — "Adjunct Lecturer":

Card header: bold dark text "Adjunct Lecturer" with a small person/staff icon on the left
Small grey subtitle: "For part-time lecturers hired from outside UTM who cannot carry a full teaching load"
Thin light grey divider below header
A rounded pill toggle switch:

OFF state: grey toggle, label "Not Active" in grey text to the right
ON state: dark maroon toggle, label "Active" in dark maroon text to the right
Show as OFF for Dr. Ahmad Hassan example since he is on leave not adjunct


Field below toggle (only visible when toggle is ON): label "Reason / Comments *" with red asterisk — a multi-line text area — placeholder: "Add a note explaining this lecturer's adjunct arrangement..." — same text area style as any existing text areas in prototype — minimum 3 lines tall
Small grey helper text below: "Adjunct status does not appear on the calendar. It remains active until you manually turn it off."
"Save Status" button at bottom — same outlined button style as Cancel buttons (white background, dark maroon border and text) — show as greyed out/disabled for Dr. Ahmad Hassan example since toggle is OFF


Card 3 — "Seconded Staff":

Card header: bold dark text "Seconded Staff" with a small arrows/transfer icon on the left
Small grey subtitle: "For staff temporarily working across departments — either joining us from another faculty or our staff working elsewhere"
Thin light grey divider below header
A rounded pill toggle switch — same style as Card 2 toggle:

OFF state: grey toggle, "Not Active" in grey text
ON state: dark maroon toggle, "Active" in dark maroon text
Show as OFF for Dr. Ahmad Hassan example


Two fields below toggle (only visible when toggle is ON):

Field 1: label "Home Department *" with red asterisk — text input — placeholder: "e.g. Faculty of Electrical Engineering" — same text input style as other fields
Field 2: label "Reason / Comments *" with red asterisk — multi-line text area — placeholder: "Briefly explain the secondment arrangement..." — minimum 3 lines tall


Small grey helper text below: "Seconded staff status does not appear on the calendar. It remains active until you manually turn it off."
"Save Status" button at bottom — same outlined button style — show as greyed out/disabled for Dr. Ahmad Hassan example


Below the three cards — "Current Staff Status Summary" table:

Section title "Current Staff Status Summary" in bold dark text
Small grey subtitle: "All staff currently flagged with an active leave or special status"
White card container, light grey border, same table style as all other tables in prototype
Column headers in small caps light grey: STAFF NAME | STATUS TYPE | DETAILS | PERIOD | STATUS
One row for Dr. Ahmad Hassan:

Dr. Ahmad Hassan | On Leave | Maternity Leave | Jan 1, 2026 — Dec 31, 2026 | small green "Active" pill badge


Thin light grey divider lines between rows
Small grey centered text if no active statuses: "No staff currently flagged this semester"


Change 3 — Coordinator calendar: show leave period as date range

On the Coordinator Dashboard calendar in June 2026, show a continuous amber highlighted bar across June 10 to June 20 representing Dr. Noor Hayati's leave period (use Dr. Noor Hayati with a shorter leave for calendar demo purposes)
The highlighted bar should span across all date cells from June 10 to June 20 continuously — same style as multi-day event bars in Google Calendar — amber/yellow background colour, small dark text inside or above the bar: "Dr. Noor Hayati — On Leave"
Add "🟡 Staff Leave Period" to the calendar legend — same dot/bar style, amber colour
Do not change any other existing calendar dots, labels, or legend items

Change 4 — Lecturer on Leave calendar: show leave period

On the Lecturer on Leave Dashboard calendar in June 2026, show the same continuous amber highlighted bar across June 10 to June 20
Label inside or above the bar: "My Leave Period"
Add "🟡 My Leave Period" to the calendar legend — same style, amber colour
Do not change any other existing calendar dots, labels, or legend items


DO NOT change anything else:

Do not touch Tab 1 "Unassigned Courses" or Tab 2 "Assign Lecturer" content
Do not touch the Assign Lecturer tab Administrative Status section
Do not touch any other pages in the file
Do not change the Lecturer view or regular Coordinator view except what is listed above
Do not change any fonts, colours, spacing, card styles, badge styles, table styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in any view