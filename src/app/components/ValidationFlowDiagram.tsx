import { ArrowRight, ArrowDown, CheckCircle, XCircle, AlertTriangle, Database, User, Settings, Download, FileImage } from 'lucide-react';
import { useRef } from 'react';

export function ValidationFlowDiagram() {
  const diagramRef = useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (!diagramRef.current) return;

    try {
      const module = await import('html2canvas');
      const html2canvas = module.default;

      const canvas = await html2canvas(diagramRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'validation-flow-diagram.png';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Error exporting image. Please try again.');
    }
  };

  const handleExportPDF = async () => {
    if (!diagramRef.current) return;

    try {
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default;

      const canvas = await html2canvas(diagramRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('validation-flow-diagram.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    }
  };

  return (
    <>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl mb-2">Integrated Rule Validation Flow</h1>
          <p className="text-gray-600">
            Data Journey: Transactional Lifecycle When Assigning a Course Section
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportImage}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#900021] text-[#900021] rounded-lg hover:bg-[#FFF0F3] transition-colors font-medium"
          >
            <FileImage className="w-5 h-5" />
            Export as Image
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-[#900021] text-white rounded-lg hover:bg-[#5C001F] transition-colors font-medium"
          >
            <Download className="w-5 h-5" />
            Export as PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#c5c5c5] shadow-sm p-6 overflow-x-auto">
        <div ref={diagramRef} className="bg-white p-6" style={{ width: '1500px' }}>

          {/* ROW 1: Start → Validation → Decision → Scenarios */}
          <div className="flex items-start gap-3 mb-6">

            {/* START */}
            <div className="flex flex-col items-center">
              <div className="w-32 bg-[#900021] text-white rounded-lg p-3 text-center shadow-md h-20 flex flex-col items-center justify-center">
                <p className="font-semibold text-sm">START</p>
                <p className="text-xs mt-1">Coordinator</p>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-400 mt-8 flex-shrink-0" />

            {/* Step 1: Input Selection */}
            <div className="w-52 bg-[#FFF0F3] border-2 border-[#900021] rounded-lg p-3">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-5 h-5 bg-[#900021] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">1</div>
                <h3 className="font-semibold text-xs">Input Selection</h3>
              </div>
              <div className="space-y-1.5">
                <div className="bg-white rounded p-1.5 border border-[#c5c5c5]">
                  <p className="font-medium text-xs">Course: CS303-02</p>
                  <p className="text-xs text-gray-600">(3.0 credits)</p>
                </div>
                <div className="bg-white rounded p-1.5 border border-[#c5c5c5]">
                  <p className="font-medium text-xs">Lecturer:</p>
                  <p className="text-xs text-gray-600">Dr. Ahmad Hassan</p>
                </div>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-400 mt-8 flex-shrink-0" />

            {/* Step 2: Database Query */}
            <div className="w-52 bg-[#E3F2FD] border-2 border-[#1976D2] rounded-lg p-3">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-5 h-5 bg-[#1976D2] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">2</div>
                <h3 className="font-semibold text-xs flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  Database Query
                </h3>
              </div>
              <div className="bg-white rounded p-1.5 border border-[#c5c5c5] mb-1.5">
                <p className="text-xs font-mono bg-[#F4F4F4] p-1 rounded mb-1">
                  SUM(credits) WHERE status IN ('accepted', 'pending')
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs mb-1.5">
                <div className="bg-[#E8F5E9] p-1 rounded text-center">
                  <p className="font-medium text-xs">Accepted</p>
                  <p className="text-gray-600">9.0</p>
                </div>
                <div className="bg-[#FFF0F3] p-1 rounded text-center">
                  <p className="font-medium text-xs">Pending</p>
                  <p className="text-gray-600">2.0</p>
                </div>
              </div>
              <div className="bg-[#FEF3C7] p-1.5 rounded text-center">
                <p className="font-medium text-xs">Total: 11.0 credits</p>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-400 mt-8 flex-shrink-0" />

            {/* Step 3: Validation */}
            <div className="w-52 bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-3">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-5 h-5 bg-[#F59E0B] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">3</div>
                <h3 className="font-semibold text-xs flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  Validation (FR-03)
                </h3>
              </div>
              <div className="bg-white rounded p-1.5 border border-[#c5c5c5] mb-1.5">
                <p className="font-medium text-xs mb-1">Calculate:</p>
                <div className="font-mono text-xs bg-[#F4F4F4] p-1 rounded">
                  <p>11.0 + 3.0 = 14.0</p>
                </div>
              </div>
              <div className="bg-white rounded p-1.5 border border-[#c5c5c5]">
                <p className="text-xs font-mono bg-[#E8F5E9] p-1 rounded text-center">
                  14.0 ≤ 15.0 ✓
                </p>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-400 mt-8 flex-shrink-0" />

            {/* Decision Diamond */}
            <div className="flex flex-col items-center">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <polygon points="50,5 95,50 50,95 5,50" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
                <text x="50" y="45" textAnchor="middle" className="text-[7px] font-semibold" fill="#000">Proposed</text>
                <text x="50" y="55" textAnchor="middle" className="text-[7px] font-semibold" fill="#000">≤ 15.0?</text>
              </svg>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-400 mt-8 flex-shrink-0" />

            {/* Three Scenarios Stacked */}
            <div className="flex flex-col gap-2 w-64">

              {/* Scenario 1: Under Limit */}
              <div className="bg-[#E8F5E9] border-2 border-[#4CAF50] rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
                    <h4 className="font-semibold text-xs">Scenario 1: Under Limit</h4>
                  </div>
                  <div className="bg-[#4CAF50] text-white rounded px-2 py-0.5 text-xs font-semibold">ALLOW</div>
                </div>
                <div className="bg-white rounded p-1.5 border border-[#c5c5c5] mb-1">
                  <p className="text-xs">11.0 + 3.0 = <span className="font-bold text-[#4CAF50]">14.0 ✓</span></p>
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Create assignment</div>
                  <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Status: "pending"</div>
                </div>
              </div>

              {/* Scenario 2: At Limit */}
              <div className="bg-[#FFF9E6] border-2 border-[#FFA726] rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-[#FFA726]" />
                    <h4 className="font-semibold text-xs">Scenario 2: At Limit</h4>
                  </div>
                  <div className="bg-[#FFA726] text-white rounded px-2 py-0.5 text-xs font-semibold">WARN</div>
                </div>
                <div className="bg-white rounded p-1.5 border border-[#c5c5c5] mb-1">
                  <p className="text-xs">12.0 + 3.0 = <span className="font-bold text-[#FFA726]">15.0 ⚠</span></p>
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Create + flag capacity</div>
                  <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Show warning</div>
                </div>
              </div>

              {/* Scenario 3: Exceeds Limit */}
              <div className="bg-[#FFEBEE] border-2 border-[#EF4444] rounded-lg p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-[#EF4444]" />
                    <h4 className="font-semibold text-xs">Scenario 3: Exceeds Limit</h4>
                  </div>
                  <div className="bg-[#EF4444] text-white rounded px-2 py-0.5 text-xs font-semibold">BLOCK</div>
                </div>
                <div className="bg-white rounded p-1.5 border border-[#c5c5c5] mb-1">
                  <p className="text-xs">13.0 + 3.0 = <span className="font-bold text-[#EF4444]">16.0 ✗</span></p>
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Prevent creation</div>
                  <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Display error</div>
                </div>
              </div>
            </div>

          </div>

          {/* Down Arrow for Row Transition */}
          <div className="flex justify-center mb-4">
            <div className="flex flex-col items-center">
              <p className="text-xs text-gray-600 mb-1">For Allowed Scenarios (Scenario 1 & Scenario 2)</p>
              <ArrowDown className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          {/* ROW 2: Post-Assignment → Lecturer Response → Outcomes → End */}
          <div className="flex items-start gap-3">

            {/* Spacer to align with scenarios */}
            <div className="w-32"></div>
            <div className="w-5"></div>
            <div className="w-52"></div>
            <div className="w-5"></div>
            <div className="w-52"></div>
            <div className="w-5"></div>
            <div className="w-52"></div>
            <div className="w-5"></div>
            <div className="w-24"></div>
            <div className="w-5"></div>

            {/* Continuing from scenarios */}
            <div className="flex items-start gap-3 w-full">

              {/* Step 4: Post-Assignment Tracking */}
              <div className="w-64 bg-[#F3E5F5] border-2 border-[#9C27B0] rounded-lg p-3">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-5 h-5 bg-[#9C27B0] text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold">4</div>
                  <h3 className="font-semibold text-xs">Post-Assignment</h3>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-white rounded p-1.5 border border-[#c5c5c5]">
                    <p className="font-medium text-xs mb-1">Workload Monitor (FR-10)</p>
                    <div className="text-xs space-y-0.5">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="text-[#FFA726] font-medium">Pending</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-[#FFA726] h-1.5 rounded-full" style={{ width: '93%' }}></div>
                      </div>
                      <p className="text-gray-500 text-center">14.0/15.0 (93%)</p>
                    </div>
                  </div>
                  <div className="bg-white rounded p-1.5 border border-[#c5c5c5]">
                    <div className="bg-[#FFF0F3] p-1.5 rounded flex items-start gap-1">
                      <User className="w-3 h-3 text-[#900021] flex-shrink-0 mt-0.5" />
                      <p className="text-xs">Notify lecturer: CS303-02 awaits response</p>
                    </div>
                  </div>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-gray-400 mt-8 flex-shrink-0" />

              {/* Lecturer Response Decision */}
              <div className="flex flex-col items-center">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <polygon points="50,5 95,50 50,95 5,50" fill="#E3F2FD" stroke="#1976D2" strokeWidth="2"/>
                  <text x="50" y="45" textAnchor="middle" className="text-[7px] font-semibold" fill="#000">Lecturer</text>
                  <text x="50" y="55" textAnchor="middle" className="text-[7px] font-semibold" fill="#000">Response?</text>
                </svg>
              </div>

              <ArrowRight className="w-5 h-5 text-gray-400 mt-8 flex-shrink-0" />

              {/* Final Outcomes */}
              <div className="flex flex-col gap-2 w-48">

                <div className="bg-[#E8F5E9] border-2 border-[#4CAF50] rounded-lg p-2">
                  <div className="text-center">
                    <CheckCircle className="w-6 h-6 text-[#4CAF50] mx-auto mb-1" />
                    <h4 className="font-semibold text-xs mb-1">ACCEPTED</h4>
                    <div className="space-y-0.5 text-xs">
                      <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Status: "accepted"</div>
                      <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Workload confirmed</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFEBEE] border-2 border-[#EF4444] rounded-lg p-2">
                  <div className="text-center">
                    <XCircle className="w-6 h-6 text-[#EF4444] mx-auto mb-1" />
                    <h4 className="font-semibold text-xs mb-1">REJECTED</h4>
                    <div className="space-y-0.5 text-xs">
                      <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Status: "rejected"</div>
                      <div className="bg-white rounded px-1.5 py-0.5 border border-[#c5c5c5]">→ Section unassigned</div>
                    </div>
                  </div>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-gray-400 mt-8 flex-shrink-0" />

              {/* END */}
              <div className="flex flex-col items-center">
                <div className="w-32 bg-[#900021] text-white rounded-lg p-3 text-center shadow-md h-20 flex flex-col items-center justify-center">
                  <p className="font-semibold text-sm">END</p>
                  <p className="text-xs mt-1">Complete</p>
                </div>
              </div>

            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t-2 border-[#c5c5c5]">
            <h3 className="font-semibold text-base mb-3">Legend & Key Business Rules</h3>
            <div className="grid grid-cols-5 gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#900021] rounded"></div>
                <span className="text-xs">Start/End</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#E3F2FD] border-2 border-[#1976D2] rounded"></div>
                <span className="text-xs">Database</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#FEF3C7] border-2 border-[#F59E0B] rounded"></div>
                <span className="text-xs">Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                  <polygon points="20,2 38,20 20,38 2,20" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
                </svg>
                <span className="text-xs">Decision</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-6 h-6 text-gray-400" />
                <span className="text-xs">Flow Direction</span>
              </div>
            </div>
            <div className="bg-[#FFF0F3] rounded-lg p-3 border-2 border-[#900021]">
              <h4 className="font-semibold text-sm mb-2">Critical Business Rules (FR-03):</h4>
              <ul className="text-xs space-y-1 list-disc list-inside">
                <li>Maximum teaching load: <strong>15.0 credits</strong> per lecturer per semester</li>
                <li>Workload calculation includes both <strong>"accepted"</strong> and <strong>"pending"</strong> assignments</li>
                <li>System prevents any assignment that would <strong>exceed 15.0 credits</strong></li>
                <li>Real-time validation occurs <strong>before</strong> lecturer notification</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
