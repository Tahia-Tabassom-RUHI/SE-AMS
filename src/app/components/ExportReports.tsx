import { useState } from 'react';
import { FileSpreadsheet, CheckCircle2, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/AppDataContext';
import { generateXlsx, generateCsvFiles } from '../utils/reportExport';

interface DataScope {
  id: string;
  label: string;
  checked: boolean;
}

type PreviewSheet = 'teaching' | 'workload' | 'segmentation' | 'lab' | 'activity';

const PREVIEW_SHEETS: { key: PreviewSheet; label: string }[] = [
  { key: 'teaching', label: 'Teaching Load' },
  { key: 'workload', label: 'Workload Summary' },
  { key: 'segmentation', label: 'Student Segmentation' },
  { key: 'lab', label: 'Lab Schedule' },
  { key: 'activity', label: 'Activity Log' },
];

const SHEET_DATA: Record<PreviewSheet, { headers: string[]; rows: string[][] }> = {
  teaching: {
    headers: [
      'Category', 'Year', 'Course Code', 'Course Name', 'Section', 'Pre-requisite',
      "Lecturer's Name", 'Credit', 'Final Exam', 'Lecture (hrs)', 'Combined Lecture?',
      'Tutorial (hrs)', 'Lab (hrs)', 'No. of Students', 'Course Coordinator',
      "Coordinator's Dept", 'Lab Name', 'Lab Capacity', 'Lab Used For', 'Lab Used During',
      'Y1 Normal', 'Y1 Direct', 'Y2 Normal', 'Y2 Direct', 'Y3 Normal', 'Y3 Direct',
      'Y4 Normal', 'Y4 Direct', 'Moderator 1', 'Moderator 2', 'Notes',
    ],
    rows: [
      [
        'SE Subject', 'Tahun 1 Sept 2024', 'SCSE1203', 'Software Engineering Principles',
        '15', 'SCSE1013', 'Dr. Siti Nur Khadijah', '3', 'NO', '2', 'NO', '1', '0', '25',
        'Dr. Zatul Alwani', 'Software Engineering', '—', '—', '—', '—',
        '—', '—', '—', '—', '—', '—', '—', '—', '—', '—', '—',
      ],
      [
        'SE Subject', 'Tahun 2 Sept 2024', 'SECJ2154', 'Object Oriented Programming',
        '15', 'SECJ1023', 'Dr. Siti Nur Khadijah', '3', 'NO', '2', 'NO', '0', '2', '41',
        'Dr. Zatul Alwani', 'Software Engineering', '—', '—', '—', '—',
        '—', '—', '—', '—', '—', '—', '—', '—', '—', '—', 'Lecture at Lab',
      ],
    ],
  },
  workload: {
    headers: ['No.', 'Name of Lecturer', 'No. of Classes', 'No. of Sections', 'No. of Subjects'],
    rows: [
      ['1', 'Dr. Zatul Alwani', '3', '3', '2'],
      ['2', 'Dr. Aisyah Rahman', '2', '2', '1'],
    ],
  },
  segmentation: {
    headers: ['Session', 'Local (Tempatan)', 'International (Antarabangsa)', 'Total'],
    rows: [
      ['2024/2025 Sem 1', '10', '11', '21'],
      ['2023/2024 Sem 2', '7', '21', '28'],
    ],
  },
  lab: {
    headers: [
      'Course Code', 'Course Name', 'Section', 'Enrollment',
      'Lab Name', 'Lab Capacity', 'Lab Used For', 'Lab Used During', 'Status',
    ],
    rows: [
      ['CS101', 'Intro to Programming', 'Sec 01', '45', 'Lab C-303', '50', 'Programming Lab', 'Whole Semester', 'Valid'],
      ['CS202', 'Data Structures', 'Sec 01', '38', 'Lab A-101', '35', 'Computer Lab', 'Whole Semester', 'Over Capacity'],
    ],
  },
  activity: {
    headers: ['Staff Name', 'Activity Title', 'Type', 'Hours Spent', 'Mode', 'Date Submitted', 'Source'],
    rows: [
      ['Dr. Aisyah Rahman', 'Deep Learning Research', 'Research', '120', 'Hybrid', 'Mar 15 2026', 'ORCID'],
      ['Prof. Muhammad Ali', 'NSF Grant Application', 'Grant', '80', 'Hybrid', 'Apr 10 2026', 'Manual'],
    ],
  },
};

export function ExportReports() {
  const { user } = useAuth();
  const { recordAudit } = useAppData();
  const [template, setTemplate] = useState('mjiit-ese-2025-2026');
  const [semester, setSemester] = useState('semester-1');
  const [session, setSession] = useState('2024-2025');
  const [fileFormat, setFileFormat] = useState('xlsx');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState('Processing data...');
  const [activeSheet, setActiveSheet] = useState<PreviewSheet>('teaching');

  const [dataScopes, setDataScopes] = useState<DataScope[]>([
    { id: 'course-offerings', label: 'Course Offerings & Teaching Load', checked: true },
    { id: 'staff-workload', label: 'Staff Workload Summary', checked: true },
    { id: 'student-segmentation', label: 'Student Segmentation (Year/Origin/Intake)', checked: true },
    { id: 'lab-schedule', label: 'Lab Resource Schedule', checked: true },
    { id: 'staff-activity', label: 'Staff Activity Log (Hybrid)', checked: true },
  ]);

  const toggleScope = (id: string) => {
    setDataScopes(prev =>
      prev.map(scope => scope.id === id ? { ...scope, checked: !scope.checked } : scope)
    );
  };

  const handleGenerate = async () => {
    const selectedScopes = dataScopes.filter(s => s.checked);
    if (selectedScopes.length === 0) {
      toast.error('Please select at least one data category to export');
      return;
    }

    const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
    const selectedScopeIds = selectedScopes.map(s => s.id);

    setIsGenerating(true);
    setProgress(10);
    setGenerationStatus('Validating selections...');
    await delay(300);

    setProgress(35);
    setGenerationStatus('Preparing data...');
    await delay(300);

    setProgress(65);
    setGenerationStatus(`Generating ${fileFormat.toUpperCase()} file...`);
    await delay(200);

    try {
      if (fileFormat === 'xlsx') {
        generateXlsx(selectedScopeIds, semester, session);

        setProgress(100);
        setGenerationStatus('Download complete');
        await delay(400);

        recordAudit({
          user: user ? `${user.firstName} ${user.lastName}` : 'Coordinator',
          action: 'Export Generated',
          status: 'Success',
          details: `MJIIT ESE XLSX export — ${selectedScopes.length} sheet(s): ${selectedScopes.map(s => s.label).join(', ')}`,
        });

        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-semibold">Report Generated Successfully</div>
              <div className="text-sm">
                {selectedScopes.length} sheet{selectedScopes.length > 1 ? 's' : ''} exported as .xlsx
              </div>
            </div>
          </div>,
          { duration: 5000 },
        );
      } else {
        const count = generateCsvFiles(selectedScopeIds, semester, session);

        setProgress(100);
        setGenerationStatus('Download complete');
        await delay(400);

        recordAudit({
          user: user ? `${user.firstName} ${user.lastName}` : 'Coordinator',
          action: 'Export Generated',
          status: 'Success',
          details: `MJIIT ESE CSV export — ${count} file(s): ${selectedScopes.map(s => s.label).join(', ')}`,
        });

        toast.success(
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-semibold">Report Generated Successfully</div>
              <div className="text-sm">
                {count} CSV file{count > 1 ? 's' : ''} downloaded
              </div>
            </div>
          </div>,
          { duration: 5000 },
        );
      }
    } catch (err) {
      console.error('[ExportReports] Generation error:', err);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
      setProgress(0);
      setGenerationStatus('Processing data...');
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Export Reports</h1>
        <p className="text-gray-600">
          Generate official MJIIT SE Excel workbooks following legacy institutional formatting
        </p>
      </div>

      <div className="max-w-4xl">
        {/* ── Export Configuration Card ── */}
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-8 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-6">Export Configuration</h2>

          {/* Template Selection */}
          <div className="mb-7">
            <Label className="mb-2 block text-sm font-medium">Template Selection</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mjiit-ese-2025-2026">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#1D6F42]" />
                    MJIIT ESE Legacy Format (2025/2026)
                  </div>
                </SelectItem>
                <SelectItem value="mjiit-ese-2024-2025">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#1D6F42]" />
                    MJIIT ESE Legacy Format (2024/2025)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-2">
              Automatically maps database fields to exact MJIIT column headers
            </p>
          </div>

          {/* Semester & Session */}
          <div className="mb-7">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block text-sm font-medium">Semester</Label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester-1">Semester 1</SelectItem>
                    <SelectItem value="semester-2">Semester 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium">Session</Label>
                <Select value={session} onValueChange={setSession}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024/2025</SelectItem>
                    <SelectItem value="2025-2026">2025/2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Data Scope */}
          <div className="mb-7">
            <Label className="mb-2 block text-sm font-medium">
              Data Scope{' '}
              <span className="text-gray-400 font-normal">(Select tabs to include in Excel file)</span>
            </Label>
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
              {dataScopes.map((scope) => (
                <div key={scope.id} className="flex items-center gap-3 px-4 py-3">
                  <Checkbox
                    id={scope.id}
                    checked={scope.checked}
                    onCheckedChange={() => toggleScope(scope.id)}
                    className="data-[state=checked]:bg-[#900021] data-[state=checked]:border-[#900021]"
                  />
                  <label
                    htmlFor={scope.id}
                    className="text-sm font-medium cursor-pointer text-gray-800 select-none"
                  >
                    {scope.label}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Selected sheets will appear as tabs at the bottom of the Excel workbook
            </p>
          </div>

          {/* File Format */}
          <div className="mb-7">
            <Label className="mb-3 block text-sm font-medium">File Format</Label>
            <RadioGroup value={fileFormat} onValueChange={setFileFormat} className="space-y-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="xlsx"
                  id="xlsx"
                  className="data-[state=checked]:border-[#900021] data-[state=checked]:text-[#900021]"
                />
                <label htmlFor="xlsx" className="text-sm font-medium cursor-pointer">
                  <span className="font-semibold">.xlsx</span>{' '}
                  <span className="text-gray-500">(Recommended)</span>{' '}
                  — Multi-tab Excel workbook
                </label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="csv"
                  id="csv"
                  className="data-[state=checked]:border-[#900021] data-[state=checked]:text-[#900021]"
                />
                <label htmlFor="csv" className="text-sm font-medium cursor-pointer">
                  <span className="font-semibold">.csv</span> — Comma-separated values
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* NFR-03 Compliance Badge */}
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              All legacy MJIIT SE column headers are auto-mapped. No manual formatting required after export.
            </p>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-14 bg-[#900021] hover:bg-[#5C001F] text-base font-bold shadow-md"
          >
            <FileText className="w-5 h-5 mr-2" />
            {isGenerating ? 'Generating Report...' : 'Generate Full Report'}
          </Button>

          {isGenerating && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{generationStatus}</span>
                <span className="text-sm font-medium text-[#900021]">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        {/* ── Header Preview Card ── */}
        <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-6 py-4 border-b border-[#c5c5c5]">
            <h3 className="font-bold text-gray-900">Header Preview</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Sample of how exported columns will be formatted per selected sheet
            </p>
          </div>

          {/* Sheet tab switcher */}
          <div className="px-6 pt-4 pb-0 flex gap-1 border-b border-gray-200 overflow-x-auto">
            {PREVIEW_SHEETS.map(sheet => (
              <button
                key={sheet.key}
                onClick={() => setActiveSheet(sheet.key)}
                className={`px-4 py-2 text-xs font-medium rounded-t transition-colors border-b-2 -mb-px ${
                  activeSheet === sheet.key
                    ? 'bg-white text-[#900021] border-[#900021]'
                    : 'bg-gray-100 text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {sheet.label}
              </button>
            ))}
          </div>

          {/* Preview table */}
          <div className="overflow-x-auto">
            <table className="text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-[#1D4E3F]">
                  {SHEET_DATA[activeSheet].headers.map(h => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left font-bold text-white border-r border-[#16402F] last:border-r-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SHEET_DATA[activeSheet].rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-3 py-2 text-gray-700 border-r border-gray-100 last:border-r-0"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Excel tab strip */}
          <div className="flex items-center gap-0 bg-gray-100 border-t border-gray-300 px-3 py-1.5">
            <div className="flex items-center gap-1 mr-2 text-gray-400">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="12" height="12" rx="1" stroke="#9CA3AF" strokeWidth="1"/>
                <line x1="1" y1="5" x2="13" y2="5" stroke="#9CA3AF" strokeWidth="1"/>
                <line x1="5" y1="1" x2="5" y2="13" stroke="#9CA3AF" strokeWidth="1"/>
              </svg>
            </div>
            {PREVIEW_SHEETS.map((sheet) => (
              <button
                key={sheet.key}
                onClick={() => setActiveSheet(sheet.key)}
                className={`px-3 py-1 text-xs rounded-t border border-b-0 mr-0.5 transition-colors ${
                  activeSheet === sheet.key
                    ? 'bg-white text-[#900021] border-gray-300 font-medium'
                    : 'bg-gray-200 text-gray-500 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {sheet.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
