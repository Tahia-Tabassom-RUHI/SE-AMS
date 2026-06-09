import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface SectionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  section: {
    courseCode: string;
    courseName: string;
    section: string;
    credits: number;
  } | null;
}

const COURSE_OPTIONS = [
  { code: 'CS101', name: 'Introduction to Programming' },
  { code: 'CS202', name: 'Data Structures' },
  { code: 'CS205', name: 'Algorithms' },
  { code: 'CS301', name: 'Operating Systems' },
  { code: 'CS302', name: 'Computer Networks' },
  { code: 'CS303', name: 'Database Systems' },
  { code: 'CS404', name: 'Software Engineering' },
  { code: 'MA101', name: 'Calculus I' },
  { code: 'MA202', name: 'Linear Algebra' },
];

export function SectionDetailsModal({ open, onClose, section }: SectionDetailsModalProps) {
  const [prerequisite, setPrerequisite] = useState('None');
  const [prerequisiteCustom, setPrerequisiteCustom] = useState('');
  const [finalExam, setFinalExam] = useState<'YES' | 'NO' | null>(null);
  const [combinedLecture, setCombinedLecture] = useState<'YES' | 'NO' | null>(null);
  const [lectureHours, setLectureHours] = useState('');
  const [lectureCustom, setLectureCustom] = useState('');
  const [tutorialHours, setTutorialHours] = useState('');
  const [labHours, setLabHours] = useState('');
  const [notes, setNotes] = useState('');

  if (!open || !section) return null;

  const handleSave = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={onClose} />
      <div className="relative bg-white z-10" style={{ width: '560px', borderRadius: '12px', padding: '24px' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#111827' }}>Section Details</h2>
          <button onClick={onClose} className="hover:opacity-60 transition-opacity" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
            <X style={{ width: '20px', height: '20px', color: '#6B7280' }} />
          </button>
        </div>

        {/* Read-only Info Strip */}
        <div style={{
          background: '#F9FAFB',
          border: '0.5px solid #E5E7EB',
          borderRadius: '8px',
          padding: '10px 14px',
          marginBottom: '20px',
        }}>
          <div className="flex items-start justify-between">
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#7B1A2A', marginBottom: '4px' }}>
                {section.courseCode}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>Course Code</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#374151', marginBottom: '4px' }}>
                {section.courseName}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>Course Name</div>
            </div>
            <div>
              <div style={{
                background: '#F1F5F9',
                color: '#475569',
                fontSize: '11px',
                borderRadius: '4px',
                padding: '2px 7px',
                marginBottom: '4px',
                display: 'inline-block',
              }}>
                Sec {section.section}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>Section</div>
            </div>
            <div>
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{section.credits}</span>
                <span style={{ fontSize: '12px', color: '#6B7280' }}> CR</span>
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>Credits</div>
            </div>
          </div>
        </div>

        {/* Editable Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Field 1: Prerequisite Course Code */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>
              Prerequisite Course Code
            </label>
            <div className="relative">
              <select
                value={prerequisite}
                onChange={(e) => setPrerequisite(e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '14px',
                  color: prerequisite === 'None' ? '#6B7280' : '#111827',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  appearance: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="None">None</option>
                <option disabled>───────────</option>
                {COURSE_OPTIONS.map(course => (
                  <option key={course.code} value={course.code}>
                    {course.code} — {course.name}
                  </option>
                ))}
                <option disabled>───────────</option>
                <option value="Custom">Custom...</option>
              </select>
              <ChevronDown style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: '#6B7280',
                pointerEvents: 'none',
              }} />
            </div>
            {prerequisite === 'Custom' && (
              <>
                <input
                  type="text"
                  value={prerequisiteCustom}
                  onChange={(e) => setPrerequisiteCustom(e.target.value)}
                  placeholder="Enter course code e.g. SCSE1234"
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    fontSize: '14px',
                    color: '#111827',
                    border: '1px solid #7B1A2A',
                    borderRadius: '6px',
                    marginTop: '8px',
                    outline: 'none',
                  }}
                />
                <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
                  Use this for courses outside the current catalog.
                </p>
              </>
            )}
            {prerequisite !== 'Custom' && (
              <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
                Select if this course requires a prerequisite. Choose Custom to enter a code not in the catalog.
              </p>
            )}
          </div>

          {/* Field 2: Final Exam */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>
              Final Exam
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFinalExam('YES')}
                style={{
                  width: '80px',
                  height: '36px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: finalExam === 'YES' ? '1px solid #16A34A' : '1px solid #E5E7EB',
                  background: finalExam === 'YES' ? '#DCFCE7' : 'white',
                  color: finalExam === 'YES' ? '#166534' : '#374151',
                  cursor: 'pointer',
                }}
              >
                YES
              </button>
              <button
                onClick={() => setFinalExam('NO')}
                style={{
                  width: '80px',
                  height: '36px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: finalExam === 'NO' ? '1px solid #DC2626' : '1px solid #E5E7EB',
                  background: finalExam === 'NO' ? '#FEE2E2' : 'white',
                  color: finalExam === 'NO' ? '#991B1B' : '#374151',
                  cursor: 'pointer',
                }}
              >
                NO
              </button>
            </div>
          </div>

          {/* Field 3: Combined Lecture */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>
              Combined Lecture
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setCombinedLecture('YES')}
                style={{
                  width: '80px',
                  height: '36px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: combinedLecture === 'YES' ? '1px solid #2563EB' : '1px solid #E5E7EB',
                  background: combinedLecture === 'YES' ? '#DBEAFE' : 'white',
                  color: combinedLecture === 'YES' ? '#1E40AF' : '#374151',
                  cursor: 'pointer',
                }}
              >
                YES
              </button>
              <button
                onClick={() => setCombinedLecture('NO')}
                style={{
                  width: '80px',
                  height: '36px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: combinedLecture === 'NO' ? '1px solid #DC2626' : '1px solid #E5E7EB',
                  background: combinedLecture === 'NO' ? '#FEE2E2' : 'white',
                  color: combinedLecture === 'NO' ? '#991B1B' : '#374151',
                  cursor: 'pointer',
                }}
              >
                NO
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
              YES if multiple sections share the same lecture session.
            </p>
          </div>

          {/* Fields 4, 5, 6: Hours fields */}
          <div className="grid grid-cols-3 gap-3">
            {/* Lecture Hours */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>
                Lecture Hours
              </label>
              <div className="relative">
                <select
                  value={lectureHours}
                  onChange={(e) => setLectureHours(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    fontSize: '14px',
                    color: '#111827',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    appearance: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select...</option>
                  <option disabled>─────────</option>
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option disabled>─────────</option>
                  <option value="Custom">Custom...</option>
                </select>
                <ChevronDown style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#6B7280',
                  pointerEvents: 'none',
                }} />
              </div>
              {lectureHours === 'Custom' && (
                <>
                  <input
                    type="text"
                    value={lectureCustom}
                    onChange={(e) => setLectureCustom(e.target.value)}
                    placeholder="e.g. 1.5"
                    style={{
                      width: '100%',
                      height: '36px',
                      padding: '0 12px',
                      fontSize: '14px',
                      color: '#111827',
                      border: '1px solid #7B1A2A',
                      borderRadius: '6px',
                      marginTop: '8px',
                      outline: 'none',
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
                    Enter a custom value (e.g. 1.5)
                  </p>
                </>
              )}
            </div>

            {/* Tutorial Hours */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>
                Tutorial Hours
              </label>
              <div className="relative">
                <select
                  value={tutorialHours}
                  onChange={(e) => setTutorialHours(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    fontSize: '14px',
                    color: '#111827',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    appearance: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select...</option>
                  <option disabled>─────────</option>
                  <option value="0">0 hours</option>
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option disabled>─────────</option>
                  <option value="Custom">Custom...</option>
                </select>
                <ChevronDown style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#6B7280',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>

            {/* Lab Hours */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>
                Lab Hours
              </label>
              <div className="relative">
                <select
                  value={labHours}
                  onChange={(e) => setLabHours(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    fontSize: '14px',
                    color: '#111827',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    appearance: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select...</option>
                  <option disabled>─────────</option>
                  <option value="0">0 hours</option>
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option disabled>─────────</option>
                  <option value="Custom">Custom...</option>
                </select>
                <ChevronDown style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#6B7280',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>
          </div>

          {/* Notes / Special Instructions */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '6px' }}>
              Notes / Special Instructions
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Lecture at Lab, special arrangement..."
              style={{
                width: '100%',
                height: '40px',
                padding: '0 12px',
                fontSize: '14px',
                color: '#111827',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3" style={{ marginTop: '24px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'white',
              border: '1px solid #E5E7EB',
              color: '#374151',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '6px',
              padding: '10px 16px',
              cursor: 'pointer',
            }}
            className="hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              background: '#7B1A2A',
              color: 'white',
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '6px',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
            }}
            className="hover:bg-[#5C001F] transition-colors"
          >
            Save Section Details
          </button>
        </div>
      </div>
    </div>
  );
}
