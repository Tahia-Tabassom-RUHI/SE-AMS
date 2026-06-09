I need you to redesign only the Dashboard page for both the Coordinator view and the Lecturer view. Do not change any other pages, sidebar items, navigation bar, or global styles. Every element must follow the exact same design language already used throughout the prototype — same fonts, same card styles, same colours, same spacing, same badge styles, same button styles.

COORDINATOR DASHBOARD REDESIGN:
Keep the page title "Department Operations" and subtitle "Overview of current semester progress and management tasks" exactly as they are.
Top stat cards row — 3 cards in a horizontal row, same white card style with light grey border as existing:

Card 1: Label "Unassigned Sections", value 12 in large bold orange/yellow text (same orange as under-allocated colour), icon: person with plus sign in orange circle top right, subtitle "Awaiting lecturer assignment" in small grey text
Card 2: Label "Pending Lecturer Responses", value 7 in large bold dark maroon text, icon: clipboard checklist in maroon circle top right, subtitle "Awaiting accept/reject decision" in small grey text
Card 3: Label "Staff Over Credit Limit", value 1 in large bold red text, icon: warning exclamation in red circle top right, subtitle "Requires immediate attention" in small grey text — this card should have a very subtle red tinted border to draw attention

Middle section — two columns side by side:
Left column — "Priority Alerts" card (white card, light grey border, same as existing):

Section title "Priority Alerts" in bold dark text, subtitle "Urgent issues requiring immediate attention" in small grey text — same as existing
Keep all 4 existing alert rows exactly as they are in style and content:

🔴 CS303-02: Lab capacity exceeded (42/35 students)
🟡 Dr. Ahmad Hassan has exceeded 15-credit limit (16.0 credits)
🟡 MA101-01: No moderators assigned
🔴 3 sections require lecturer assignment by May 5


BUT add a small dark maroon text link "Fix Now →" on the right side of each alert row, same small font as the alert text, aligned to the right edge of the card

CS303-02 alert → "Fix Now →" links to Lab Resource Planner
Dr. Ahmad Hassan alert → "Fix Now →" links to Assignment Status Board
MA101-01 alert → "Fix Now →" links to Course & Moderator Manager
3 sections alert → "Fix Now →" links to Assignment Tool


Same coloured dot indicators on far right as existing (red dot, orange dot)

Right column — Replace "Management Toolbox" with a new card called "Department Snapshot" (white card, light grey border, same dimensions as existing Management Toolbox card):

Section title "Department Snapshot" in bold dark text, subtitle "Current semester staff workload overview" in small grey text
A small 3-column summary row with thin dividers between each:

"At Optimal Load" | value 5 | in bold green text (same green as 12-15 optimal colour)
"Under-allocated" | value 3 | in bold orange text (same orange as under-12 colour)
"Over-allocated" | value 1 | in bold red text (same red as over-15 colour)
Labels in small grey text below each number


A thin light grey divider line below the summary row
A subsection title "Urgent Unassigned Courses" in small bold dark text
Three rows listing the most urgent unassigned courses, each row showing:

Course code in bold dark maroon text | Course name in regular dark text | small red pill badge "Due May 5" in the same pill badge style as status badges throughout the prototype
Row 1: CS301 | Operating Systems | Due May 5
Row 2: CS401 | Computer Networks | Due May 5
Row 3: MA202 | Linear Algebra | Due May 6


Thin light grey divider lines between each course row
A small dark maroon "View All in Assignment Tool →" text link at the bottom right of the card, same small font style

Calendar section (bottom) — keep the June 2026 calendar structure exactly as is but populate with events:

June 5 (Friday): small red dot with label "CS202 Deadline"
June 6 (Saturday): small red dot with label "CS301 Deadline"
June 7 (Sunday): small orange dot with label "CS401 Due"
June 10 (Wednesday): small dark maroon dot with label "Dept Meeting"
June 15 (Monday): small orange dot with label "MA202 Due"
Dot colours must match the legend exactly
Update the calendar legend at the bottom to show: 🔴 Deadline 🟤 Meeting 🟠 Assignment
Keep the calendar navigation arrows, month/year title, and day headers exactly as they are


LECTURER DASHBOARD REDESIGN:
Keep the page title "My Dashboard" and subtitle "Personal workspace for individual tasks and workload compliance" exactly as they are.
Top stat cards row — keep existing 2 cards, same style:

