I need you to make two changes to the Assignment Tool page in the Coordinator view only. Do not change anything else in the file.

Change 1 — Replace existing two tabs with three tabs:
The Assignment Tool page currently has two tabs "Unassigned Courses" and "Assign Lecturer" — replace these with three tabs styled exactly the same way — same font, same dark maroon active underline, same inactive grey text, same thin light grey divider line below the tab row:

Tab 1: "Unassigned Courses"
Tab 2: "Assign Lecturer" — this is the DEFAULT active tab
Tab 3: "Manage Exemptions"


Change 2 — Tab 2 "Assign Lecturer": clean up content

Keep all existing Assignment Tool content exactly as it is — Select Course Section dropdown, Assign to Lecturer dropdown with "Only showing staff with available capacity" subtitle, Add Moderator (Optional) section, Send Assignment button, Live Analytics sidebar
Remove the Administrative Status section entirely from this tab — it no longer belongs here
Do not change anything else in this tab


Change 3 — Tab 3 "Manage Exemptions": new content
This tab is dedicated entirely to managing administrative exemptions for lecturers. Layout:
Page description directly below the tab row in small grey italic text: "Set or modify administrative exemptions for lecturers on leave, adjunct status, or borrowed staff. Exempted lecturers may freely decline assignments regardless of their current credit total." — same small grey font as all other helper/subtitle text in the prototype
Lecturer selector at the top:

Bold dark label "Select Lecturer" above
A dropdown showing all staff names — same dropdown style as all other dropdowns in the prototype
Show two pre-built states based on which lecturer is selected:

State A — Dr. Aisyah Rahman selected (no exemption)
State B — Dr. Ahmad Hassan selected (active exemption)



State A — Dr. Aisyah Rahman selected:
Below the lecturer dropdown show a white card with light grey border containing:

Small grey shield icon on the left
Bold dark text: "No Exemptions Active"
Small grey text below: "Standard workload policies apply. This lecturer must meet the 12-credit minimum before declining assignments."
"Manage Status" button on the far right — same outlined button style with dark maroon border and text as existing Cancel/outlined buttons in the prototype
Clicking "Manage Status" opens the exemption modal (same modal as previously designed — Status Type dropdown, mandatory Expiry Date field with red asterisk, Exemption toggle, amber info box, Cancel and Save Status buttons)

State B — Dr. Ahmad Hassan selected:
Below the lecturer dropdown show a white card with light grey border and subtle amber left border accent containing:

Small amber shield icon on the left
Bold dark text: "Exemption Active — Maternity Leave"
Small grey text below: "12-credit minimum check bypassed · Expires: Dec 31, 2026"
Small green "Active" pill badge on the far right — same green pill style as "Accepted" badges in Assignment Status Board
"Manage Status" button next to the Active badge — same outlined button style
Clicking "Manage Status" opens the exemption modal pre-filled with Dr. Ahmad Hassan's current exemption data — Status Type showing "Maternity Leave", Expiry Date showing "12/31/2026", toggle showing ON/Active

Exemption modal design (same for both states, opens on "Manage Status" click):

Centered modal, dark background overlay, white card, rounded corners, light grey border, × close button top right
Title: "Manage Administrative Status" in bold dark text
Subtitle: "Toggle exemption flag to allow this lecturer to bypass the 12-credit minimum rejection check" in small grey text
Thin light grey divider below subtitle
Field 1 — Lecturer (read-only): bold text showing selected lecturer name, small grey Staff ID below
Field 2 — Status Type* (required): dropdown with Maternity Leave / Adjunct Status / Borrowed Staff — same dropdown style as all other dropdowns in prototype — red asterisk on label
Field 3 — Expiry Date* (mandatory): label "Expiry Date *" with red asterisk — date input mm/dd/yyyy — small red helper text below: "An expiry date is required for all administrative exemptions" — same small red validation text as other required field messages in prototype
Field 4 — Exemption Status toggle: rounded pill toggle — OFF state grey with "Inactive — Standard policies apply" in grey text — ON state dark maroon with "Active — 12-credit minimum bypassed" in dark maroon text
Small amber info box below toggle — light amber background, amber left border, small text: "When active, this lecturer can freely decline assignments even if their total credits are below 12. This prevents false compliance errors for staff on administrative leave." — same info box style as NFR-03 Compliance box on Export Reports page
Two buttons bottom right: "Cancel" — white background dark maroon border and text — "Save Status" — solid dark maroon background white text — same styles as existing buttons throughout prototype

Below the status card — Exemption Summary table:

Section title "Current Department Exemptions" in bold dark text
Small grey subtitle: "All staff currently on active administrative exemption"
White card container, light grey border, same table style as all other tables in prototype
Column headers in small caps light grey: STAFF NAME | STATUS TYPE | EXPIRY DATE | EXEMPTION STATUS
One row showing Dr. Ahmad Hassan's active exemption:

Dr. Ahmad Hassan | Maternity Leave | Dec 31, 2026 | small green "Active" pill badge


Thin light grey divider lines between rows, white row backgrounds
If no exemptions are active, show a small grey centered text: "No active exemptions this semester"


DO NOT change anything else:

Do not touch Tab 1 "Unassigned Courses" content
Do not touch the Live Analytics sidebar
Do not touch any other pages in the file
Do not change the Lecturer view or Lecturer on Leave view in any way
Do not change any fonts, colours, spacing, card styles, badge styles, table styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in any view