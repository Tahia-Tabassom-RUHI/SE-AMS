import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Loader2, Download, AlertTriangle, CheckCircle2, Upload, FileText, X } from 'lucide-react';
import { toast } from 'sonner';
import { useActivityContext } from '../contexts/ActivityContext';

export function ActivityLogPortal() {
  const { addActivity } = useActivityContext();

  const [isLoading, setIsLoading] = useState(false);
  const [orcidFetched, setOrcidFetched] = useState(false);
  const [orcidCount, setOrcidCount] = useState(0);
  const [error, setError] = useState('');

  // Manual entry state (grant & service only)
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  // Research paper upload state
  const [paperTitle, setPaperTitle] = useState('');
  const [paperDate, setPaperDate] = useState('');
  const [paperAuthors, setPaperAuthors] = useState('');
  const [paperVenue, setPaperVenue] = useState('');
  const [paperFile, setPaperFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFetchORCID = async () => {
    setIsLoading(true);
    setError('');
    setOrcidFetched(false);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const scenarios = ['success', 'missing_orcid', 'timeout'];
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    setIsLoading(false);

    if (scenario === 'missing_orcid') {
      setError('Missing ORCID ID - Please update your profile with a valid ORCID identifier');
    } else if (scenario === 'timeout') {
      setError('API Timeout Error - Unable to connect to ORCID database. Please try again later.');
    } else {
      const publications = [
        { title: 'Machine Learning Applications in Education Technology', date: '2025-03-15', type: 'Research' as const },
        { title: 'Deep Learning for Academic Performance Prediction', date: '2024-11-20', type: 'Research' as const },
        { title: 'National Research Grant - AI in Education', date: '2024-08-10', type: 'Grant' as const },
      ];

      publications.forEach(pub => {
        addActivity({
          title: pub.title,
          type: pub.type,
          hoursSpent: 0,
          mode: 'Hybrid',
          date: new Date(pub.date),
        });
      });

      setOrcidCount(publications.length);
      setOrcidFetched(true);
      toast.success(`${publications.length} publications imported to My Activity Tracker`);
    }
  };

  const handleSaveActivity = () => {
    if (!title || !date || !category) {
      toast.error('Please fill in all fields');
      return;
    }

    addActivity({
      title,
      type: category as 'Grant' | 'Service',
      hoursSpent: 0,
      mode: 'Hybrid',
      date: new Date(date),
    });

    toast.success('Activity saved to My Activity Tracker');
    setTitle('');
    setDate('');
    setCategory('');
  };

  const handlePaperUpload = () => {
    if (!paperTitle || !paperDate || !paperFile) {
      toast.error('Please fill in the title, date, and attach a PDF file');
      return;
    }

    addActivity({
      title: paperTitle,
      type: 'Research',
      hoursSpent: 0,
      mode: 'Hybrid',
      date: new Date(paperDate),
    });

    toast.success('Research paper submitted to My Activity Tracker');
    setPaperTitle('');
    setPaperDate('');
    setPaperAuthors('');
    setPaperVenue('');
    setPaperFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are accepted');
      e.target.value = '';
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error('File size must be under 20 MB');
      e.target.value = '';
      return;
    }
    setPaperFile(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Activity Log Portal</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Import or submit activities — they will appear in your My Activity Tracker
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      {orcidFetched && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700 font-medium">
            Successfully imported {orcidCount} publications — view them in My Activity Tracker
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ORCID Fetch */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-base text-gray-900 mb-4">
            Automated ORCID Fetch
          </h3>

          <div className="space-y-4">
            <Button
              onClick={handleFetchORCID}
              disabled={isLoading}
              className="w-full bg-[#900021] hover:bg-[#5C001F]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Fetching from ORCID...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Fetch from ORCID
                </>
              )}
            </Button>

            <p className="text-sm text-gray-600">
              Import your research publications and grants directly from your ORCID profile. Imported entries will appear in My Activity Tracker.
            </p>
          </div>
        </div>

        {/* Manual Entry — Grant & Service only */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-base text-gray-900 mb-1">
            Manual Entry
          </h3>
          <p className="text-xs text-gray-500 mb-4">For grants and service activities</p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Activity Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter activity title"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Activity Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grant">Grant</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSaveActivity}
              className="w-full bg-[#10B981] hover:bg-[#059669]"
            >
              Save Activity
            </Button>
          </div>
        </div>
      </div>

      {/* Manual Research Paper Upload */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-[#900021]" />
          <h3 className="font-semibold text-base text-gray-900">
            Manual Research Paper Upload
          </h3>
        </div>
        <p className="text-xs text-gray-500 mb-5">
          Submit a research paper manually by uploading the PDF. Use this when your publication is not yet indexed in ORCID. The entry will appear in My Activity Tracker.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="paperTitle">Paper Title <span className="text-red-500">*</span></Label>
            <Input
              id="paperTitle"
              value={paperTitle}
              onChange={(e) => setPaperTitle(e.target.value)}
              placeholder="Full title of the research paper"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="paperAuthors">Authors</Label>
            <Input
              id="paperAuthors"
              value={paperAuthors}
              onChange={(e) => setPaperAuthors(e.target.value)}
              placeholder="e.g. Smith J., Lee K., ..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="paperDate">Publication Date <span className="text-red-500">*</span></Label>
            <Input
              id="paperDate"
              type="date"
              value={paperDate}
              onChange={(e) => setPaperDate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="paperVenue">Journal / Conference</Label>
            <Input
              id="paperVenue"
              value={paperVenue}
              onChange={(e) => setPaperVenue(e.target.value)}
              placeholder="e.g. IEEE Transactions on Education"
              className="mt-1"
            />
          </div>

          {/* PDF Drop Zone */}
          <div className="md:col-span-2">
            <Label>PDF File <span className="text-red-500">*</span></Label>
            <div
              className={`mt-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                paperFile
                  ? 'border-[#10B981] bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:border-[#900021] hover:bg-blue-50'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              {paperFile ? (
                <>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#10B981]" />
                    <span className="text-sm font-medium text-gray-800 truncate max-w-xs">
                      {paperFile.name}
                    </span>
                    <button
                      type="button"
                      className="ml-1 p-0.5 rounded hover:bg-green-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPaperFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {(paperFile.size / 1024 / 1024).toFixed(2)} MB — click to replace
                  </span>
                </>
              ) : (
                <>
                  <Upload className="w-7 h-7 text-gray-400" />
                  <p className="text-sm text-gray-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PDF only · max 20 MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="mt-5">
          <Button
            onClick={handlePaperUpload}
            className="bg-[#900021] hover:bg-[#5C001F] px-8"
          >
            <Upload className="w-4 h-4 mr-2" />
            Submit Research Paper
          </Button>
        </div>
      </div>
    </div>
  );
}
