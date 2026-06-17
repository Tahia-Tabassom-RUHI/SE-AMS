import { useState } from 'react';
import { Shield, Calendar, User, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AuditEntry {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  details: string;
  type: 'create' | 'update' | 'delete' | 'export';
  ipAddress: string;
}

const mockAuditLog: AuditEntry[] = [
  {
    id: 'audit-1',
    timestamp: new Date('2026-04-30T14:32:15'),
    user: 'Dr. Zatul Alwani',
    action: 'Created Assignment',
    details: 'Assigned SCSE2243-01 to Dr. Aisyah Rahman',
    type: 'create',
    ipAddress: '192.168.1.45',
  },
  {
    id: 'audit-2',
    timestamp: new Date('2026-04-30T14:15:22'),
    user: 'Dr. Aisyah Rahman',
    action: 'Accepted Assignment',
    details: 'Accepted CS101-01 (3.0 credits)',
    type: 'update',
    ipAddress: '192.168.1.78',
  },
  {
    id: 'audit-3',
    timestamp: new Date('2026-04-30T13:45:10'),
    user: 'Dr. Zatul Alwani',
    action: 'Added Activity',
    details: 'Logged research activity: Deep Learning for SE',
    type: 'create',
    ipAddress: '192.168.1.45',
  },
  {
    id: 'audit-4',
    timestamp: new Date('2026-04-30T13:20:05'),
    user: 'Dr. Noor Hayati',
    action: 'Rejected Assignment',
    details: 'Declined CS404-01: Course Outside of Specialization',
    type: 'update',
    ipAddress: '192.168.1.92',
  },
  {
    id: 'audit-5',
    timestamp: new Date('2026-04-30T12:50:33'),
    user: 'Dr. Zatul Alwani',
    action: 'Exported Report',
    details: 'Generated MJIIT_SE_Load_Sem2_2026.xlsx',
    type: 'export',
    ipAddress: '192.168.1.45',
  },
  {
    id: 'audit-6',
    timestamp: new Date('2026-04-30T11:30:18'),
    user: 'Dr. Zatul Alwani',
    action: 'Updated Moderator',
    details: 'Assigned Prof. Muhammad Ali as moderator for CS202-01',
    type: 'update',
    ipAddress: '192.168.1.45',
  },
  {
    id: 'audit-7',
    timestamp: new Date('2026-04-30T10:15:42'),
    user: 'Dr. Siti Aminah',
    action: 'Accepted Assignment',
    details: 'Accepted CS303-01 (3.0 credits)',
    type: 'update',
    ipAddress: '192.168.1.55',
  },
];

export function SystemAuditLog() {
  const [entries] = useState<AuditEntry[]>(mockAuditLog);
  const [filterType, setFilterType] = useState('all');

  const getTypeBadge = (type: AuditEntry['type']) => {
    const configs = {
      create: { className: 'bg-green-100 text-green-700 border-green-200', label: 'Create' },
      update: { className: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Update' },
      delete: { className: 'bg-red-100 text-red-700 border-red-200', label: 'Delete' },
      export: { className: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Export' },
    };
    return configs[type];
  };

  const filteredEntries = entries.filter(entry => {
    if (filterType === 'all') return true;
    return entry.type === filterType;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl mb-2">System Audit Log</h1>
        <p className="text-gray-600">
          Complete security and activity history for compliance and oversight
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Filter by Action Type</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="export">Export</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600">Total Events</div>
            <Shield className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{entries.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Creates</div>
          <div className="text-3xl font-bold text-green-600">
            {entries.filter(e => e.type === 'create').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Updates</div>
          <div className="text-3xl font-bold text-blue-600">
            {entries.filter(e => e.type === 'update').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#c5c5c5] p-6 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Exports</div>
          <div className="text-3xl font-bold text-purple-600">
            {entries.filter(e => e.type === 'export').length}
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b border-[#c5c5c5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEntries.map((entry, idx) => {
                const typeConfig = getTypeBadge(entry.type);

                return (
                  <tr
                    key={entry.id}
                    className={`hover:bg-[#F4F4F4] transition-colors ${
                      idx % 2 === 1 ? 'bg-[#F4F4F4]' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {entry.timestamp.toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{entry.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{entry.action}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={typeConfig.className}>{typeConfig.label}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2 max-w-md">
                        <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{entry.details}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">
                        {entry.ipAddress}
                      </code>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
