I need you to implement the Status Exemption Override feature across both the Coordinator view and Lecturer view. This feature allows coordinators to toggle an exemption flag on specific lecturers who are on administrative leave, adjunct status, or borrowed staff — exempting them from the 12-credit minimum workload rejection check. Use Dr. Ahmad Hassan as the example lecturer with an active exemption throughout. Do not change anything other than what is listed below.

COORDINATOR VIEW — 4 changes:
1. Assignment Tool — Administrative Status section:

Keep the existing default state exactly as is: grey shield icon, "No exemptions active. Standard workload policies apply.", "Manage Status" button on the right
Add a second active exemption state shown when Dr. Ahmad Hassan is selected in the lecturer dropdown:

Replace grey text with amber shield icon + bold text "Exemption Active — Maternity Leave" + small grey text below "12-credit minimum check bypassed · Expires: Dec 31, 2026" + small green "Active" pill badge on the far right — same green pill as "Accepted" badges in Assignment Status Board
"Manage Status" button stays in exact same position and style



2. Assignment Tool — "Manage Status" modal:

Clicking "Manage Status" opens a centered modal with dark background overlay, white card, rounded corners, light grey border, × close button top right
Modal title: "Manage Administrative Status" in bold dark text
Modal subtitle: "Toggle exemption flag to allow this lecturer to bypass the 12-credit minimum rejection check" in small grey text
Thin light grey divider below subtitle
Four fields in this order:

Lecturer (read-only): bold text "Dr. Ahmad Hassan", small grey text below "Staff ID: UTM-LEC-004"
Status Type* (required): dropdown with options Maternity Leave / Adjunct Status / Borrowed Staff — show "Maternity Leave" pre-selected — same dropdown style as all other dropdowns in the prototype
Expiry Date (optional): date input mm/dd/yyyy — show "12/31/2026" pre-filled — same date field style as My Activity Tracker filter — small grey helper text below: "Leave blank for indefinite exemption"
Exemption Status toggle: rounded pill toggle — OFF state is grey with label "Inactive — Standard policies apply" in grey text — ON state is dark maroon with label "Active — 12-credit minimum bypassed" in dark maroon text — show as ON for Dr. Ahmad Hassan example


Small amber info box below the toggle — light amber background, amber left border, small text: "When active, this lecturer can freely decline assignments even if their total credits are below 12. This prevents false compliance errors for staff on administrative leave." — same info box style as the NFR-03 Compliance box on Export Reports page
Two buttons bottom right: "Cancel" — white background dark maroon border and text same outlined style as existing Cancel buttons — "Save Status" — solid dark maroon background white text same style as "Send Assignment" and "Generate Full Report" buttons

3. Assignment Tool — Assign to Lecturer dropdown:

Dr. Ahmad Hassan must show a small amber pill badge labelled "Exempt" next to his name and credit count in the dropdown
All other lecturers show normally with no badge
Same pill badge style as all other badges in the prototype, amber/yellow background, dark text

4. Assignment Status Board:

Dr. Ahmad Hassan's rows must show a small amber "Exempt" pill badge directly next to his name in the LECTURER NAME column
Do not change anything else on this page — no other columns, badges, values, or elements


LECTURER VIEW — 3 changes:
5. My Queue — exemption notice banner:

Add an amber notice banner directly below the three stat cards and above the My Semester Workload section
Light amber background, amber left border accent — same dimensions and style as the existing red warning banner on My Queue, just amber colour instead of red
Small amber shield icon on the left
Bold dark text: "Administrative Exemption Active — Maternity Leave"
Small grey text below: "You may decline assignments freely regardless of your current credit total. Exemption expires: Dec 31, 2026"
This is an additional prototype state — do not remove or replace the existing default My Queue state

6. My Queue — all buttons fully enabled:

In the exemption active state all Decline buttons are fully enabled — same red outlined "× Decline" style as currently active Decline buttons, no greying out on any row
All Accept Assignment buttons remain fully enabled — same green filled button style as currently active Accept buttons
Add a small amber "Exempt" pill badge next to the credit value inside the Current Credits stat card — same pill badge style as all other badges in the prototype

7. My Queue — workload bar exemption state:

In the exemption active state the workload bar shows in orange (same under-12 orange colour used throughout the prototype) if credits are below 12
Remove any red minimum credit warning text or banners for this state only
Add small amber text next to the credit label: "Exemption active — 12-credit minimum floor waived" — same small font as other helper text, amber colour
Keep the 15-credit maximum red marker line and striped pink overflow zone exactly as they are — the maximum cap still applies


DO NOT change anything else:

Do not touch Dashboard, My Queue default state, My Courses, My Activity Tracker, Course & Moderator Manager, Student Segmentation, Lab Resource Planner, Staff Activity Tracker, Export Reports, Profile & ORCID Setup, or Login pages in either view
Do not change the top navigation bar, UTM logo, search bar, notification bell, or user profile area in any view
Do not change any fonts, colours, spacing, card styles, badge styles, table styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in either view
Do not change any existing default states of any page