Card 1: "Currently Accepted Sections" value 4, subtitle "Active course assignments" — keep exactly as is including the green checkmark circle icon
Card 2: "Total Calculated Credit Hours" value 13.0, change subtitle from "Current semester workload" to "Current semester credits" — keep the open book icon exactly as is

Workload Compliance Monitor section — keep exactly as is:

Keep the section title, progress bar, 13.0 credits label, the green filled bar, the 15-credit red marker, the striped pink overflow zone, and all legend dots exactly as they are
Only change: replace the label "Current Load" with "Current Credits" — same small grey font, same position

Middle section — three columns side by side (same layout as existing Task Inbox / Recent Activities / Quick Access):
Left column — Replace "Task Inbox" with "My Action Items" card (white card, light grey border):

Section title "My Action Items" in bold dark text, same style as existing "Task Inbox"
Red notification badge showing 4 on the top right of the card title — same red circle badge style as existing
First row: bell icon in light red/pink background circle | bold text "New Pending Assignments" | grey subtitle "4 courses awaiting your response" — same row style as existing Task Inbox notification row
Second row: clock/timer icon in light orange background circle | bold dark maroon text "CS202 expires in 23h" | grey subtitle "Respond before Jun 6, 11:59 PM" — add a small red "Urgent" pill badge on the right side of this row, same pill badge style as status badges
Dark maroon "View Pending Queue" button below both rows — same full-width dark maroon button style as existing "View Pending Queue" button, same text, same style exactly

Middle column — Replace "Recent Activities" with "My Teaching Overview" card (white card, light grey border):

Section title "My Teaching Overview" in bold dark text
Small dark maroon "View All →" text link on the top right, same style as existing "View all >" link
A mini table inside the card with no visible borders, just thin divider lines between rows:

Row 1: CS101 in bold dark maroon | "Introduction to Programming" in regular dark text | small teal/green "Teaching" badge | "3 CR" in small grey text
Row 2: CS205 in bold dark maroon | "Algorithms" in regular dark text | small teal/green "Teaching" badge | "3 CR" in small grey text
Row 3: CS303 in bold dark maroon | "Database Systems" in regular dark text | small purple "Moderator" badge | "0.5 CR" in small grey text
Row 4: SCSE2243 in bold dark maroon | "Software Engineering" in regular dark text | small teal/green "Teaching" badge | "3 CR" in small grey text
Badge styles must match exactly the Teaching and Moderator badges used in My Queue and My Courses pages


Small grey "Total: 13.0 CR across 4 sections" summary text at the bottom of the card

Right column — Replace "Quick Access" with "My Research Summary" card (white card, light grey border):

Section title "My Research Summary" in bold dark text
Small dark maroon "View All →" text link on the top right
Four small stat items in a 2x2 grid inside the card:

Top left: "Total Activities" | value 3 in bold dark text
Top right: "Total Hours" | value 215h in bold dark text
Bottom left: "Research Projects" | value 1 in bold purple text (same purple as Research badge colour)
Bottom right: "Active Grants" | value 1 in bold orange/gold text (same gold as Grant badge colour)
Each item: label in small grey text above, value in bold larger text below, thin light grey border separating the 4 grid cells


A thin light grey divider line below the grid
A single recent activity row: activity icon in light purple background circle | bold text "Kuala Lumpur Tech Outreach" | small light blue "Service" badge | grey text "Apr 25, 2026 · 15h" — same row style as existing Recent Activities rows

Calendar section (bottom) — keep June 2026 calendar structure exactly as is but populate with events:

June 6 (Saturday): small red dot with label "CS202 Deadline"
June 7 (Sunday): small red dot with label "CS101 Deadline"
March 15: small green dot — skip this, only show June events since calendar shows June 2026
June 25 (Thursday): small green dot with label "Activity Due"
Update the calendar legend at the bottom to show: 🔴 Assignment Deadline 🟢 Activity Submitted 🟤 Meeting
Keep calendar navigation arrows, month/year title, and day headers exactly as they are


DO NOT change anything else:

Do not touch My Queue, My Courses, My Activity Tracker, Course & Moderator Manager, Student Segmentation, Lab Resource Planner, Assignment Tool, Assignment Status Board, Staff Activity Tracker, Export Reports, Profile & ORCID Setup, or Login pages
Do not change the top navigation bar, UTM logo, search bar, notification bell, or user profile area in any view
Do not change any fonts, colours, spacing, card styles, badge styles, table styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in either view
Do not add or remove any sidebar items