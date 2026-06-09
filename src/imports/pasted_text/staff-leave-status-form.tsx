I need you to redesign only the content inside the "Staff Leave & Status" tab on the Assignment Tool page in the Coordinator view only. Replace the current three side-by-side cards with a single dynamic form layout. Do not change anything else in the file.

New layout structure:
Keep the existing "Select Lecturer" label and dropdown at the top exactly as is — same style, same position. Show Prof. Muhammad Ali as the default selected lecturer for the default state and Dr. Ahmad Hassan as the pre-filled example for the On Leave state.
Directly below the lecturer dropdown, add a Status Type selector row — three pill buttons side by side in a single row:

Pill 1: calendar icon + "On Leave"
Pill 2: person icon + "Adjunct Lecturer"
Pill 3: arrows/transfer icon + "Seconded Staff"
Pill button style: rounded pill shape, light grey background, dark grey text, same border radius as existing pill badges in the prototype
Active/selected state: dark maroon background, white text — same dark maroon as sidebar active colour and all primary buttons
All three pills are the same width, same height, evenly spaced in one row
Show "On Leave" as the active/selected pill by default for the Dr. Ahmad Hassan example
Add a small grey subtitle below the selector row: "Select the applicable situation for this staff member" — same small grey font as all other helper text in the prototype

Below the status type selector, a thin light grey divider line, then a single white form card with light grey border — same card style as all other cards in the prototype — that changes content based on which pill is selected:

Form content when "On Leave" is selected (default shown state):

Small grey italic description at top of card: "For staff temporarily away from work — maternity, medical, study, or annual leave. The leave period will appear on the department calendar."
Field 1: label *"Leave Type " with red asterisk — plain text input — placeholder "e.g. Maternity Leave, Medical Leave, Study Leave..." — show "Maternity Leave" pre-filled for Dr. Ahmad Hassan example — same text input style as Activity Title field in My Activity Tracker
Field 2: two date fields side by side:

Left: label *"Start Date " with red asterisk — date input mm/dd/yyyy — show "01/01/2026" pre-filled
Right: label *"End Date " with red asterisk — date input mm/dd/yyyy — show "12/31/2026" pre-filled
Same date field style as My Activity Tracker filter


Small red text below dates: "Both dates are required. Leave period will appear on the department calendar."
Small amber info box below — light amber background, amber left border, small text: "This lecturer will be able to freely decline assignments during the leave period without triggering a compliance error." — same info box style as NFR-03 Compliance box on Export Reports page
"Save Leave" button — full width, solid dark maroon background, white text — same style as "Send Assignment" and "Generate Full Report" buttons


Form content when "Adjunct Lecturer" is selected:

Small grey italic description at top of card: "For part-time lecturers hired from outside UTM who cannot carry a full 12-credit teaching load. This status remains active until manually turned off."
A rounded pill toggle switch:

OFF state: grey toggle, label "Not Active — Standard policies apply" in grey text to the right
ON state: dark maroon toggle, label "Active — 12-credit minimum bypassed" in dark maroon text to the right
Show as OFF for Prof. Muhammad Ali default state


When toggle is ON, show these fields below it:

Label *"Reason / Comments " with red asterisk
Multi-line text area — placeholder "Briefly explain this lecturer's adjunct arrangement, e.g. external industry expert hired for one semester..." — minimum 4 lines tall — same text area style as any existing text areas in prototype


Small grey text at bottom of card: "Adjunct status does not appear on the department calendar."
Small amber info box: "This lecturer will be able to freely decline assignments regardless of their current credit total." — same amber info box style as On Leave state
"Save Status" button — full width, solid dark maroon background, white text — greyed out/disabled when toggle is OFF, enabled when toggle is ON


Form content when "Seconded Staff" is selected:

Small grey italic description at top of card: "For staff temporarily working across departments — either joining us from another faculty, or our staff working elsewhere."
A rounded pill toggle switch — same style as Adjunct toggle:

OFF state: grey toggle, "Not Active — Standard policies apply" in grey text
ON state: dark maroon toggle, "Active — 12-credit minimum bypassed" in dark maroon text
Show as OFF for Prof. Muhammad Ali default state


When toggle is ON, show these two fields below it:

Field 1: label *"Home Department " with red asterisk — text input — placeholder "e.g. Faculty of Electrical Engineering, Faculty of Computing..." — same text input style
Field 2: label *"Reason / Comments " with red asterisk — multi-line text area — placeholder "Briefly explain the secondment arrangement..." — minimum 3 lines tall


Small grey text at bottom of card: "Seconded staff status does not appear on the department calendar."
Small amber info box: "This lecturer will be able to freely decline assignments regardless of their current credit total." — same amber info box style
"Save Status" button — full width, solid dark maroon background, white text — greyed out/disabled when toggle is OFF, enabled when toggle is ON


Below the form card — keep the existing "Current Staff Status Summary" table exactly as it is — same title, same subtitle, same table style, same Dr. Ahmad Hassan row with On Leave / Maternity Leave / Jan 1 2026 — Dec 31 2026 / Active badge — do not change anything about this table

DO NOT change anything else:

Do not touch Tab 1 "Unassigned Courses" or Tab 2 "Assign Lecturer" content
Do not touch any other pages in the file
Do not change the Lecturer view or Lecturer on Leave view in any way
Do not change any fonts, colours, spacing, card styles, badge styles, table styles, or icon styles globally
Do not reorder or restyle any existing sidebar items in any view