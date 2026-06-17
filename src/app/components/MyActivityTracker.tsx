import { useState, useMemo, useRef } from 'react';
import { Edit2, Trash2, Calendar, X, Loader2, Download, AlertTriangle, CheckCircle2, Upload, FileText, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { AddActivityModal } from './AddActivityModal';
import type { StaffActivity } from '../types';
import { useActivityContext } from '../contexts/ActivityContext';
import { toast } from 'sonner';

export function MyActivityTracker() {
  const { activities, addActivity, updateActivity, deleteActivity } = useActivityContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<StaffActivity | null>(null);
  const [activeTab, setActiveTab] = useState<'my-activities' | 'add-activity'>('my-activities');
  const [deleteTarget, setDeleteTarget] = useState<StaffActivity | null>(null);

  // Filter states
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Add Activity tab - ORCID fetch state
  const [isLoading, setIsLoading] = useState(false);
  const [orcidFetched, setOrcidFetched] = useState(false);
  const [orcidCount, setOrcidCount] = useState(0);
  const [error, setError] = useState('');

  // Add Activity tab - Manual entry state (grant & service only)
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  // Add Activity tab - Research paper upload state
  const [paperTitle, setPaperTitle] = useState('');
  const [paperDate, setPaperDate] = useState('');
  const [paperAuthors, setPaperAuthors] = useState('');
  const [paperVenue, setPaperVenue] = useState('');
  const [paperFile, setPaperFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get unique modes from activities
  const uniqueModes = useMemo(() => {
    const modes = activities.map(a => a.mode).filter(Boolean);
    return Array.from(new Set(modes));
  }, [activities]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      // Type filter
      if (selectedType !== 'all' && activity.type !== selectedType) {
        return false;
      }

      // Mode filter
      if (selectedMode !== 'all' && activity.mode !== selectedMode) {
        return false;
      }

      // Date range filter
      if (startDate) {
        const activityDate = new Date(activity.date);
        const filterStartDate = new Date(startDate);
        if (activityDate < filterStartDate) {
          return false;
        }
      }

      if (endDate) {
        const activityDate = new Date(activity.date);
        const filterEndDate = new Date(endDate);
        if (activityDate > filterEndDate) {
          return false;
        }
      }

      return true;
    });
  }, [activities, selectedType, selectedMode, startDate, endDate]);

  const hasActiveFilters = selectedType !== 'all' || selectedMode !== 'all' || startDate || endDate;

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedMode('all');
    setStartDate('');
    setEndDate('');
  };

  const getTypeBadge = (type: StaffActivity['type']) => {
    const styles = {
      Research: 'bg-purple-100 text-purple-700 border-purple-200',
      Grant: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Service: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return styles[type];
  };

  const totalHours = filteredActivities.reduce((sum, act) => sum + act.hoursSpent, 0);

  const handleAdd = () => {
    setEditingActivity(null);
    setModalOpen(true);
  };

  const handleEdit = (activity: StaffActivity) => {
    setEditingActivity(activity);
    setModalOpen(true);
  };

  const handleDelete = (activity: StaffActivity) => {
    setDeleteTarget(activity);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteActivity(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleSave = (activityData: Omit<StaffActivity, 'id' | 'staffName'>) => {
    if (editingActivity) {
      updateActivity(editingActivity.id, activityData);
    } else {
      addActivity(activityData);
    }
    setModalOpen(false);
  };

  // Add Activity tab handlers
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
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl mb-2">My Activity Tracker</h1>
        <p className="text-gray-600 mb-4">
          Log your research, grants, and service activities (visible to coordinators and staff)
        </p>

        {/* Tabs */}
        <div className="border-b border-gray-300">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('my-activities')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'my-activities'
                  ? 'text-[#900021]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Activities
              {activeTab === 'my-activities' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#900021]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('add-activity')}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === 'add-activity'
                  ? 'text-[#900021]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Add Activity
              {activeTab === 'add-activity' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#900021]"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* My Activities Tab Content */}
      {activeTab === 'my-activities' && (
        <div>

      {/* Filter Panel */}
      <div className="mb-6 bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Filter Activities</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#900021] hover:text-[#5C001F] flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Research">Research</option>
              <option value="Grant">Grant</option>
              <option value="Service">Service</option>
            </select>
          </div>

          {/* Mode Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
            >
              <option value="all">All Modes</option>
              {uniqueModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>

          {/* Start Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#900021] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Activities</div>
          <div className="text-3xl font-bold text-gray-900">{filteredActivities.length}</div>
          {hasActiveFilters && activities.length !== filteredActivities.length && (
            <div className="text-xs text-gray-500 mt-1">of {activities.length} total</div>
          )}
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Research Projects</div>
          <div className="text-3xl font-bold text-purple-600">
            {filteredActivities.filter(a => a.type === 'Research').length}
          </div>
          {hasActiveFilters && (
            <div className="text-xs text-gray-500 mt-1">
              of {activities.filter(a => a.type === 'Research').length} total
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Active Grants</div>
          <div className="text-3xl font-bold text-yellow-600">
            {filteredActivities.filter(a => a.type === 'Grant').length}
          </div>
          {hasActiveFilters && (
            <div className="text-xs text-gray-500 mt-1">
              of {activities.filter(a => a.type === 'Grant').length} total
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Total Hours</div>
          <div className="text-3xl font-bold text-gray-900">{totalHours}</div>
          {hasActiveFilters && (
            <div className="text-xs text-gray-500 mt-1">
              of {activities.reduce((sum, act) => sum + act.hoursSpent, 0)} total
            </div>
          )}
        </div>
      </div>

      {/* Personal Activity Table */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[580px]">
            <thead className="bg-gray-50 border-b border-[#c5c5c5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hours Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredActivities.map((activity, idx) => (
                <tr
                  key={activity.id}
                  className={`hover:bg-[#F3F4F6] transition-colors ${
                    idx % 2 === 1 ? 'bg-[#F4F4F4]' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 max-w-md">{activity.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getTypeBadge(activity.type)}>{activity.type}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-lg font-semibold text-gray-900">{activity.hoursSpent}</div>
                    <div className="text-xs text-gray-500">Hours</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{activity.mode}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {activity.date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(activity)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit activity"
                      >
                        <Edit2 className="w-4 h-4 text-[#900021]" />
                      </button>
                      <button
                        onClick={() => handleDelete(activity)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete activity"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {activities.length === 0 ? (
              <>
                <p className="mb-4">No activities logged yet.</p>
                <Button onClick={handleAdd} className="bg-[#900021] hover:bg-[#5C001F]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Activity
                </Button>
              </>
            ) : (
              <>
                <p className="mb-4">No activities match the selected filters.</p>
                <Button onClick={clearFilters} className="bg-[#900021] hover:bg-[#5C001F]">
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Activity Modal */}
      <AddActivityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        activity={editingActivity}
      />
        </div>
      )}

      {/* Add Activity Tab Content */}
      {activeTab === 'add-activity' && (
        <div className="space-y-6 mt-6">
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
                  className="w-full bg-[#900021] hover:bg-[#5C001F]"
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
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete activity?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove{deleteTarget ? ` "${deleteTarget.title}"` : ' this activity'} from your activity records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Activity
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
