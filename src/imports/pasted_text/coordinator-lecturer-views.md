I need you to implement the Status Exemption Override feature across the Coordinator view and create a new "Lecturer on Leave" third role view. Use Dr. Ahmad Hassan as the exempted lecturer example in coordinator view and Dr. Noor Hayati as the lecturer on leave in the new role view. Do not change anything other than what is listed below.

PART 1 — COORDINATOR VIEW:
Change 1 — Assignment Tool: Administrative Status section two states
The "Administrative Status" section already exists on the Assignment Tool page with a "Manage Status" button and text "No exemptions active. Standard workload policies apply." — keep this default state exactly as is and add a second active state:
Active exemption state — shown when Dr. Ahmad Hassan is selected in the lecturer dropdown:

Small amber shield icon on the left
Bold dark text: "Exemption Active — Maternity Leave"
Small grey text below: "12-credit minimum check bypassed · Expires: Dec 31, 2026"
Small green "Active" pill badge on the far right — same green pill style as "Accepted" badges in Assignment Status Board
"Manage Status" button stays in exact same position and style

Change 2 — Assignment Tool: "Manage Status" modal
Clicking "Manage Status" opens a centered modal with dark background overlay, white card, rounded corners, light grey border, × close button top right:

Title: "Manage Administrative Status" in bold dark text
Subtitle: "Toggle exemption flag to allow this lecturer to bypass the 12-credit minimum rejection check" in small grey text
Thin light grey divider below subtitle
Four fields in this exact order:

Field 1 — Lecturer (read-only):

Small grey label "Lecturer" above
Bold dark text: "Dr. Ahmad Hassan"
Small grey text below: "Staff ID: UTM-LEC-004"

Field 2 — Status Type (required):

Small grey label "Status Type *" with red asterisk above
Dropdown with three options — same style as all other dropdowns in prototype:

Maternity Leave
Adjunct Status
Borrowed Staff


Show "Maternity Leave" pre-selected

Field 3 — Expiry Date (MANDATORY):

Small grey label "Expiry Date *" with red asterisk above — this field is required not optional
Date input field mm/dd/yyyy placeholder — same date field style as My Activity Tracker filter
Small red helper text below: "An expiry date is required for all administrative exemptions" — same small red validation text style as other required field messages in prototype
Show "12/31/2026" pre-filled for this example

Field 4 — Exemption Status toggle:

Small grey label "Exemption Status" above
Rounded pill toggle:

OFF state: grey toggle, "Inactive — Standard policies apply" in grey text to the right
ON state: dark maroon toggle, "Active — 12-credit minimum bypassed" in dark maroon text to the right


Show as ON for this example
Small amber info box below toggle — light amber background, amber left border, small text: "When active, this lecturer can freely decline assignments even if their total credits are below 12. This prevents false compliance errors for staff on administrative leave." — same info box style as NFR-03 Compliance box on Export Reports page

Two buttons at bottom right:

"Cancel" — white background, dark maroon border and text, same outlined style as existing Cancel buttons
"Save Status" — solid dark maroon background, white text, same style as "Send Assignment" and "Generate Full Report" buttons

Change 3 — Assignment Tool: Assign to Lecturer dropdown

Dr. Ahmad Hassan shows a small amber pill badge labelled "Exempt" next to his name and credit count in the dropdown
All other lecturers show normally with no badge
Same pill badge style as all other badges in prototype, amber/yellow background, dark text

Change 4 — Assignment Status Board

Dr. Ahmad Hassan's rows show a small amber "Exempt" pill badge directly next to his name in the LECTURER NAME column
Do not change anything else on this page

Change 5 — Coordinator Dashboard calendar

Add one amber event dot on June 30 (last visible day) with label "Dr. Noor Hayati — Leave Expires Dec 31"
Add "🟡 Leave Expiry" to the calendar legend — same dot style as existing legend items, amber colour
Do not change any other existing calendar dots, labels, or legend items


PART 2 — NEW "LECTURER ON LEAVE" VIEW:
Create a complete third role view. This represents a lecturer with an active administrative exemption. Use Dr. Noor Hayati as the lecturer on leave.
Login page — add a third demo account row:

Add below the existing two demo account rows:

"Lecturer (On Leave): onleave@utm.my"
Same styling as existing "Coordinator: coordinator@utm.my" and "Lecturer: lecturer@utm.my" rows
Password: utm123



Top navigation bar:

Initials circle: "NH"
Name: "Dr. Noor Hayati"
Role badge: amber/yellow pill badge labelled "On Leave" — same position and style as the green "Lecturer" badge, just amber background with dark text

Sidebar — same four items as regular Lecturer view:

Dashboard, My Queue, My Courses, My Activity Tracker — exactly same styling as regular lecturer sidebar

Dashboard page:

Keep all existing Lecturer dashboard content exactly the same
Add a prominent amber notice banner at the very top of the dashboard content area above the stat cards:

Light amber background, amber left border accent, amber shield icon on left
Bold dark text: "You are currently on Administrative Leave — Maternity Leave"
Small grey text below: "Your 12-credit minimum workload requirement is waived. You may decline all assignments freely. Exemption expires: Dec 31, 2026"
Same banner dimensions and style as the red warning banner on My Queue page, just amber colour


Add one amber event dot on June 30 in the calendar with label "My Leave Expires Dec 31"
Add "🟡 Leave Expiry" to the calendar legend — same dot style, amber colour
Do not change any other calendar dots or legend items

My Queue page:

Add amber notice banner directly below the three stat cards and above My Semester Workload section:

Light amber background, amber left border, amber shield icon on left
Bold dark text: "Administrative Exemption Active — Maternity Leave"
Small grey text below: "You may decline assignments freely regardless of your current credit total. Exemption expires: Dec 31, 2026"
Same banner dimensions and style as the red warning banner on My Queue, just amber colour


All Decline buttons fully enabled on every row — same red outlined "× Decline" style as currently active Decline buttons, no greying out on any row regardless of credit total
All Accept Assignment buttons fully enabled — same green filled button style
Add small amber "Exempt" pill badge next to the credit value inside the Current Credits stat card
Workload bar shows in orange (under-12 colour) if credits below 12 — same orange as under-12 colour throughout prototype
Replace any red minimum credit warning text with small amber text: "Exemption active — 12-credit minimum floor waived" — same small font as other helper text, amber colour
Keep the 15-credit maximum red marker line and striped pink overflow zone exactly as they are

My Courses page:

Same content as regular Lecturer My Courses
Add small amber "On Leave" pill badge next to the page title — same badge style, amber background

My Activity Tracker page:

Exactly the same as regular Lecturer My Activity Tracker — no changes needed


DO NOT change anything else:

Do not touch the regular Lecturer view in any way
Do not touch the regular Coordinator view except for the 5 changes in Part 1
Do not touch My Activity Tracker, Course & Moderator Manager, Student Segmentation, Lab Resource Planner, Staff Activity Tracker, Export Reports, or Profile & ORCID Setup pages
Do not change the top navigation bar, UTM logo, or search bar globally
Do not change any fonts, colours, spacing, card styles, badge styles, table styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in any view