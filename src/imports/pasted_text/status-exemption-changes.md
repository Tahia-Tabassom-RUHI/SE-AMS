I need you to make two changes. First, implement the coordinator side of the Status Exemption Override feature. Second, create a new third role view called "Lecturer on Leave" that shows what an exempted lecturer sees. Do not change anything else in the file.

PART 1 — COORDINATOR VIEW CHANGES:
Change 1 — Assignment Tool: Administrative Status section
Keep the existing default state exactly as is. Add a second active exemption state shown when Dr. Ahmad Hassan is selected in the lecturer dropdown:

Replace the grey text with: small amber shield icon + bold dark text "Exemption Active — Maternity Leave" + small grey text below "12-credit minimum check bypassed · Expires: Dec 31, 2026" + small green "Active" pill badge on the far right — same green pill style as "Accepted" badges in Assignment Status Board
"Manage Status" button stays in exact same position and style

Change 2 — Assignment Tool: "Manage Status" modal
When "Manage Status" is clicked, show a centered modal with dark background overlay, white card, rounded corners, light grey border, × close button top right — same modal style as any existing modals in the prototype:

Title: "Manage Administrative Status" in bold dark text
Subtitle: "Toggle exemption flag to allow this lecturer to bypass the 12-credit minimum rejection check" in small grey text
Thin light grey divider below subtitle
Four fields in this exact order:

Lecturer (read-only): bold text "Dr. Ahmad Hassan", small grey "Staff ID: UTM-LEC-004" below
Status Type* (required): dropdown with Maternity Leave / Adjunct Status / Borrowed Staff — show "Maternity Leave" pre-selected — same dropdown style as all other dropdowns in prototype
Expiry Date (optional): date input mm/dd/yyyy — show "12/31/2026" pre-filled — same date field as My Activity Tracker filter — small grey helper text: "Leave blank for indefinite exemption"
Exemption Status toggle: rounded pill toggle — OFF state grey with "Inactive — Standard policies apply" in grey text — ON state dark maroon with "Active — 12-credit minimum bypassed" in dark maroon text — show as ON for this example


Small amber info box below toggle — light amber background, amber left border, small text: "When active, this lecturer can freely decline assignments even if their total credits are below 12. This prevents false compliance errors for staff on administrative leave." — same info box style as NFR-03 Compliance box on Export Reports page
Two buttons bottom right: "Cancel" — white background dark maroon border and text — "Save Status" — solid dark maroon background white text — same styles as existing buttons throughout prototype

Change 3 — Assignment Tool: Assign to Lecturer dropdown

Dr. Ahmad Hassan shows a small amber pill badge labelled "Exempt" next to his name and credit count in the dropdown
All other lecturers show normally with no badge
Same pill badge style as all other badges in prototype, amber/yellow background, dark text

Change 4 — Assignment Status Board

Dr. Ahmad Hassan's rows show a small amber "Exempt" pill badge directly next to his name in the LECTURER NAME column
Do not change anything else on this page


PART 2 — NEW "LECTURER ON LEAVE" VIEW:
Create a complete third role view in the prototype. This view represents a lecturer who has an active administrative exemption. Use Dr. Noor Hayati as the lecturer on leave for this view.
Login page — add a third demo account:

Add a third demo account row in the login page demo accounts section below the existing two:

Label: "Lecturer (On Leave): onleave@utm.my"
Same styling as the existing "Coordinator: coordinator@utm.my" and "Lecturer: lecturer@utm.my" rows
Password remains the same: utm123



Top navigation bar:

Show "NH" initials circle, name "Dr. Noor Hayati", and a special amber pill badge labelled "On Leave" instead of the green "Lecturer" badge — same pill badge position and style as the existing "Lecturer" badge, just amber/yellow background with dark text "On Leave"

Sidebar — same as regular Lecturer view:

Dashboard, My Queue, My Courses, My Activity Tracker — exactly the same items and styling as the regular lecturer sidebar

Dashboard — same as regular Lecturer dashboard with one addition:

Keep all existing dashboard content exactly the same as the regular Lecturer dashboard
Add a prominent amber notice banner at the very top of the dashboard content area above the stat cards:

Light amber background, amber left border, amber shield icon on left
Bold dark text: "You are currently on Administrative Leave — Maternity Leave"
Small grey text below: "Your 12-credit minimum workload requirement is waived. You may decline all assignments freely. Exemption expires: Dec 31, 2026"
Same banner dimensions and style as the red warning banner on My Queue page, just amber colour



My Queue page — exemption active state:

Add the same amber notice banner directly below the three stat cards and above My Semester Workload section:

Light amber background, amber left border, amber shield icon
Bold dark text: "Administrative Exemption Active — Maternity Leave"
Small grey text below: "You may decline assignments freely regardless of your current credit total. Exemption expires: Dec 31, 2026"


All Decline buttons fully enabled on every row — same red outlined "× Decline" button style as currently active Decline buttons, no greying out on any row regardless of credit total
All Accept Assignment buttons fully enabled — same green filled button style
Add small amber "Exempt" pill badge next to the credit value inside the Current Credits stat card
Workload bar shows in orange (under-12 colour) with small amber text next to credit label: "Exemption active — 12-credit minimum floor waived"
Remove any red minimum credit warning banners for this view
Keep the 15-credit maximum red marker line and striped pink overflow zone exactly as they are

My Courses page — same as regular Lecturer My Courses:

Keep all content exactly the same as regular lecturer My Courses
Add small amber "On Leave" pill badge next to the page title — same badge style, amber background

My Activity Tracker page — same as regular Lecturer My Activity Tracker:

No changes needed — activity tracking works the same regardless of exemption status


DO NOT change anything else:

Do not touch the regular Lecturer view in any way
Do not touch the regular Coordinator view except for the 4 changes in Part 1
Do not touch My Activity Tracker, Course & Moderator Manager, Student Segmentation, Lab Resource Planner, Staff Activity Tracker, Export Reports, or Profile & ORCID Setup pages
Do not change the top navigation bar, UTM logo, or search bar globally
Do not change any fonts, colours, spacing, card styles, badge styles, table styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in any view