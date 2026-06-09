I need you to add a new "My Courses" page to both the Lecturer view and the Coordinator view. Do not change anything else in the file other than what is specified below.

SIDEBAR CHANGE (both views):

In the Lecturer sidebar, add "My Courses" as a new navigation item positioned between "My Queue" and "My Activity Tracker"
Use the exact same sidebar item styling as all other sidebar items — same icon size, same font size, same font weight, same hover/active state in dark maroon with light pink background
Use a book or graduation cap icon for My Courses — matching the existing icon style (outlined, not filled) used throughout the sidebar
In the Coordinator sidebar, add "My Courses" in the same position — between "My Queue" and "My Activity Tracker"


MY COURSES PAGE LAYOUT (identical for both views):
Page header:

Title: "My Courses" — same large bold dark text style as "My Activity Tracker", "Staff Activity Tracker", "Export Reports" page titles
Subtitle: "Your confirmed teaching assignments for the current semester" — same small grey regular text style used on all other page subtitles

Three summary stat cards (same style as the cards on My Queue and My Activity Tracker):

Card 1: Label "Accepted Courses", value in large bold black text, small grey subtitle "Current semester assignments", white card with light grey border, same dimensions as existing stat cards
Card 2: Label "Total Credits", value in large bold dark maroon text (same maroon as sidebar active colour), small grey subtitle "Out of 15.0 credit limit", white card with light grey border
Card 3: Label "Remaining Capacity", value in large bold green text if above 0 or red text if 0 or negative (same green as the optimal workload bar, same red as the over-allocated indicator), small grey subtitle "Credits before limit", white card with light grey border

Workload progress bar (same style as "My Semester Workload" in My Queue page):

Section title: "My Semester Workload" with the trending-up chart icon in dark maroon, bold text — exactly matching the My Queue version
Show current accepted credits vs 15.0 limit on the right side in the same format "X.0 / 15.0 Credits"
Progress bar: filled dark maroon/green depending on load level, with the 15-credit red marker line, same striped pink overflow zone if over 15
Legend below bar: same four indicators as My Queue — Accepted (CR), Pending (CR), Under 12, 12-15 Optimal, Over 15 — same coloured dot style

Courses table:

White card container with light grey border, same as all other tables in the prototype
Column headers in small caps light grey text, same style as the TITLE / TYPE / HOURS SPENT headers in My Activity Tracker and STATUS / COURSE DETAILS headers in My Queue:

COURSE CODE | COURSE NAME | SECTION | ROLE TYPE | CREDITS | STUDENTS | SEMESTER


Each row:

COURSE CODE: bold dark text e.g. "CS101"
COURSE NAME: regular dark text e.g. "Introduction to Programming"
SECTION: small grey pill badge with "Sec 01" — same section badge style as in My Queue
ROLE TYPE: coloured pill badge — "Teaching" in teal/green same as My Queue Teaching badge, "Moderator" in purple same as My Queue Moderator badge
CREDITS: bold dark text with "CR" in small grey text below, same style as credit display in My Queue
STUDENTS: number with small person icon in green, same style as student count in My Queue rows
SEMESTER: plain grey text e.g. "Spring 2026"


Thin light grey divider lines between each row, no row background colour, white rows only
No action buttons — this is a read-only page

Populate with this sample data for Lecturer view (Siti Aminah):

CS205 | Algorithms | Sec 01 | Teaching | 3 CR | 32 students | Spring 2026
CS101 | Introduction to Programming | Sec 01 | Teaching | 3 CR | 45 students | Spring 2026
CS303 | Database Systems | Sec 01 | Moderator | 0.5 CR | 35 students | Spring 2026

Populate with this sample data for Coordinator view (Zatul Alwani):

SCSE2243 | Software Engineering | Sec 01 | Teaching | 3 CR | 40 students | Spring 2026
CS303 | Database Systems | Sec 01 | Moderator | 0.5 CR | 35 students | Spring 2026


My Queue greyed-out button fix (both views):

On the My Queue page, for any "Accept Assignment" button that is currently greyed out/disabled, add a tooltip that appears on hover
Tooltip text: "Accepting this assignment would exceed your 15-credit semester limit"
Tooltip style: small dark charcoal/near-black rounded rectangle, white text, small font, appears above the button on hover — same tooltip style if any already exists in the file, otherwise use this standard style
Do not change the button colour, size, position, or any other styling on the My Queue page


DO NOT change anything else:

Do not touch Dashboard, My Activity Tracker, Activity Log Portal, Course & Moderator Manager, Student Segmentation, Lab Resource Planner, Assignment Tool, Assignment Status Board, Staff Activity Tracker, Export Reports, Profile & ORCID Setup, or Login pages
Do not change the top navigation bar, UTM logo, search bar, notification bell, or user profile area in any view
Do not change any existing fonts, colours, spacing, card styles, badge styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in either view