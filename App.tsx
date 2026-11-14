import { useState, type FormEvent } from 'react'
import {
  LayoutDashboard, Package, FileCheck, BookOpen,
  FlaskConical, ClipboardList, FileText, Settings as SettingsIcon,
  Search, Bell, ChevronDown, ArrowUpRight,
  ShieldCheck, AlertTriangle, Clock, CheckCircle2,
  Plus, Sparkles, Menu, Upload, Trash2, File,
  Home, Zap, Target,Camera
} from 'lucide-react'

const navigation = [
  { name: 'Home', icon: Home },
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Product Analysis', icon: Package },
  { name: 'AI Agent Workflow', icon: Sparkles },
  { name: 'Document Verification', icon: FileCheck },
  { name: 'BIS Standards', icon: BookOpen },
  { name: 'AI Compliance Gap Detector', icon: ShieldCheck },
  { name: 'Laboratory Finder', icon: FlaskConical },
  { name: 'Action Tracker', icon: ClipboardList },
  { name: 'Traceability Matrix', icon: Target },
  { name: 'Regulatory Change Radar', icon: Bell },
  { name: 'Reports', icon: FileText },
]

const products = [
  { name: 'Electric Kettle', id: 'PRD-001', status: 'Compliant', color: 'green', date: '06 Nov 2026' },
  { name: 'LED Bulb 12W', id: 'PRD-002', status: 'Under Review', color: 'amber', date: '05 Nov 2026' },
  { name: 'Smart Power Adapter', id: 'PRD-003', status: 'Action Required', color: 'red', date: '04 Nov 2026' },
  { name: 'Pressure Cooker', id: 'PRD-004', status: 'Compliant', color: 'green', date: '03 Nov 2026' },
]

// PRODUCT ANALYSIS PAGE
function ProductAnalysis() {

  const [productName, setProductName] = useState('Electric Kettle')
  const [category, setCategory] = useState('Electrical Appliances')
  const [manufacturer, setManufacturer] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [intendedUse, setIntendedUse] = useState('')
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [apiError, setApiError] = useState('')
  const [productImage, setProductImage] = useState<File | null>(null)
  const [modelNumber, setModelNumber] = useState('')
  const [material, setMaterial] = useState('')
  const [capacity, setCapacity] = useState('')
  const [technicalSpecs, setTechnicalSpecs] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  const inputStyle =
    'w-full border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  setIsAnalyzing(true)
  setApiError('')
  setAnalysisResult(null)
  setSubmitted(false)

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/product/analyze`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: productName,
          category: category,
          manufacturer: manufacturer,
          description: description,
          intended_use: intendedUse,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Product analysis failed. Please try again.')
    }

    const result = await response.json()

    // Upload the selected product image separately
    if (productImage) {
      const formData = new FormData()
      formData.append('file', productImage)

      const imageResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/product/upload-image`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!imageResponse.ok) {
        throw new Error('Product details were analysed, but image upload failed.')
      }

      result.image_upload = await imageResponse.json()
    }

    setAnalysisResult(result)
    setSubmitted(true)

  } catch (error) {
    setApiError(
      error instanceof Error ? error.message : 'Something went wrong.'
    )
  } finally {
    setIsAnalyzing(false)
  }
}


  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-7">
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold mb-2">
          <Sparkles size={16} />
          AI-POWERED PRODUCT ASSESSMENT
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          New Product Analysis
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Enter your product details to begin the BIS standards and certification assessment.
        </p>
      </div>

      
<form onSubmit={handleSubmit} className="space-y-6">

  {/* Smart Product Photo Upload */}
  <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-sm">
    <div className="flex items-center gap-3 mb-5">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
        <Camera size={22} />
      </div>
      <div>
        <h2 className="font-bold text-lg">Smart Product Identification</h2>
        <p className="text-xs text-slate-400">
          Upload or capture a product image for AI-based identification
        </p>
      </div>
    </div>

    <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-7 flex flex-col items-center text-center cursor-pointer transition">
      <Camera size={32} className="text-blue-500 mb-3" />
      <span className="font-semibold text-sm">
        Upload or capture product photo
      </span>
      <span className="text-xs text-slate-400 mt-2">
        Select a clear JPG, PNG or WEBP image
      </span>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) {
            setProductImage(file)
            setImagePreview(URL.createObjectURL(file))
            setSubmitted(false)
          }
        }}
      />
    </label>

    {imagePreview && (
      <div className="mt-5 flex flex-col sm:flex-row items-start gap-4">
        <img
          src={imagePreview}
          alt="Selected product"
          className="w-40 h-40 object-cover rounded-xl border border-slate-200"
        />
        <div className="flex-1">
          <p className="font-semibold text-sm text-green-700">
            <CheckCircle2 size={16} className="inline mr-2" />
            Product image selected
          </p>
          <p className="text-xs text-slate-500 mt-2 break-all">
            {productImage?.name}
          </p>
          <button
            type="button"
            onClick={() => {
              setProductImage(null)
              setImagePreview('')
            }}
            className="text-sm text-red-600 font-semibold mt-3 hover:underline"
          >
            Remove image
          </button>
        </div>
      </div>
    )}
  </div>

  <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-sm">

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Package size={22} />
            </div>

            <div>
              <h2 className="font-bold text-lg">Product Information</h2>
              <p className="text-xs text-slate-400">
                Basic details about your product
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Product Name *
              </label>
              <input
                required
                value={productName}
                onChange={e => setProductName(e.target.value)}
                placeholder="e.g. Electric Kettle"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Product Category *
              </label>
              <select
                required
                value={category}
                onChange={e => setCategory(e.target.value)}
                className={inputStyle}
              >
                <option>Electrical Appliances</option>
                <option>Electronics</option>
                <option>Food Products</option>
                <option>Construction Materials</option>
                <option>Automotive Products</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Manufacturer / Company *
              </label>
              <input
                required
                value={manufacturer}
                onChange={e => setManufacturer(e.target.value)}
                placeholder="Enter company name"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Manufacturer Location *
              </label>
              <input
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="City, State, Country"
                className={inputStyle}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Product Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the product, its features, materials and specifications..."
                className={inputStyle}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Intended Use *
              </label>
              <textarea
                required
                rows={2}
                value={intendedUse}
                onChange={e => setIntendedUse(e.target.value)}
                placeholder="Explain what the product is designed to do and who will use it..."
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <FlaskConical size={22} />
            </div>
            <div>
              <h2 className="font-bold text-lg">Product Specifications</h2>
              <p className="text-xs text-slate-400">
                Technical details for accurate standard mapping
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Model Number
              </label>
              <input
                value={modelNumber}
                onChange={e => setModelNumber(e.target.value)}
                placeholder="e.g. EK-1500"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Material / Composition
              </label>
              <input
                value={material}
                onChange={e => setMaterial(e.target.value)}
                placeholder="e.g. Stainless steel, plastic"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Capacity / Dimensions
              </label>
              <input
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                placeholder="e.g. 1.5 litres, 20 × 15 cm"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Technical Specifications
              </label>
              <textarea
                rows={2}
                value={technicalSpecs}
                onChange={e => setTechnicalSpecs(e.target.value)}
                placeholder="e.g. 1500W, 220–240V, automatic shut-off"
                className={inputStyle}
              />
            </div>
          </div>
        </div>


        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <FileCheck size={22} />
            </div>

            <div>
              <h2 className="font-bold text-lg">Supporting Documents</h2>
              <p className="text-xs text-slate-400">
                Upload available product documents
              </p>
            </div>
          </div>

          <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-7 flex flex-col items-center text-center cursor-pointer transition">
            <FileText size={30} className="text-blue-500 mb-3" />
            <span className="font-semibold text-sm">
              Click to upload a document
            </span>
            <span className="text-xs text-slate-400 mt-2">
              PDF, DOC, DOCX or image files
            </span>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              className="hidden"
              onChange={e =>
                setFileName(e.target.files?.[0]?.name || '')
              }
            />
          </label>

          {fileName && (
            <p className="text-sm text-green-700 mt-3">
              <CheckCircle2 size={15} className="inline mr-2" />
              {fileName}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-4 font-semibold text-sm shadow-lg shadow-blue-100"
          >
            <Sparkles size={17} className="inline mr-2" />
            Analyse Product
          </button>

          <button
            type="button"
            onClick={() => {
              setProductName('')
              setCategory('Electrical Appliances')
              setManufacturer('')
              setLocation('')
              setDescription('')
              setIntendedUse('')
              setFileName('')
              setProductImage(null)
              setImagePreview('')
              setModelNumber('')
              setMaterial('')
              setCapacity('')
              setTechnicalSpecs('')
              setSubmitted(false)
            }}
            className="border border-slate-200 bg-white rounded-xl px-6 py-4 text-sm font-semibold hover:bg-slate-50"
          >
            Clear Form
          </button>
        </div>
      </form>

      {submitted && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-blue-700 font-bold">
            <CheckCircle2 size={20} />
            Product submitted successfully!
          </div>

          <p className="text-sm text-slate-600 mt-3">
            Your sample product submission has been captured by the frontend.
            The AI research, requirement analysis, document verification and
            laboratory agents will be connected when we build the backend.
          </p>

          {imagePreview && (
  <div className="mt-5">
    <p className="text-sm font-semibold text-slate-700 mb-2">
      Submitted Product Image
    </p>
    <img
      src={imagePreview}
      alt="Submitted product"
      className="w-36 h-36 object-cover rounded-xl border border-blue-200"
    />
    <p className="text-xs text-slate-500 mt-2">
      {productImage?.name}
    </p>
  </div>
)}

          <div className="mt-4 text-sm space-y-1">
            <p><strong>Product:</strong> {productName}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Manufacturer:</strong> {manufacturer}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Model Number:</strong> {modelNumber || 'Not provided'}</p>
<p><strong>Material:</strong> {material || 'Not provided'}</p>
<p><strong>Capacity / Dimensions:</strong> {capacity || 'Not provided'}</p>
<p><strong>Technical Specifications:</strong> {technicalSpecs || 'Not provided'}</p>


{analysisResult?.potential_standards?.length > 0 && (
  <div className="mt-6 border border-blue-200 rounded-xl p-5 bg-blue-50">
    <div className="flex items-center gap-2 mb-4">
      <Sparkles size={20} className="text-blue-600" />
      <h3 className="font-bold text-lg text-slate-800">
        Potential Standard Matches
      </h3>
    </div>

    <p className="text-xs text-blue-700 mb-4">
      Results returned by the StandardsPilot AI backend.
      Verify applicability and current editions with BIS.
    </p>

    {analysisResult.potential_standards.map(
      (standard: any, index: number) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-lg p-4 mb-3"
        >
          <p className="font-bold text-blue-700">
            {standard.standard}
          </p>

          <p className="text-sm font-medium mt-1">
            {standard.title}
          </p>

          <p className="text-xs text-slate-500 mt-2">
            {standard.purpose}
          </p>

          <span className="inline-block mt-3 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
            {standard.status}
          </span>
        </div>
      )
    )}

    <p className="text-xs text-slate-500 mt-4">
      These are potential references, not confirmation of mandatory
      certification or product compliance.
    </p>
  </div>
)}
{analysisResult?.image_upload && (
  <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
    <p className="font-semibold text-green-700">
      Product image uploaded successfully
    </p>
    <p className="text-sm text-slate-600 mt-2">
      File: {analysisResult.image_upload.filename}
    </p>
    <p className="text-sm text-slate-600">
      Image dimensions: {analysisResult.image_upload.width} × {analysisResult.image_upload.height}
    </p>
    <p className="text-xs text-slate-500 mt-2">
      {analysisResult.image_upload.analysis_status}
    </p>
  </div>
)}

          </div>

          <p className="text-xs text-blue-700 mt-4">
            Demo mode: no actual BIS compliance decision has been made yet.
          </p>
        </div>
      )}
    </div>
  )
}

