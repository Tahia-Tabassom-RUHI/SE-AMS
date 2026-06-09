I need you to make the following specific changes across the prototype. Do not change anything other than what is listed below.

Fix 1 — Data Consistency: My Courses page (BOTH Lecturer and Coordinator views)
The numbers on My Courses must match exactly what is shown on My Queue and the Dashboard for each role.
Lecturer view (Siti Aminah) — update My Courses to match My Queue data:

My Queue shows Current Load as 6.0 / 15.0 Credits accepted
Update the My Courses stat cards to:

"Accepted Courses" card value: 4 (matching 4 accepted assignments in queue)
"Total Credits" card value: 13.0 in dark maroon (matching dashboard which shows 13.0 credits)
"Remaining Capacity" card value: 2.0 in green text (15.0 minus 13.0)
Subtitle under Total Credits: "Out of 15.0 credit limit" — keep as is
Subtitle under Remaining Capacity: "Credits before limit" — keep as is


Update the My Semester Workload progress bar:

Filled bar value: 13.0
Right side label: 13.0 / 15.0 Credits in dark maroon text
Bar colour: green (same as optimal range colour) since 13.0 is within the 12-15 optimal band
Legend: Accepted (13.0 CR) — update the CR number only
Remove the "EXCEEDS LIMIT" red text since 13.0 does not exceed 15


Update the courses table rows to match accepted courses from My Queue:

CS101 | Introduction to Programming | Sec 01 | Teaching | 3 CR | 45 students | Spring 2026
CS205 | Algorithms | Sec 01 | Teaching | 3 CR | 32 students | Spring 2026
CS205 | Algorithms | Sec 01 | Teaching | 3 CR | 32 students | Spring 2026
CS303 | Database Systems | Sec 01 | Moderator | 0.5 CR | 35 students | Spring 2026
SCSE2243 | Software Engineering | Sec 01 | Teaching | 3 CR | 40 students | Spring 2026



Coordinator view (Zatul Alwani) — update My Courses to match Dashboard data:

The coordinator dashboard shows the coordinator also has teaching assignments
Update the My Courses stat cards to:

"Accepted Courses" card value: 2
"Total Credits" card value: 3.5 in dark maroon
"Remaining Capacity" card value: 11.5 in green text


Keep the courses table rows as they are (SCSE2243 and CS303) — these are already correct
Update the My Semester Workload progress bar:

Filled bar value: 3.5
Right side label: 3.5 / 15.0 Credits in orange text (since 3.5 is under 12, use the under-allocated orange colour)
Bar colour: orange (same under-12 colour used in My Queue)
Legend: Accepted (3.5 CR) — update the CR number only




Fix 2 — Assignment Tool page: rename and add helper text (Coordinator view only)

Find the "Quality Assurance (Optional)" section title on the Assignment Tool page
Change the title to: "Add Moderator (Optional)" — keep same bold dark text style, same info icon, same collapse chevron
Add a small grey subtitle line directly below the title: "You can also manage or change moderators later via Course & Moderator Manager"
Same small grey regular font as all other helper/subtitle text in the prototype
Do not change anything else on the Assignment Tool page


Fix 3 — Course & Moderator Manager page: update subtitle and improve moderator dropdown (Coordinator view only)

Change the page subtitle from "Audit all section assignments and manage optional quality assurance roles" to: "Central place to add, change, or remove moderators for all assigned courses. Initial moderator setup can also be done during assignment in the Assignment Tool."
Same small grey regular font, same position, same style
Update the "+ Add Moderator" dropdown that appears when clicking the button in the Moderator 1 or Moderator 2 columns — make it match the moderator dropdown style already used in the Assignment Tool:

Each staff name in the dropdown must show a dark maroon pill badge on the right showing their current moderation count e.g. "1 moderation", "2 moderations", "3 moderations" — exact same pill badge style as the Assignment Tool moderator dropdown
Staff who already have 3 or more moderations must appear greyed out in the dropdown with a small red "At limit" tag next to their name instead of the count badge — to prevent over-assignment
Staff with 0 moderations show a grey "0 moderations" badge


Add a small grey italic helper text line directly below the MODERATOR 1 (OPTIONAL) column header that reads: "Staff with 3+ moderations are flagged"
Same small grey font as other helper text in the prototype
Do not change anything else on the Course & Moderator Manager page — do not touch the filter section, stat cards, table rows, lecturer names, assignment status badges, or action icons


Fix 4 — My Queue page: tooltip on disabled Accept buttons (BOTH views)

On the My Queue page, for any "Accept Assignment" button that is currently greyed out or disabled, add a hover tooltip
Tooltip text: "Accepting this assignment would exceed your 15-credit semester limit"
Tooltip style: small dark charcoal rounded rectangle, white text, small font, appears above the button on hover
Do not change the button styling, size, colour, or position
Do not change anything else on the My Queue page


DO NOT change anything else:

Do not touch the Dashboard, Activity Log Portal, Student Segmentation, Lab Resource Planner, Assignment Status Board, Staff Activity Tracker, Export Reports, Profile & ORCID Setup, or Login pages
Do not change the top navigation bar, UTM logo, search bar, notification bell, or user profile area in any view
Do not change any existing fonts, colours, spacing, card styles, badge styles, table styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in either view
Do not change the Coordinator view's Staff Activity Tracker data