// AI AGENT WORKFLOW PAGE

function AgentWorkflow() {
  const [expandedAgent, setExpandedAgent] = useState<number | null>(0)

  const agents = [
    {
      number: '01',
      name: 'AI Research Agent',
      icon: Search,
      color: 'blue',
      status: 'Ready for integration',
      description: 'Searches official BIS sources and gathers standards relevant to the submitted product.',
      tasks: [
        'Search official BIS standards and product-related documentation',
        'Collect standard numbers, titles, scope and source links',
        'Record publication or revision details where available',
      ],
      output: 'Evidence-backed list of potentially relevant BIS standards',
    },
    {
      number: '02',
      name: 'Requirement Analysis Agent',
      icon: BookOpen,
      color: 'indigo',
      status: 'Ready for integration',
      description: 'Examines the product and identifies certification and regulatory requirements.',
      tasks: [
        'Match product characteristics and intended use to relevant standards',
        'Separate mandatory requirements from voluntary certification',
        'Highlight uncertain points that need human or official confirmation',
      ],
      output: 'Requirement assessment with supporting evidence and confidence notes',
    },
    {
      number: '03',
      name: 'Document Verification Agent',
      icon: FileCheck,
      color: 'purple',
      status: 'Ready for integration',
      description: 'Checks submitted documents for completeness and information gaps.',
      tasks: [
        'Review uploaded product and manufacturer documents',
        'Identify missing, unreadable or inconsistent information',
        'Prepare a list of documents or details that need attention',
      ],
      output: 'Document review summary and missing-information checklist',
    },
    {
      number: '04',
      name: 'Laboratory Finder Agent',
      icon: FlaskConical,
      color: 'cyan',
      status: 'Ready for integration',
      description: 'Finds testing laboratories relevant to the product and required tests.',
      tasks: [
        'Identify the product testing category and relevant test requirements',
        'Search a verified laboratory dataset or supported directory',
        'Show available laboratory details and source information',
      ],
      output: 'Shortlist of relevant laboratories for the user to verify',
    },
    {
      number: '05',
      name: 'Action-Planning Agent',
      icon: ClipboardList,
      color: 'amber',
      status: 'Ready for integration',
      description: 'Turns the assessment into a practical, personalised certification roadmap.',
      tasks: [
        'Arrange required actions in a logical sequence',
        'Show documents, tests and information needed for each step',
        'Create a checklist that the manufacturer can update',
      ],
      output: 'Personalised certification action plan and checklist',
    },
    {
      number: '06',
      name: 'Progress Monitoring Agent',
      icon: Clock,
      color: 'green',
      status: 'Ready for integration',
      description: 'Tracks progress through the roadmap and highlights pending actions.',
      tasks: [
        'Track completed, pending and blocked checklist items',
        'Highlight upcoming actions and missing inputs',
        'Refresh the roadmap status when the user updates progress',
      ],
      output: 'Live progress summary and next-step reminders',
    },
  ]

  const colorStyles: Record<string, { icon: string; line: string; number: string }> = {
    blue: { icon: 'bg-blue-50 text-blue-600', line: 'border-blue-200', number: 'bg-blue-600' },
    indigo: { icon: 'bg-indigo-50 text-indigo-600', line: 'border-indigo-200', number: 'bg-indigo-600' },
    purple: { icon: 'bg-purple-50 text-purple-600', line: 'border-purple-200', number: 'bg-purple-600' },
    cyan: { icon: 'bg-cyan-50 text-cyan-600', line: 'border-cyan-200', number: 'bg-cyan-600' },
    amber: { icon: 'bg-amber-50 text-amber-600', line: 'border-amber-200', number: 'bg-amber-600' },
    green: { icon: 'bg-green-50 text-green-600', line: 'border-green-200', number: 'bg-green-600' },
  }

  return (
    <div className="max-w-6xl mx-auto space-y-7">
      <div>
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold tracking-wider mb-2">
          <Sparkles size={16} />
          MULTI-AGENT CERTIFICATION INTELLIGENCE
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">AI Agent Workflow</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Six specialised agents work in sequence to turn product information into an evidence-backed
          BIS standards and certification action plan.
        </p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-[#14264a] via-[#1d3d75] to-[#2563eb] p-6 md:p-8 text-white overflow-hidden relative">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-blue-100">
            <Sparkles size={14} /> STANDARDSPILOT AI PIPELINE
          </span>
          <h2 className="text-xl md:text-2xl font-bold mt-4">From product details to a clear certification roadmap.</h2>
          <p className="text-sm text-blue-100 leading-6 mt-2">
            Each agent handles a focused task. Findings are passed to the next stage, with official
            evidence and uncertainty made visible rather than guessing compliance requirements.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="text-xs bg-white/15 rounded-lg px-3 py-2">Research</span>
            <span className="text-blue-200">→</span>
            <span className="text-xs bg-white/15 rounded-lg px-3 py-2">Analyse</span>
            <span className="text-blue-200">→</span>
            <span className="text-xs bg-white/15 rounded-lg px-3 py-2">Verify</span>
            <span className="text-blue-200">→</span>
            <span className="text-xs bg-white/15 rounded-lg px-3 py-2">Find Labs</span>
            <span className="text-blue-200">→</span>
            <span className="text-xs bg-white/15 rounded-lg px-3 py-2">Plan</span>
            <span className="text-blue-200">→</span>
            <span className="text-xs bg-white/15 rounded-lg px-3 py-2">Track</span>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-16 opacity-10">
          <ShieldCheck size={230} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Specialised agents</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">06</p>
          <p className="text-xs text-slate-400 mt-1">Each with a defined responsibility</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Evidence-first approach</p>
          <p className="text-lg font-bold text-slate-900 mt-3">Official sources</p>
          <p className="text-xs text-slate-400 mt-1">Standards and requirements need citations</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs text-slate-500">Final deliverable</p>
          <p className="text-lg font-bold text-slate-900 mt-3">Action roadmap</p>
          <p className="text-xs text-slate-400 mt-1">A guided, trackable certification plan</p>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Agent execution sequence</h2>
            <p className="text-xs text-slate-500 mt-1">Select an agent to view its responsibilities and expected output.</p>
          </div>
          <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 w-fit">
            Backend integration pending
          </span>
        </div>

        <div className="space-y-3">
          {agents.map((agent, index) => {
            const Icon = agent.icon
            const style = colorStyles[agent.color]
            const isExpanded = expandedAgent === index

            return (
              <div key={agent.number} className={`bg-white border rounded-2xl shadow-sm overflow-hidden ${isExpanded ? style.line : 'border-slate-200'}`}>
                <button
                  type="button"
                  onClick={() => setExpandedAgent(isExpanded ? null : index)}
                  className="w-full text-left p-4 md:p-5 flex items-center gap-4 hover:bg-slate-50 transition"
                >
                  <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${style.icon}`}>
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">AGENT {agent.number}</span>
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">{agent.status}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mt-1">{agent.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{agent.description}</p>
                  </div>
                  <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 md:px-7 py-5 bg-slate-50/70">
                    <p className="text-xs font-bold text-slate-700 mb-3">KEY RESPONSIBILITIES</p>
                    <ul className="space-y-2">
                      {agent.tasks.map(task => (
                        <li key={task} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                          {task}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 rounded-xl bg-white border border-slate-200 p-4">
                      <p className="text-[10px] font-bold tracking-wider text-blue-600">EXPECTED OUTPUT</p>
                      <p className="text-sm font-semibold text-slate-800 mt-1">{agent.output}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-green-50 text-green-600"><CheckCircle2 size={22} /></div>
          <div>
            <h2 className="font-bold text-slate-900">Final system output</h2>
            <p className="text-xs text-slate-500 mt-1">What the manufacturer receives after the workflow is connected</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {[
            'Relevant BIS standards with official source references',
            'Mandatory and voluntary requirement distinction',
            'Document gaps and verification notes',
            'Relevant testing laboratory shortlist',
            'Personalised certification checklist',
            'Progress status and pending next actions',
          ].map(item => (
            <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-5 border-t border-slate-100 pt-4">
          Prototype view: these agents are currently represented in the frontend. Actual research,
          document checks, laboratory lookup and progress automation will be connected through the backend.
        </p>
      </div>
    </div>
  )
}         // DOCUMENT VERIFICATION PAGE

type UploadedDocument = {
  id: string
  name: string
  size: number
  extension: string
  uploadedAt: string
}

function DocumentVerification() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [reviewed, setReviewed] = useState(false)
  const [filter, setFilter] = useState('All')

  const allowedExtensions = ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg']

  const expectedDocuments = [
    { label: 'Product specification sheet', keywords: ['specification', 'spec', 'datasheet', 'data-sheet'] },
    { label: 'Product test report', keywords: ['test', 'testing', 'report', 'lab'] },
    { label: 'Manufacturer / company document', keywords: ['manufacturer', 'company', 'business', 'gst', 'license', 'licence'] },
    { label: 'Product application / supporting form', keywords: ['application', 'form', '申'] },
  ]

  const getExtension = (name: string) =>
    name.split('.').pop()?.toLowerCase() || ''

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${Math.max(1, Math.round(bytes / 1024))} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const accepted: UploadedDocument[] = []

    Array.from(files).forEach(file => {
      const extension = getExtension(file.name)

      if (!allowedExtensions.includes(extension)) return

      accepted.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        name: file.name,
        size: file.size,
        extension,
        uploadedAt: new Date().toLocaleDateString(),
      })
    })

    if (accepted.length) {
      setDocuments(previous => [...previous, ...accepted])
      setReviewed(false)
    }
  }

  const removeDocument = (id: string) => {
    setDocuments(previous =>
      previous.filter(document => document.id !== id)
    )
    setReviewed(false)
  }

  const matchedRequirements = expectedDocuments.filter(requirement =>
    documents.some(document =>
      requirement.keywords.some(keyword =>
        document.name.toLowerCase().includes(keyword)
      )
    )
  )

  const missingRequirements = expectedDocuments.filter(
    requirement => !matchedRequirements.includes(requirement)
  )

  const visibleDocuments = filter === 'All'
    ? documents
    : documents.filter(
        document => document.extension === filter.toLowerCase()
      )

  return (
    <div className="max-w-6xl mx-auto space-y-7">
      <div>
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold tracking-wider mb-2">
          <FileCheck size={16} />
          DOCUMENT INTELLIGENCE & COMPLETENESS REVIEW
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Document Verification
        </h1>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Upload product and manufacturer documents, organise the files and
          review the information still needed for a BIS assessment.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-slate-500">Documents uploaded</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {documents.length}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Files in this session
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-slate-500">
            Expected document types found
          </p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {matchedRequirements.length}
            <span className="text-base text-slate-400">
              {' '}/ {expectedDocuments.length}
            </span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Based on file names only
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-slate-500">Items to review</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">
            {missingRequirements.length}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Expected types not identified
          </p>
        </div>
      </div>

      {/* Upload area */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Upload size={22} />
          </div>

          <div>
            <h2 className="font-bold text-lg">
              Upload supporting documents
            </h2>
            <p className="text-xs text-slate-400">
              Select one or more files to add to this product review
            </p>
          </div>
        </div>

        <label className="border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/40 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <File size={27} />
          </div>

          <span className="font-semibold text-sm text-slate-800">
            Click to browse or drop your documents here
          </span>

          <span className="text-xs text-slate-400 mt-2">
            Supported: PDF, DOC, DOCX, PNG, JPG, JPEG
          </span>

          <span className="text-xs text-slate-400 mt-1">
            You can select multiple files
          </span>

          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            className="hidden"
            onChange={event => {
              handleFiles(event.target.files)
              event.target.value = ''
            }}
          />
        </label>

        <div className="flex items-start gap-2 mt-4 text-xs text-slate-500 bg-slate-50 rounded-xl p-3">
          <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p>
            Prototype limitation: files are currently held in the browser
            session. Their contents are not yet read or analysed by AI.
            Backend document parsing and verification will be connected later.
          </p>
        </div>
      </div>

      {/* Uploaded documents */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-lg">Uploaded documents</h2>
            <p className="text-xs text-slate-400 mt-1">
              Review and manage files added in this session
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={event => setFilter(event.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white outline-none"
            >
              <option>All</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
              <option value="docx">DOCX</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="jpeg">JPEG</option>
            </select>

            <button
              onClick={() => {
                setDocuments([])
                setReviewed(false)
              }}
              disabled={!documents.length}
              className="text-xs font-semibold text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg disabled:opacity-40"
            >
              Clear all
            </button>
          </div>
        </div>

        {visibleDocuments.length ? (
          <div className="divide-y divide-slate-100">
            {visibleDocuments.map(document => (
              <div
                key={document.id}
                className="px-5 md:px-6 py-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <FileText size={19} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {document.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {document.extension.toUpperCase()} · {formatSize(document.size)} · Added {document.uploadedAt}
                  </p>
                </div>

                <span className="hidden sm:inline-flex text-[10px] font-semibold rounded-full px-2.5 py-1 bg-amber-50 text-amber-700">
                  Awaiting review
                </span>

                <button
                  onClick={() => removeDocument(document.id)}
                  title="Remove document"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 px-5 text-center">
            <FileText size={30} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-semibold text-slate-600">
              No documents uploaded yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Your uploaded files will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Checklist and verification summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="font-bold text-lg">
                Completeness checklist
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Suggested document categories for an initial review
              </p>
            </div>
            <ClipboardList size={21} className="text-blue-600" />
          </div>

          <div className="space-y-3">
            {expectedDocuments.map(requirement => {
              const found = matchedRequirements.includes(requirement)

              return (
                <div
                  key={requirement.label}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"
                >
                  {found ? (
                    <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {requirement.label}
                    </p>
                    <p className={`text-xs mt-1 ${found ? 'text-green-700' : 'text-amber-700'}`}>
                      {found
                        ? 'Possible match found in a filename'
                        : 'Not identified from uploaded filenames'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h2 className="font-bold text-lg">Verification summary</h2>
              <p className="text-xs text-slate-400 mt-1">
                Initial completeness review
              </p>
            </div>
          </div>

          {!reviewed ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center">
              <Clock size={25} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">
                Review not started
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Upload documents, then run the demo completeness review.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                <p className="text-sm font-bold text-blue-800">
                  Initial review generated
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  {documents.length} file(s) uploaded · {matchedRequirements.length} expected category match(es) found by filename.
                </p>
              </div>

              <div className="text-xs text-slate-600 space-y-2">
                <p>
                  <strong>Missing filename matches:</strong>{' '}
                  {missingRequirements.length
                    ? missingRequirements.map(item => item.label).join(', ')
                    : 'None identified'}
                </p>
                <p>
                  <strong>Next step:</strong> Confirm the actual contents,
                  validity and applicability of each document.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => setReviewed(true)}
            disabled={!documents.length}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl px-5 py-3 text-sm font-semibold transition"
          >
            <Sparkles size={16} className="inline mr-2" />
            Run completeness review
          </button>

          <p className="text-[11px] text-slate-400 mt-3">
            Demo only: filename matching is not document-content verification
            and does not establish BIS compliance.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 flex items-start gap-3">
        <InfoIcon />
        <div>
          <p className="text-sm font-semibold text-blue-900">
            What happens after backend integration?
          </p>
          <p className="text-xs leading-5 text-blue-800 mt-1">
            The Document Verification Agent will extract document text,
            check required fields, flag unreadable or inconsistent information
            and produce evidence-linked review notes. This page currently
            demonstrates the upload and completeness workflow only.
          </p>
        </div>
      </div>
    </div>
  )
}

function InfoIcon() {
  return (
    <div className="w-8 h-8 rounded-lg bg-white text-blue-600 flex items-center justify-center shrink-0">
      <FileCheck size={17} />
    </div>
  )
}  

// BIS STANDARDS EXPLORER PAGE

function BISStandards() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [requirement, setRequirement] = useState('All')
  const [expanded, setExpanded] = useState<number | null>(null)

  // Illustrative records for frontend demonstration only.
  // Replace with verified official BIS data during backend integration.
  const standards = [
    {
      id: 1,
      name: 'Electrical Safety Requirements',
      number: 'Official number to be verified',
      category: 'Electrical Appliances',
      type: 'Mandatory',
      scope: 'Illustrative safety requirements for electrical appliances.',
      status: 'Demo record',
    },
    {
      id: 2,
      name: 'Household Appliance Performance',
      number: 'Official number to be verified',
      category: 'Electrical Appliances',
      type: 'Voluntary',
      scope: 'Illustrative performance and operational requirements.',
      status: 'Demo record',
    },
    {
      id: 3,
      name: 'LED Lighting Product Requirements',
      number: 'Official number to be verified',
      category: 'Electronics',
      type: 'Mandatory',
      scope: 'Illustrative requirements for LED lighting products.',
      status: 'Demo record',
    },
    {
      id: 4,
      name: 'Construction Material Quality',
      number: 'Official number to be verified',
      category: 'Construction Materials',
      type: 'Voluntary',
      scope: 'Illustrative quality and testing requirements.',
      status: 'Demo record',
    },
    {
      id: 5,
      name: 'Food Product Safety Requirements',
      number: 'Official number to be verified',
      category: 'Food Products',
      type: 'Mandatory',
      scope: 'Illustrative food product safety requirements.',
      status: 'Demo record',
    },
    {
      id: 6,
      name: 'Automotive Component Requirements',
      number: 'Official number to be verified',
      category: 'Automotive Products',
      type: 'Voluntary',
      scope: 'Illustrative automotive component requirements.',
      status: 'Demo record',
    },
  ]

  const filteredStandards = standards.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      category === 'All' || item.category === category

    const matchesRequirement =
      requirement === 'All' || item.type === requirement

    return matchesSearch && matchesCategory && matchesRequirement
  })

  return (
    <div className="max-w-6xl mx-auto space-y-7">
      <div>
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold tracking-wider mb-2">
          <BookOpen size={16} />
          STANDARDS DISCOVERY & REFERENCE
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          BIS Standards Explorer
        </h1>

        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Explore standards by product category, search the catalogue
          and review requirement classifications.
        </p>
      </div>

      <div className="bg-gradient-to-r from-[#172d55] to-[#2563eb] rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold">
          <Sparkles size={16} />
          AI-POWERED STANDARDS DISCOVERY
        </div>

        <h2 className="text-xl md:text-2xl font-bold mt-3">
          Find the standards relevant to your product.
        </h2>

        <p className="text-sm text-blue-100 mt-2 max-w-2xl leading-6">
          Search and explore the standards catalogue. Future backend
          integration will connect this explorer to verified official
          BIS records and source references.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Demo catalogue records</p>
          <p className="text-3xl font-bold mt-2">{standards.length}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Illustrative mandatory labels</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">
            {standards.filter(item => item.type === 'Mandatory').length}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Illustrative voluntary labels</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {standards.filter(item => item.type === 'Voluntary').length}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-4">Search and filter standards</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={17} className="absolute left-3 top-3.5 text-slate-400" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search standards..."
              className="w-full border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-3 text-sm outline-none"
          >
            <option value="All">All categories</option>
            <option>Electrical Appliances</option>
            <option>Electronics</option>
            <option>Food Products</option>
            <option>Construction Materials</option>
            <option>Automotive Products</option>
          </select>

          <select
            value={requirement}
            onChange={e => setRequirement(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-3 text-sm outline-none"
          >
            <option value="All">All requirement types</option>
            <option value="Mandatory">Mandatory</option>
            <option value="Voluntary">Voluntary</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-lg">Standards catalogue</h2>
            <p className="text-xs text-slate-400 mt-1">
              {filteredStandards.length} matching records
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {filteredStandards.map(item => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() =>
                  setExpanded(expanded === item.id ? null : item.id)
                }
                className="w-full text-left p-5 flex items-center gap-4 hover:bg-slate-50"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen size={21} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {item.category}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.number}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    item.type === 'Mandatory'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}>
                    {item.type}
                  </span>
                  <ChevronDown
                    size={17}
                    className={`text-slate-400 transition-transform ${
                      expanded === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {expanded === item.id && (
                <div className="border-t border-slate-100 bg-slate-50 p-5">
                  <p className="text-xs font-bold text-slate-500 mb-2">
                    SCOPE
                  </p>
                  <p className="text-sm text-slate-700">
                    {item.scope}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2">
                      Category: {item.category}
                    </span>
                    <span className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2">
                      Status: {item.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <AlertTriangle size={16} className="shrink-0" />
                    This is an illustrative frontend record, not a verified
                    BIS standard or an official mandatory/voluntary
                    classification. Confirm applicable requirements using
                    current official BIS and government notifications.
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredStandards.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
              <Search size={30} className="mx-auto text-slate-300 mb-3" />
              <p className="font-semibold text-slate-700">
                No matching standards found
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-3">
        <ShieldCheck size={22} className="text-blue-600 shrink-0" />
        <div>
          <h3 className="font-bold text-sm text-blue-900">
            Official-source verification
          </h3>
          <p className="text-xs text-blue-800 leading-5 mt-1">
            This catalogue currently contains demonstration records only.
            The connected version should retrieve standard numbers,
            editions, applicability, mandatory status and source links
            from verified official sources.
          </p>
        </div>
      </div>
    </div>
  )
}
// LABORATORY FINDER PAGE

function LaboratoryFinder() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [expandedLab, setExpandedLab] = useState<number | null>(null);

  const laboratories = [
    {
      id: 1,
      name: 'National Product Testing Centre',
      city: 'Bengaluru',
      state: 'Karnataka',
      type: 'Electrical & Electronics',
      capabilities: ['Electrical Safety', 'Performance Testing', 'Insulation Testing'],
      services: ['Electric kettles', 'Switches', 'Cables', 'Household appliances'],
      accreditation: 'Demo accreditation status — verify independently',
      turnaround: '7–12 working days (sample estimate)',
      email: 'contact@example.com',
      phone: '+91 00000 00000',
      description: 'Sample laboratory profile for demonstrating electrical product testing workflows.',
    },
    {
      id: 2,
      name: 'Advanced Materials Testing Lab',
      city: 'Chennai',
      state: 'Tamil Nadu',
      type: 'Materials & Components',
      capabilities: ['Material Analysis', 'Durability Testing', 'Chemical Testing'],
      services: ['Plastic components', 'Metal parts', 'Packaging materials'],
      accreditation: 'Demo accreditation status — verify independently',
      turnaround: '5–10 working days (sample estimate)',
      email: 'materials@example.com',
      phone: '+91 00000 00000',
      description: 'Sample laboratory profile for materials and component testing.',
    },
    {
      id: 3,
      name: 'Consumer Electronics Test Centre',
      city: 'Hyderabad',
      state: 'Telangana',
      type: 'Electronics & Safety',
      capabilities: ['Electrical Safety', 'EMI Testing', 'Performance Testing'],
      services: ['Chargers', 'Power adapters', 'Electronic devices'],
      accreditation: 'Demo accreditation status — verify independently',
      turnaround: '8–14 working days (sample estimate)',
      email: 'electronics@example.com',
      phone: '+91 00000 00000',
      description: 'Sample laboratory profile for consumer electronics testing.',
    },
    {
      id: 4,
      name: 'Industrial Quality Testing Facility',
      city: 'Pune',
      state: 'Maharashtra',
      type: 'Industrial Products',
      capabilities: ['Mechanical Testing', 'Load Testing', 'Durability Testing'],
      services: ['Industrial equipment', 'Mechanical components', 'Tools'],
      accreditation: 'Demo accreditation status — verify independently',
      turnaround: '10–15 working days (sample estimate)',
      email: 'quality@example.com',
      phone: '+91 00000 00000',
      description: 'Sample laboratory profile for industrial product testing.',
    },
  ];

  const locations = [
    'All Locations',
    'Bengaluru',
    'Chennai',
    'Hyderabad',
    'Pune',
  ];

  const filteredLabs = laboratories.filter((lab) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      lab.name.toLowerCase().includes(searchText) ||
      lab.city.toLowerCase().includes(searchText) ||
      lab.type.toLowerCase().includes(searchText) ||
      lab.capabilities.some((item) =>
        item.toLowerCase().includes(searchText)
      ) ||
      lab.services.some((item) =>
        item.toLowerCase().includes(searchText)
      );

    const matchesLocation =
      location === 'All Locations' || lab.city === location;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-indigo-600 font-semibold mb-2">
          <FlaskConical size={17} />
          TESTING NETWORK
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Laboratory Finder
        </h1>

        <p className="text-slate-500 mt-2">
          Discover testing facilities based on product type, location, and
          testing requirements.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex gap-3">
          <AlertTriangle className="text-amber-600 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-amber-900">
              Demonstration data
            </p>
            <p className="text-sm text-amber-800 mt-1">
              These laboratory profiles and contact details are fictional
              examples for the prototype. They do not confirm actual
              laboratory availability, BIS recognition, or accreditation.
              Verify details through official sources before using a lab.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-sm text-slate-500">Demo laboratories</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {laboratories.length}
          </h2>
          <p className="text-xs text-slate-400 mt-1">Sample records</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-sm text-slate-500">Locations covered</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">4</h2>
          <p className="text-xs text-slate-400 mt-1">Sample cities</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-sm text-slate-500">Testing categories</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">4+</h2>
          <p className="text-xs text-slate-400 mt-1">Illustrative categories</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-900 mb-4">
          Find a testing laboratory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lab, city, product, or testing capability..."
              className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {locations.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filteredLabs.length}</span> sample results
          </p>

          <button
            onClick={() => {
              setSearch('');
              setLocation('All Locations');
              setExpandedLab(null);
            }}
            className="text-sm text-indigo-600 font-semibold hover:text-indigo-800"
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLabs.length > 0 ? (
          filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <FlaskConical className="text-indigo-600" size={23} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {lab.name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {lab.city}, {lab.state}
                    </p>

                    <span className="inline-block mt-2 text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                      {lab.type}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setExpandedLab(
                      expandedLab === lab.id ? null : lab.id
                    )
                  }
                  className="text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-lg px-4 py-2 hover:bg-indigo-50"
                >
                  {expandedLab === lab.id ? 'Hide Details' : 'View Details'}
                  <ArrowUpRight size={15} className="inline ml-2" />
                </button>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Testing capabilities
                </p>

                <div className="flex flex-wrap gap-2">
                  {lab.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="text-xs bg-slate-100 text-slate-700 px-3 py-2 rounded-lg"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              {expandedLab === lab.id && (
                <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
                  <p className="text-sm text-slate-600">
                    {lab.description}
                  </p>

                  <div>
                    <p className="text-sm font-semibold text-slate-800 mb-2">
                      Products supported
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {lab.services.map((service) => (
                        <span
                          key={service}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500">Contact email</p>
                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {lab.email}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500">Contact number</p>
                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {lab.phone}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500">Estimated turnaround</p>
                      <p className="text-sm font-medium text-slate-800 mt-1">
                        {lab.turnaround}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-500">Accreditation information</p>
                      <p className="text-sm font-medium text-amber-700 mt-1">
                        {lab.accreditation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <Search size={30} className="text-slate-300 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800">
              No laboratories found
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Try a different search term or location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


function WelcomeHome({ onNavigate }: { onNavigate: (page: string) => void }) {
  const quickActions = [
    {
      title: 'Explore BIS Standards',
      subtitle: 'Discover relevant Indian standards',
      icon: Search,
      page: 'BIS Standards',
    },
    {
      title: 'Find a Laboratory',
      subtitle: 'Explore testing laboratories',
      icon: FlaskConical,
      page: 'Laboratory Finder',
    },
    {
      title: 'Check Documents',
      subtitle: 'Verify certification documents',
      icon: FileCheck,
      page: 'Document Verification',
    },
    {
      title: 'Analyse Product',
      subtitle: 'Start a product assessment',
      icon: Package,
      page: 'Product Analysis',
    },
  ]

  return (
    <div className="relative min-h-screen -m-5 md:-m-8 overflow-hidden bg-black text-white">

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 p-5 md:p-8 space-y-8">

        {/* TOP HERO SECTION */}
        <section className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-[#071426] via-[#080b15] to-black p-5 md:p-7">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-1/3 w-72 h-40 bg-amber-500/10 blur-[90px] rounded-full" />

          {/* Circuit-style background lines */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-center">
            </div>
            {/* LEFT CONTENT */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold tracking-wider text-amber-300 mb-6">
                <Sparkles size={15} />
                SMARTER COMPLIANCE. BRIGHTER FUTURE.
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
                Welcome to

                <span className="block text-yellow-400 drop-shadow-[0_0_18px_rgba(250,204,21,0.25)]">
                  StandardsPilot
              </span>
              </h1>

              <p className="mt-6 text-gray-300 text-base md:text-lg leading-8 max-w-xl">
                Leverage AI to explore BIS standards, verify products
                and make smarter compliance decisions.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">

                <button
                  onClick={() => onNavigate('Product Analysis')}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-500 px-6 py-3.5 font-bold text-black shadow-lg shadow-amber-500/20 transition hover:scale-105"
                >
                  Start a Decision
                  <ArrowUpRight size={19} />
                </button>

                <button
                  onClick={() => onNavigate('AI Agent Workflow')}
                  className="flex items-center gap-2 rounded-xl border border-blue-400/40 bg-blue-500/5 px-6 py-3.5 font-semibold text-blue-200 transition hover:bg-blue-500/15"
                >
                  <Zap size={18} />
                  Watch Demo
                </button>

              </div>

              {/* FEATURE HIGHLIGHTS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-9">

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <ShieldCheck size={21} className="text-blue-400" />
                  Smart Compliance
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Zap size={21} className="text-amber-400" />
                  AI-Powered Insights
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Target size={21} className="text-blue-400" />
                  Guided Certification
                </div>

              </div>
            </div>

            {/* RIGHT HOLOGRAPHIC BIS VISUAL */}
<div className="relative flex items-center justify-center min-h-[260px] md:min-h-[300px] self-start mt-4">
{/* Outer glowing rings */}
<div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-blue-400/30 animate-pulse" />

<div className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full border border-dashed border-blue-400/40" />

  {/* Blue holographic lighting */}
  <div className="absolute w-64 h-64 rounded-full bg-blue-500/20 blur-[80px]" />

  {/* Central BIS shield */}
  <div className="relative z-10 flex flex-col items-center justify-center w-44 h-48 md:w-56 md:h-60">

    <div className="flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-[45%] border-2 border-blue-400/70 bg-gradient-to-b from-blue-500/20 via-[#071426] to-black shadow-[0_0_80px_rgba(59,130,246,0.55)]">

      <ShieldCheck
        size={90}
        strokeWidth={1.5}
        className="text-blue-300 drop-shadow-[0_0_25px_rgba(59,130,246,1)]"
      />

      <h2 className="text-4xl font-black tracking-[6px] text-white mt-1">
        BIS
      </h2>

    </div>

    <p className="w-full whitespace-nowrap text-center text-[9px] md:text-[10px] tracking-[2px] text-amber-300 mt-4 font-bold">
  QUALITY • SAFETY • TRUST
</p>

  </div>

  {/* Floating verification icons */}
  <div className="absolute top-8 right-5 rounded-xl border border-blue-400/50 bg-[#071426] p-3 shadow-lg shadow-blue-500/20">
    <CheckCircle2 size={27} className="text-blue-300" />
  </div>

  <div className="absolute bottom-8 left-5 rounded-xl border border-amber-400/40 bg-[#17130a] p-3">
    <BookOpen size={27} className="text-amber-300" />
  </div>

        </div>
        </section>

        {/* QUICK ACTIONS */}
        <section>

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <Zap className="text-amber-400" />
                Quick Actions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Everything you need to begin your compliance journey.
              </p>
            </div>

            <span className="hidden sm:inline-flex text-xs text-blue-300 border border-blue-400/20 bg-blue-500/5 rounded-full px-3 py-2">
              AI Compliance Assistant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            {quickActions.map((action) => {
              const Icon = action.icon

              return (
                <button
                  key={action.title}
                  onClick={() => onNavigate(action.page)}
                  className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-[#101a2b] to-[#090d16] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]"
                >

                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-amber-400/15" />

                  <div className="relative z-10">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">
                      <Icon size={25} className="text-blue-300 transition group-hover:text-amber-300" />
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {action.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      {action.subtitle}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-amber-300">
                      Explore
                      <ArrowUpRight size={15} />
                    </div>

                  </div>
                </button>
              )
            })}

          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-5 text-center">
          <p className="text-xs text-gray-500">
            StandardsPilot AI · Intelligent Product Standards & Certification Assistant
          </p>
          <p className="text-[10px] text-gray-600 mt-2">
            Prototype interface · Compliance recommendations require official verification.
          </p>
        </footer>

      </div>
    </div>
  )
}

function ActionTracker() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete product documentation', category: 'Documentation', due: '2026-11-15', done: false },
    { id: 2, title: 'Submit product samples for testing', category: 'Laboratory Testing', due: '2026-11-18', done: false },
    { id: 3, title: 'Review applicable BIS standards', category: 'Standards', due: '2026-11-20', done: true },
    { id: 4, title: 'Verify supporting certificates', category: 'Verification', due: '2026-11-22', done: false },
    { id: 5, title: 'Prepare certification application', category: 'Certification', due: '2026-11-25', done: false },
  ])

  const completed = tasks.filter(task => task.done).length
  const progress = Math.round((completed / tasks.length) * 100)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-amber-500 text-xs font-bold tracking-widest">COMPLIANCE MANAGEMENT</p>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">Action Tracker</h1>
        <p className="text-slate-500 mt-2">Track important tasks throughout your certification journey.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg text-slate-900">Overall Progress</h2>
            <p className="text-sm text-slate-500 mt-1">{completed} of {tasks.length} tasks completed</p>
          </div>
          <span className="text-3xl font-bold text-amber-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full mt-5 overflow-hidden">
          <div className="bg-amber-400 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-slate-500">Total Tasks</p>
          <h3 className="text-3xl font-bold mt-2 text-slate-900">{tasks.length}</h3>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-slate-500">Completed</p>
          <h3 className="text-3xl font-bold mt-2 text-emerald-600">{completed}</h3>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <p className="text-sm text-slate-500">Pending</p>
          <h3 className="text-3xl font-bold mt-2 text-amber-600">{tasks.length - completed}</h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-5">Certification Checklist</h2>
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-amber-300 transition">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => setTasks(previous => previous.map(item => item.id === task.id ? { ...item, done: !item.done } : item))}
                className="w-5 h-5 accent-amber-500 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">{task.category} · Due {task.due}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${task.done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                {task.done ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-5">Sample tasks for the frontend prototype. Changes are temporary and reset on refresh.</p>
      </div>
    </div>
  )
}



function Reports() {
  const reportData = [
    { id: 'RPT-001', product: 'Electric Kettle', standard: 'IS 302', status: 'Compliant', date: '10 Nov 2026' },
    { id: 'RPT-002', product: 'LED Bulb 12W', standard: 'IS 16102', status: 'Pending', date: '09 Nov 2026' },
    { id: 'RPT-003', product: 'Smart Power Adapter', standard: 'IS 13252', status: 'Review Required', date: '08 Nov 2026' },
    { id: 'RPT-004', product: 'Electric Iron', standard: 'IS 302', status: 'Compliant', date: '07 Nov 2026' },
  ]

  const downloadReport = () => {
    const headers = ['Report ID', 'Product', 'BIS Standard', 'Status', 'Date']
    const rows = reportData.map(report => [
      report.id,
      report.product,
      report.standard,
      report.status,
      report.date,
    ])

    const csv = [headers, ...rows]
      .map(row => row.map(value => `"${value}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'StandardsPilot-Compliance-Report.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const compliant = reportData.filter(report => report.status === 'Compliant').length
  const pending = reportData.filter(report => report.status === 'Pending').length
  const review = reportData.filter(report => report.status === 'Review Required').length

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p className="text-amber-600 text-xs font-bold tracking-widest">
            COMPLIANCE INTELLIGENCE
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mt-2">
            Reports & Analytics
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Review product certification status and compliance reports.
          </p>
        </div>

        <button
          onClick={downloadReport}
          className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-5 py-3 rounded-xl text-sm transition shadow-lg shadow-amber-100"
        >
          ↓ Download Report
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { title: 'Total Reports', value: reportData.length, color: 'text-slate-900' },
          { title: 'Compliant', value: compliant, color: 'text-emerald-600' },
          { title: 'Pending', value: pending, color: 'text-amber-600' },
          { title: 'Review Required', value: review, color: 'text-red-600' },
        ].map(card => (
          <div key={card.title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.title}</p>
            <h2 className={`text-3xl font-bold mt-4 ${card.color}`}>
              {card.value}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Sample report data
            </p>
          </div>
        ))}
      </div>

      {/* COMPLIANCE SUMMARY */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Compliance Summary
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Distribution of sample product reports.
        </p>

        {[
          { label: 'Compliant Products', value: compliant, color: 'bg-emerald-500' },
          { label: 'Pending Products', value: pending, color: 'bg-amber-400' },
          { label: 'Review Required', value: review, color: 'bg-red-500' },
        ].map(item => (
          <div key={item.label} className="mb-5 last:mb-0">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-700 font-medium">{item.label}</span>
              <span className="font-bold text-slate-900">
                {Math.round((item.value / reportData.length) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.value / reportData.length) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* REPORT HISTORY */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Reports
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Product-wise certification report history.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[650px]">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-4">REPORT ID</th>
                <th className="px-5 py-4">PRODUCT</th>
                <th className="px-5 py-4">BIS STANDARD</th>
                <th className="px-5 py-4">STATUS</th>
                <th className="px-5 py-4">DATE</th>
              </tr>
            </thead>

            <tbody>
              {reportData.map(report => (
                <tr key={report.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                    {report.id}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {report.product}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {report.standard}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      report.status === 'Compliant'
                        ? 'bg-emerald-50 text-emerald-700'
                        : report.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {report.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 p-4 border-t border-slate-100">
          Illustrative records for the frontend prototype. Actual certification data will require backend integration.
        </p>
      </div>

    </div>
  )
}

function Settings() {
  const [name, setName] = useState('Admin')
  const [email, setEmail] = useState('admin@standardspilot.ai')
  const [workspace, setWorkspace] = useState('StandardsPilot Workspace')
  const [notifications, setNotifications] = useState(true)
  const [updates, setUpdates] = useState(true)
  const [saved, setSaved] = useState(false)

  const toggle = (value: boolean, setter: (value: boolean) => void) => {
    setter(!value)
    setSaved(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-amber-600 text-xs font-bold tracking-widest">WORKSPACE PREFERENCES</p>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">Settings</h1>
        <p className="text-slate-500 text-sm mt-2">Manage your profile and workspace preferences.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Admin Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input value={name} onChange={e => { setName(e.target.value); setSaved(false) }} className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setSaved(false) }} className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-amber-400" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Workspace Details</h2>
        <label className="block text-sm font-medium text-slate-700 mb-2">Workspace Name</label>
        <input value={workspace} onChange={e => { setWorkspace(e.target.value); setSaved(false) }} className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-amber-400" />
        <p className="text-xs text-slate-400 mt-2">Your workspace name displayed in StandardsPilot.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-5">Notifications</h2>

        <div className="flex justify-between items-center py-3 border-b border-slate-100">
          <div>
            <p className="font-medium text-sm text-slate-800">Certification Notifications</p>
            <p className="text-xs text-slate-500 mt-1">Receive updates about certification tasks.</p>
          </div>
          <button onClick={() => toggle(notifications, setNotifications)} className={`w-12 h-6 rounded-full transition ${notifications ? 'bg-amber-400' : 'bg-slate-300'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <div className="flex justify-between items-center py-3">
          <div>
            <p className="font-medium text-sm text-slate-800">Product & Standards Updates</p>
            <p className="text-xs text-slate-500 mt-1">Stay informed about product and standards updates.</p>
          </div>
          <button onClick={() => toggle(updates, setUpdates)} className={`w-12 h-6 rounded-full transition ${updates ? 'bg-amber-400' : 'bg-slate-300'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${updates ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button onClick={() => setSaved(true)} className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-3 rounded-xl transition">
          Save Settings
        </button>
        {saved && <p className="text-sm text-emerald-600 font-semibold">Settings saved for this session!</p>}
      </div>

      <p className="text-xs text-slate-400">Frontend prototype: settings are held in temporary page state and reset when the page reloads.</p>
    </div>
  )
}

function ComplianceGapDetector() {
  const [selectedProduct, setSelectedProduct] = useState('Electric Kettle')
  const [analysed, setAnalysed] = useState(false)

  const gapData: Record<string, { gap: string; risk: string; action: string }[]> = {
    'Electric Kettle': [
      { gap: 'Product safety test report not confirmed', risk: 'High', action: 'Obtain and verify the applicable electrical safety test report.' },
      { gap: 'Technical specification review pending', risk: 'Medium', action: 'Review rated voltage, power, capacity and product specifications.' },
      { gap: 'Manufacturer documentation needs verification', risk: 'Medium', action: 'Verify manufacturer details and supporting business documents.' },
    ],
    'LED Bulb 12W': [
      { gap: 'Applicable product standard not verified', risk: 'High', action: 'Confirm the applicable BIS standard and its current status.' },
      { gap: 'Photometric test evidence not confirmed', risk: 'Medium', action: 'Obtain relevant performance test documentation.' },
      { gap: 'Label and marking details need review', risk: 'Low', action: 'Review product labels and required declarations.' },
    ],
    'Smart Power Adapter': [
      { gap: 'Electrical safety evidence not confirmed', risk: 'High', action: 'Obtain relevant electrical safety test evidence.' },
      { gap: 'Component specifications need review', risk: 'Medium', action: 'Verify input, output and component specifications.' },
      { gap: 'Certification documentation incomplete', risk: 'High', action: 'Collect and verify the required certification documents.' },
    ],
    'Pressure Cooker': [
      { gap: 'Material specifications need verification', risk: 'Medium', action: 'Review material and construction specifications.' },
      { gap: 'Product test report not confirmed', risk: 'High', action: 'Obtain the applicable product testing evidence.' },
      { gap: 'Safety instructions need review', risk: 'Low', action: 'Review product instructions and safety information.' },
    ],
  }

  const gaps = gapData[selectedProduct]
  const highRisk = gaps.filter(item => item.risk === 'High').length
  const mediumRisk = gaps.filter(item => item.risk === 'Medium').length

  return (
    <div className="max-w-6xl mx-auto space-y-7">
      <div>
        <div className="flex items-center gap-2 text-blue-600 text-xs font-bold tracking-wider mb-2">
          <ShieldCheck size={16} />
          INTELLIGENT COMPLIANCE ASSESSMENT
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          AI Compliance Gap Detector
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Identify potential missing requirements, prioritise risks and
          generate recommended next actions for product certification.
        </p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-[#101c38] via-[#183b70] to-[#2563eb] p-6 md:p-8 text-white">
        <div className="flex items-center gap-2 text-blue-200 text-xs font-bold">
          <Sparkles size={16} /> STANDARDSPILOT INTELLIGENCE ENGINE
        </div>
        <h2 className="text-xl md:text-2xl font-bold mt-4">
          Find the gaps before they become compliance risks.
        </h2>
        <p className="text-sm text-blue-100 mt-2 max-w-2xl leading-6">
          Review potential documentation and requirement gaps, understand
          their priority and see the next recommended action.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <select
            value={selectedProduct}
            onChange={e => {
              setSelectedProduct(e.target.value)
              setAnalysed(false)
            }}
            className="flex-1 rounded-xl bg-white text-slate-800 px-4 py-3 text-sm outline-none"
          >
            {Object.keys(gapData).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <button
            onClick={() => setAnalysed(true)}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl px-6 py-3 text-sm transition"
          >
            <Sparkles size={16} className="inline mr-2" />
            Run Gap Analysis
          </button>
        </div>
      </div>

      {!analysed ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target size={27} />
          </div>
          <h2 className="font-bold text-lg text-slate-900">
            Ready to analyse {selectedProduct}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Select a product and run the analysis to view its illustrative
            compliance gap report.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-slate-500">Potential gaps identified</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{gaps.length}</p>
            </div>
            <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-slate-500">High priority</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{highRisk}</p>
            </div>
            <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-slate-500">Medium priority</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{mediumRisk}</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 md:p-6 border-b border-slate-100">
              <h2 className="font-bold text-lg text-slate-900">
                Gap analysis report
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Product: {selectedProduct} · Illustrative demo findings
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {gaps.map((item, index) => (
                <div key={index} className="p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {item.gap}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          Recommended action: {item.action}
                        </p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full w-fit ${
                      item.risk === 'High'
                        ? 'bg-red-50 text-red-700'
                        : item.risk === 'Medium'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-green-50 text-green-700'
                    }`}>
                      {item.risk} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs leading-5 text-amber-800">
              Demo limitation: these findings are sample scenarios, not
              AI-generated or verified BIS requirements. Actual gap detection
              requires official standards data and document analysis.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

function TraceabilityMatrix() {
  const [filter, setFilter] = useState('All')

  const records = [
    { id: 'REQ-001', requirement: 'Product safety requirements', standard: 'Applicable IS Standard', evidence: 'Safety Test Report', owner: 'Quality Team', status: 'Verified', priority: 'High' },
    { id: 'REQ-002', requirement: 'Electrical performance testing', standard: 'Electrical Test Standard', evidence: 'Performance Report', owner: 'Testing Team', status: 'Under Review', priority: 'High' },
    { id: 'REQ-003', requirement: 'Manufacturer information', standard: 'Certification Documentation', evidence: 'Manufacturer Certificate', owner: 'Documentation Team', status: 'Missing', priority: 'Medium' },
    { id: 'REQ-004', requirement: 'Product labelling and marking', standard: 'Labelling Requirements', evidence: 'Product Label Document', owner: 'Compliance Team', status: 'Verified', priority: 'Medium' },
    { id: 'REQ-005', requirement: 'Technical specifications', standard: 'Product Specification Requirements', evidence: 'Technical Datasheet', owner: 'Engineering Team', status: 'Under Review', priority: 'Low' },
  ]

  const filteredRecords = filter === 'All'
    ? records
    : records.filter(record => record.status === filter)

  const verified = records.filter(record => record.status === 'Verified').length
  const missing = records.filter(record => record.status === 'Missing').length

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <p className="text-blue-600 text-xs font-bold tracking-widest">REQUIREMENT-TO-EVIDENCE MAPPING</p>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">Traceability Matrix</h1>
        <p className="text-slate-500 mt-2">Track every compliance requirement from its standard reference to supporting evidence.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Total Requirements</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-900">{records.length}</h2>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Verified Requirements</p>
          <h2 className="text-3xl font-bold mt-2 text-emerald-600">{verified}</h2>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Missing Evidence</p>
          <h2 className="text-3xl font-bold mt-2 text-red-600">{missing}</h2>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Requirement Traceability Records</h2>
            <p className="text-xs text-slate-500 mt-1">Illustrative requirement and evidence mapping</p>
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-2 text-sm"
          >
            <option>All</option>
            <option>Verified</option>
            <option>Under Review</option>
            <option>Missing</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[850px]">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500">
                <th className="p-3">Requirement ID</th>
                <th className="p-3">Requirement</th>
                <th className="p-3">Standard Reference</th>
                <th className="p-3">Supporting Evidence</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={record.id} className="border-t border-slate-100 text-sm">
                  <td className="p-3 font-bold text-blue-700">{record.id}</td>
                  <td className="p-3 text-slate-800">{record.requirement}</td>
                  <td className="p-3 text-slate-600">{record.standard}</td>
                  <td className="p-3 text-slate-600">{record.evidence}</td>
                  <td className="p-3 text-slate-600">{record.owner}</td>
                  <td className="p-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      record.status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700'
                        : record.status === 'Missing'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <p className="text-center text-sm text-slate-500 py-8">No records found for this filter.</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-sm font-semibold text-blue-900">Why traceability matters</p>
        <p className="text-xs text-blue-800 mt-1 leading-5">
          Each requirement is mapped to a standard reference, supporting evidence and responsible team. This helps identify missing documentation and track verification progress.
        </p>
        <p className="text-xs text-blue-700 mt-2">
          Demo limitation: sample records only. Actual standards and evidence must be validated against official sources.
        </p>
      </div>
    </div>
  )
}

function RegulatoryChangeRadar() {
  const [filter, setFilter] = useState('All')

  const updates = [
    {
      id: 'REG-001',
      title: 'Electrical Product Safety Requirements',
      category: 'Electrical Appliances',
      date: '2026-11-05',
      impact: 'High',
      status: 'Action Required',
      action: 'Review applicable safety requirements and supporting test reports.'
    },
    {
      id: 'REG-002',
      title: 'Product Labelling and Marking Review',
      category: 'Consumer Products',
      date: '2026-10-28',
      impact: 'Medium',
      status: 'Under Review',
      action: 'Check product labels and required declarations.'
    },
    {
      id: 'REG-003',
      title: 'Documentation and Certification Review',
      category: 'All Categories',
      date: '2026-10-18',
      impact: 'Low',
      status: 'Monitoring',
      action: 'Monitor documentation requirements for possible changes.'
    },
    {
      id: 'REG-004',
      title: 'Laboratory Testing Documentation',
      category: 'Electronic Products',
      date: '2026-10-10',
      impact: 'High',
      status: 'Action Required',
      action: 'Review test evidence and laboratory documentation.'
    }
  ]

  const filteredUpdates = filter === 'All'
    ? updates
    : updates.filter(item => item.impact === filter)

  const high = updates.filter(item => item.impact === 'High').length
  const medium = updates.filter(item => item.impact === 'Medium').length

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <p className="text-blue-600 text-xs font-bold tracking-widest">
          REGULATORY INTELLIGENCE
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mt-2">
          Regulatory Change Radar
        </h1>
        <p className="text-slate-500 mt-2">
          Monitor illustrative regulatory updates, assess potential impact and identify recommended actions.
        </p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-[#101c38] via-[#183b70] to-[#2563eb] p-6 md:p-8 text-white">
        <div className="flex items-center gap-2 text-blue-200 text-xs font-bold">
          <Bell size={16} />
          STANDARDSPILOT REGULATORY INTELLIGENCE
        </div>
        <h2 className="text-2xl font-bold mt-4">
          Stay ahead of compliance changes.
        </h2>
        <p className="text-sm text-blue-100 mt-2 max-w-2xl">
          Identify potentially affected product categories, understand impact levels and plan your next compliance actions.
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs text-blue-100">
          <Clock size={15} />
          Demo update feed · Sample records
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Updates Tracked</p>
          <h3 className="text-3xl font-bold mt-2">{updates.length}</h3>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">High Impact</p>
          <h3 className="text-3xl font-bold mt-2 text-red-600">{high}</h3>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-slate-500">Medium Impact</p>
          <h3 className="text-3xl font-bold mt-2 text-amber-600">{medium}</h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Regulatory Update Feed
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Filter updates by potential impact level
            </p>
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-2 text-sm"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredUpdates.map(item => (
            <div key={item.id} className="border border-slate-200 rounded-xl p-5 hover:border-blue-200 transition">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-blue-600">{item.id}</p>
                  <h3 className="font-bold text-slate-900 mt-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-2">
                    {item.category} · {item.date}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 h-fit">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.impact === 'High'
                      ? 'bg-red-50 text-red-700'
                      : item.impact === 'Medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {item.impact} Impact
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 bg-slate-50 rounded-lg p-3">
                <p className="text-xs font-bold text-slate-700">Recommended Action</p>
                <p className="text-sm text-slate-600 mt-1">{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-900">Prototype data disclaimer</p>
            <p className="text-xs text-amber-800 mt-1 leading-5">
              These are illustrative sample updates, not actual regulatory notifications. Live monitoring requires integration with official BIS and government notification sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


// MAIN APPLICATION

function App() {
  const [active, setActive] = useState('Home')
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">
      {/* Sidebar */}
      {/* Sidebar Background Overlay */}
{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40"
    onClick={() => setSidebarOpen(false)}
  />
)}

{/* Sidebar */}
<aside
  className={`fixed top-0 left-0 z-50 w-64 h-screen bg-[#080808] border-r border-amber-500/20 text-white flex flex-col overflow-y-auto overflow-x-hidden transition-transform duration-300 ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
>

        <div className="px-6 py-7 flex items-center gap-3 border-b border-white/10">
          <div className="bg-amber-400/15 text-amber-400 rounded-xl p-2 border border-amber-400/30">
            <ShieldCheck size={25} />
          </div>

          <div>
            <h1 className="font-bold text-lg tracking-tight">
              StandardsPilot
            </h1>
            <p className="text-xs text-blue-300">
              AI Certification Assistant
            </p>
          </div>
        </div>

        <div className="px-4 py-6 flex-1">
          <p className="text-[10px] text-slate-400 font-bold tracking-[2px] mb-4 px-3">
            WORKSPACE
          </p>

          <nav className="space-y-1">
            {navigation.map(item => {
              const Icon = item.icon

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActive(item.name)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition ${
                    active === item.name
                      ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              setActive('Settings')
              setSidebarOpen(false)
            }}
            className="w-full flex items-center gap-3 p-3 text-slate-300 hover:bg-white/10 rounded-lg text-sm"
          >
            <SettingsIcon size={18} /> Settings
          </button>

          <div className="mt-3 p-3 bg-white/5 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                SP
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Admin Workspace
                </p>
                <p className="text-xs text-slate-400">
                  Free prototype
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 min-w-0 ${active === 'Home' ? 'bg-black' : 'bg-slate-50'}`}>
        {/* Topbar */}
        <header className={`h-20 ${active === 'Home' ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} border-b flex items-center justify-between px-5 md:px-8 sticky top-0 z-10`}>
          <div className="flex items-center gap-3">
            <button
  className="p-2 rounded-lg hover:bg-slate-100 transition"
  onClick={() => setSidebarOpen(!sidebarOpen)}
  aria-label="Toggle sidebar"
>
  <Menu size={22} />
</button>

            <div>
              <p className="text-xs text-slate-400">
                Workspace / {active}
              </p>
              <h2 className="font-bold text-lg">
                {active}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg ${active === 'Home' ? 'bg-white/10' : 'bg-slate-100'}`}>
              <Search size={16} className="text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className={`bg-transparent outline-none text-sm w-36 ${active === 'Home' ? 'text-white placeholder-gray-400' : 'text-slate-900'}`}
              />
            </div>

            <button className="relative p-2 hover:bg-slate-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button className="hidden sm:flex items-center gap-2 text-sm font-medium">
              Admin <ChevronDown size={15} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="p-5 md:p-8 max-w-[1500px] mx-auto">
          {active === 'Home' ? (
  <WelcomeHome onNavigate={setActive} />
) : active === 'Overview' ? (
            <>
              {/* Welcome */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-bold tracking-wider mb-2">
                    <Sparkles size={15} />
                    AI-POWERED COMPLIANCE INTELLIGENCE
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Welcome to StandardsPilot
                  </h1>

                  <p className="text-slate-500 mt-2 text-sm">
                    Simplify product standards, certification and compliance.
                  </p>
                </div>

                <button
                  onClick={() => setActive('Product Analysis')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg shadow-blue-200"
                >
                  <Plus size={18} />
                  New Product Analysis
                </button>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {[
                  { title: 'Products Analysed', value: '128', icon: Package, color: 'blue', change: '+12 this month' },
                  { title: 'Compliant Products', value: '86', icon: CheckCircle2, color: 'green', change: '67% of total' },
                  { title: 'Pending Reviews', value: '24', icon: Clock, color: 'amber', change: 'Needs attention' },
                  { title: 'Action Required', value: '18', icon: AlertTriangle, color: 'red', change: 'Requires review' },
                ].map(stat => {
                  const Icon = stat.icon

                  const colors: Record<string, string> = {
                    blue: 'bg-blue-50 text-blue-600',
                    green: 'bg-green-50 text-green-600',
                    amber: 'bg-amber-50 text-amber-600',
                    red: 'bg-red-50 text-red-600',
                  }

                  return (
                    <div
                      key={stat.title}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-slate-500">
                          {stat.title}
                        </p>

                        <div className={`p-2 rounded-xl ${colors[stat.color]}`}>
                          <Icon size={20} />
                        </div>
                      </div>

                      <h3 className="text-3xl font-bold mt-4">
                        {stat.value}
                      </h3>

                      <p className="text-xs text-slate-400 mt-2">
                        {stat.change}
                      </p>
                    </div>
                  )
                })}
              </div>
              
              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                {/* Pie Chart */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">
                    Product Compliance Distribution
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Breakdown of 128 analysed products
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-7">

                    <div
                      className="w-44 h-44 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: 'conic-gradient(#16a34a 0% 67.1875%, #f59e0b 67.1875% 85.9375%, #ef4444 85.9375% 100%)'
                      }}
                    >
                      <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900">128</span>
                        <span className="text-xs text-slate-400">Total Products</span>
                      </div>
                    </div>

                    <div className="space-y-5 w-full sm:w-auto">
                      <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-green-600"></span>
                          <span className="text-sm text-slate-600">Compliant</span>
                        </div>
                        <span className="font-bold text-slate-900">86</span>
                      </div>

                      <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                          <span className="text-sm text-slate-600">Under Review</span>
                        </div>
                        <span className="font-bold text-slate-900">24</span>
                      </div>

                      <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500"></span>
                          <span className="text-sm text-slate-600">Action Required</span>
                        </div>
                        <span className="font-bold text-slate-900">18</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Progress Chart */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">
                    Compliance Performance
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Progress across key compliance indicators
                  </p>

                  <div className="space-y-7 mt-8">

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          Compliant Products
                        </span>
                        <span className="text-sm font-bold text-green-600">67%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          Pending Reviews
                        </span>
                        <span className="text-sm font-bold text-amber-600">19%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '19%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          Action Required
                        </span>
                        <span className="text-sm font-bold text-red-600">14%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: '14%' }}></div>
                      </div>
                    </div>

                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                      Based on illustrative dashboard data.
                    </p>
                  </div>
                </div>

              </div>

              {/* AI Banner */}
              <div className="bg-gradient-to-r from-[#172d55] to-[#2563eb] rounded-2xl p-6 md:p-8 text-white mb-8 relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold mb-3">
                    <Sparkles size={16} />
                    INTRODUCING AI STANDARDS ASSISTANT
                  </div>

                  <h2 className="text-2xl font-bold mb-2">
                    Navigate certification with confidence.
                  </h2>

                  <p className="text-blue-100 text-sm leading-6 mb-5">
                    Analyse your products, discover applicable BIS standards
                    and get a guided compliance roadmap.
                  </p>

                  <button
                    onClick={() => setActive('Product Analysis')}
                    className="bg-white text-blue-700 px-5 py-3 rounded-lg text-sm font-bold hover:bg-blue-50"
                  >
                    Start AI Analysis
                    <ArrowUpRight size={16} className="inline ml-1" />
                  </button>
                </div>

                <div className="absolute right-8 top-8 opacity-10 hidden md:block">
                  <ShieldCheck size={190} />
                </div>
              </div>

              {/* Recent products */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 md:p-6 flex justify-between items-center gap-3">
                  <div>
                    <h3 className="font-bold text-lg">
                      Recent Product Analyses
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Overview of your latest product checks
                    </p>
                  </div>

                  <button
                    onClick={() => setActive('Product Analysis')}
                    className="text-blue-600 text-sm font-semibold"
                  >
                    View all <ArrowUpRight size={15} className="inline" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-500 text-xs">
                      <tr>
                        <th className="px-6 py-4 font-semibold">PRODUCT NAME</th>
                        <th className="px-6 py-4 font-semibold">PRODUCT ID</th>
                        <th className="px-6 py-4 font-semibold">STATUS</th>
                        <th className="px-6 py-4 font-semibold">LAST UPDATED</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map(product => (
                        <tr
                          key={product.id}
                          className="border-t border-slate-100 hover:bg-slate-50"
                        >
                          <td className="px-6 py-4 text-sm font-semibold">
                            {product.name}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-500">
                            {product.id}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                product.color === 'green'
                                  ? 'bg-green-50 text-green-700'
                                  : product.color === 'amber'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-red-50 text-red-700'
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-500">
                            {product.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filtered.length === 0 && (
                    <p className="p-6 text-center text-sm text-slate-400">
                      No matching products found.
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : active === 'Product Analysis' ? (
            <ProductAnalysis />
          ) : active === 'AI Agent Workflow' ? (
            <AgentWorkflow />
          ) : active === 'Document Verification' ? (
  <DocumentVerification />
) : active === 'BIS Standards' ? (
  <BISStandards />
) : active === 'Compliance Gap Detector' ? (
  <ComplianceGapDetector />
) : active === 'Laboratory Finder' ? (
  <LaboratoryFinder />
) : active === 'Action Tracker' ? (
  <ActionTracker />
) : active === 'AI Compliance Gap Detector' ? (
  <ComplianceGapDetector />
) : active === 'Traceability Matrix' ? (
  <TraceabilityMatrix />
) : active === 'Regulatory Change Radar' ? (
  <RegulatoryChangeRadar />
) : active === 'Reports' ? (
  <Reports />
) : active === 'Settings' ? (
  <Settings />
) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Sparkles size={30} />
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {active}
              </h2>

              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                This module is part of the StandardsPilot workspace.
                We'll build its functionality in the next development steps.
              </p>

              <button
                onClick={() => setActive('Overview')}
                className="bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-semibold"
              >
                Back to Overview
              </button>
            </div>
          )}

          <footer className="text-center text-xs text-slate-400 mt-8 pb-4">
            StandardsPilot AI · Product Standards & Certification Intelligence
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App