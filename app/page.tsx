"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Home,
  FileText,
  Plus,
  User,
  Camera,
  Upload,
  Search,
  Filter,
  ChevronRight,
  Check,
  Clock,
  Sun,
  Moon,
  Heart,
  Stethoscope,
  Users,
  GraduationCap,
  Smartphone,
  PiggyBank,
  Building,
  BadgeCheck,
  Info,
  BarChart3,
  PieChart,
  RefreshCw,
  ZoomIn,
  Settings,
  CloudOff,
  Bell,
  Shield,
  Globe,
  Palette,
  Calendar,
  Download,
  Trash2,
  HardDrive,
  AlertTriangle,
  ExternalLink,
  Fingerprint,
  CalendarClock,
  TrendingDown,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

// Malaysian Flag Icon Component
function MalaysiaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} aria-label="Malaysian Flag">
      <rect width="32" height="20" fill="#CC0001" />
      <rect y="1.43" width="32" height="1.43" fill="#FFF" />
      <rect y="4.29" width="32" height="1.43" fill="#FFF" />
      <rect y="7.14" width="32" height="1.43" fill="#FFF" />
      <rect y="10" width="32" height="1.43" fill="#FFF" />
      <rect y="12.86" width="32" height="1.43" fill="#FFF" />
      <rect y="15.71" width="32" height="1.43" fill="#FFF" />
      <rect y="18.57" width="32" height="1.43" fill="#FFF" />
      <rect width="16" height="11.43" fill="#010066" />
      <circle cx="6.5" cy="5.71" r="3.5" fill="#FFCC00" />
      <circle cx="7.5" cy="5.71" r="2.8" fill="#010066" />
      <polygon
        points="11.5,3.5 12,5 13.5,5 12.3,6 12.7,7.5 11.5,6.5 10.3,7.5 10.7,6 9.5,5 11,5"
        fill="#FFCC00"
      />
    </svg>
  )
}

// LHDN Badge Component
function LHDNBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs text-white/90">
      <MalaysiaFlag className="h-3 w-5" />
      <span>Source: LHDN Official</span>
      <BadgeCheck className="h-3 w-3" />
    </div>
  )
}

// Relief Categories Data
const RELIEF_CATEGORIES = [
  {
    id: "individual",
    name: "Individual & Dependent Relatives",
    maxLimit: 9000,
    icon: User,
    description: "Automatic relief for all taxpayers",
    alwaysShow: true,
  },
  {
    id: "medical_self",
    name: "Medical (Self, Spouse, Children)",
    maxLimit: 10000,
    icon: Stethoscope,
    description: "Serious diseases, fertility treatment, vaccination",
    alwaysShow: true,
  },
  {
    id: "parents_medical",
    name: "Parents Medical & Carer",
    maxLimit: 8000,
    icon: Heart,
    description: "Medical expenses for parents",
    profileKey: "hasParents",
  },
  {
    id: "disabled",
    name: "Disabled Individual",
    maxLimit: 7000,
    icon: Users,
    description: "Additional relief for disabled persons",
    profileKey: "isDisabled",
  },
  {
    id: "disabled_equipment",
    name: "Disabled Equipment",
    maxLimit: 6000,
    icon: Users,
    description: "Supporting equipment for disabled",
    profileKey: "isDisabled",
  },
  {
    id: "spouse",
    name: "Spouse / Alimony",
    maxLimit: 4000,
    icon: Heart,
    description: "For non-working spouse or alimony payments",
    profileKey: "hasSpouseRelief",
  },
  {
    id: "children_under18",
    name: "Children (Under 18)",
    maxLimit: 2000,
    icon: Users,
    description: "Per child relief",
    profileKey: "hasChildrenUnder18",
    perItem: true,
  },
  {
    id: "children_education",
    name: "Children (Higher Education)",
    maxLimit: 8000,
    icon: GraduationCap,
    description: "Children in tertiary education",
    profileKey: "hasChildrenEducation",
    perItem: true,
  },
  {
    id: "education_self",
    name: "Education (Self)",
    maxLimit: 7000,
    icon: GraduationCap,
    description: "Degree, Masters, professional courses",
    alwaysShow: true,
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    maxLimit: 2500,
    icon: Smartphone,
    description: "Books, PC, smartphone, sports equipment, internet",
    alwaysShow: true,
  },
  {
    id: "epf_insurance",
    name: "EPF / Life Insurance / Takaful",
    maxLimit: 7000,
    icon: PiggyBank,
    description: "Retirement and insurance contributions",
    alwaysShow: true,
  },
  {
    id: "housing_loan",
    name: "First Home Housing Loan Interest",
    maxLimit: 7000,
    icon: Building,
    description: "Interest on first home loan",
    profileKey: "isFirstHomeOwner",
  },
]

// Mock Records Data
const INITIAL_RECORDS = [
  {
    id: 1,
    category: "lifestyle",
    date: "2025-03-15",
    amount: 2499,
    merchant: "Harvey Norman",
    description: "MacBook Air M3",
    status: "verified",
    receiptUrl: "/placeholder.svg",
  },
  {
    id: 2,
    category: "medical_self",
    date: "2025-02-28",
    amount: 850,
    merchant: "Pantai Hospital",
    description: "Medical checkup",
    status: "verified",
    receiptUrl: "/placeholder.svg",
  },
  {
    id: 3,
    category: "epf_insurance",
    date: "2025-01-31",
    amount: 4200,
    merchant: "EPF Contribution",
    description: "Annual EPF statement",
    status: "verified",
    receiptUrl: "/placeholder.svg",
  },
  {
    id: 4,
    category: "education_self",
    date: "2025-03-01",
    amount: 3500,
    merchant: "Open University",
    description: "MBA Semester 2",
    status: "pending",
    receiptUrl: "/placeholder.svg",
  },
  {
    id: 5,
    category: "parents_medical",
    date: "2025-02-15",
    amount: 1200,
    merchant: "Gleneagles Hospital",
    description: "Father medical checkup",
    status: "verified",
    receiptUrl: "/placeholder.svg",
  },
  {
    id: 6,
    category: "lifestyle",
    date: "2025-01-20",
    amount: 350,
    merchant: "MPH Bookstore",
    description: "Professional books",
    status: "verified",
    receiptUrl: "/placeholder.svg",
  },
  {
    id: 7,
    category: "children_under18",
    date: "2025-03-10",
    amount: 2000,
    merchant: "Annual Relief",
    description: "Child relief - Adam",
    status: "verified",
    receiptUrl: "/placeholder.svg",
  },
]

// Initial Profile State
const INITIAL_PROFILE = {
  name: "Dandy",
  maritalStatus: "married" as const,
  isSpouseWorking: true,
  childrenUnder18: 2,
  childrenEducation: 1,
  isDisabled: false,
  isSpouseDisabled: false,
  isChildDisabled: false,
  hasParents: true,
  parentsCount: 2,
  isFirstHomeOwner: false,
}

type Profile = typeof INITIAL_PROFILE
type Record = (typeof INITIAL_RECORDS)[0]

export default function ReliefTrackApp() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "records" | "profile" | "settings">("dashboard")
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE)
  const [records, setRecords] = useState<Record[]>(INITIAL_RECORDS)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showOCRForm, setShowOCRForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [recordsView, setRecordsView] = useState<"list" | "chart">("list")
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { theme, setTheme } = useTheme()

  // Settings state
  const [settings, setSettings] = useState({
    // Storage & Backup
    googleDriveConnected: false,
    googleDriveEmail: "",
    lastSyncTime: "",
    autoUploadReceipts: true,
    storageUsed: 45, // MB

    // Notifications
    taxDeadlineReminders: true,
    lowReliefAlerts: true,
    weeklySummary: false,
    lhdnUpdates: true,

    // Security
    biometricLock: false,

    // Preferences
    language: "en" as "en" | "ms",
    themePreference: "system" as "light" | "dark" | "system",
    defaultTaxYear: "2025" as "2025" | "2026",
  })

  // Form state for new record
  const [newRecord, setNewRecord] = useState({
    category: "lifestyle",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    merchant: "",
    description: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate relief totals based on profile and records
  const calculateReliefs = useCallback(() => {
    const reliefTotals: { [key: string]: number } = {}

    // Initialize with 0
    RELIEF_CATEGORIES.forEach((cat) => {
      reliefTotals[cat.id] = 0
    })

    // Add automatic individual relief
    reliefTotals["individual"] = 9000

    // Add children reliefs based on profile
    if (profile.childrenUnder18 > 0) {
      reliefTotals["children_under18"] = Math.min(
        profile.childrenUnder18 * 2000,
        records
          .filter((r) => r.category === "children_under18")
          .reduce((sum, r) => sum + r.amount, 0) || profile.childrenUnder18 * 2000
      )
    }

    if (profile.childrenEducation > 0) {
      reliefTotals["children_education"] = Math.min(
        profile.childrenEducation * 8000,
        records
          .filter((r) => r.category === "children_education")
          .reduce((sum, r) => sum + r.amount, 0) || profile.childrenEducation * 8000
      )
    }

    // Sum up records for each category
    records.forEach((record) => {
      if (record.category !== "children_under18" && record.category !== "children_education") {
        reliefTotals[record.category] = (reliefTotals[record.category] || 0) + record.amount
      }
    })

    // Cap at max limits
    RELIEF_CATEGORIES.forEach((cat) => {
      if (!cat.perItem) {
        reliefTotals[cat.id] = Math.min(reliefTotals[cat.id] || 0, cat.maxLimit)
      }
    })

    return reliefTotals
  }, [profile, records])

  // Get applicable reliefs based on profile
  const getApplicableReliefs = useCallback(() => {
    return RELIEF_CATEGORIES.filter((cat) => {
      if (cat.alwaysShow) return true
      if (cat.profileKey === "hasParents" && profile.hasParents) return true
      if (cat.profileKey === "isDisabled" && (profile.isDisabled || profile.isSpouseDisabled || profile.isChildDisabled)) return true
      if (cat.profileKey === "hasSpouseRelief" && profile.maritalStatus === "married" && !profile.isSpouseWorking) return true
      if (cat.profileKey === "hasChildrenUnder18" && profile.childrenUnder18 > 0) return true
      if (cat.profileKey === "hasChildrenEducation" && profile.childrenEducation > 0) return true
      if (cat.profileKey === "isFirstHomeOwner" && profile.isFirstHomeOwner) return true
      return false
    })
  }, [profile])

  const reliefTotals = calculateReliefs()
  const applicableReliefs = getApplicableReliefs()

  // Calculate total claimed
  const totalClaimed = Object.entries(reliefTotals)
    .filter(([key]) => applicableReliefs.some((r) => r.id === key))
    .reduce((sum, [, value]) => sum + value, 0)

  // Calculate total possible
  const totalPossible = applicableReliefs.reduce((sum, cat) => {
    if (cat.perItem) {
      if (cat.id === "children_under18") return sum + profile.childrenUnder18 * cat.maxLimit
      if (cat.id === "children_education") return sum + profile.childrenEducation * cat.maxLimit
    }
    return sum + cat.maxLimit
  }, 0)

  // Simulate OCR processing
  const handleUpload = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setShowOCRForm(true)
      setNewRecord({
        category: "lifestyle",
        date: new Date().toISOString().split("T")[0],
        amount: "1250",
        merchant: "Machines Sdn Bhd",
        description: "iPad Pro 11-inch",
      })
    }, 2000)
  }

  // Save new record
  const handleSaveRecord = () => {
    const newId = Math.max(...records.map((r) => r.id)) + 1
    setRecords([
      {
        id: newId,
        category: newRecord.category,
        date: newRecord.date,
        amount: parseFloat(newRecord.amount) || 0,
        merchant: newRecord.merchant,
        description: newRecord.description,
        status: "pending",
        receiptUrl: "/placeholder.svg",
      },
      ...records,
    ])
    setIsAddModalOpen(false)
    setShowOCRForm(false)
    setNewRecord({
      category: "lifestyle",
      date: new Date().toISOString().split("T")[0],
      amount: "",
      merchant: "",
      description: "",
    })
  }

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || record.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Pull to refresh simulation
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return RELIEF_CATEGORIES.find((c) => c.id === categoryId)
  }

  // Format currency
  const formatRM = (amount: number) => {
    return `RM ${amount.toLocaleString()}`
  }

  // Circular Progress Component
  const CircularProgress = ({ value, max, size = 120 }: { value: number; max: number; size?: number }) => {
    const percentage = Math.min((value / max) * 100, 100)
    const strokeWidth = 8
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="rotate-[-90deg]" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/20"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-white transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{Math.round(percentage)}%</span>
          <span className="text-xs text-white/80">utilised</span>
        </div>
      </div>
    )
  }

  // Calculate days until tax deadline
  const getTaxDeadlineInfo = () => {
    const deadline = new Date("2026-04-30")
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return { days: diffDays, date: "30 April 2026" }
  }

  // Estimate tax savings (simplified calculation based on claimed reliefs)
  const estimateTaxSavings = () => {
    // Simplified: assume average tax rate of ~20% on relief amounts
    const estimatedSavings = Math.round(totalClaimed * 0.2)
    return estimatedSavings
  }

  // Dashboard Tab
  const DashboardTab = () => {
    const deadlineInfo = getTaxDeadlineInfo()
    const estimatedSavings = estimateTaxSavings()

    return (
    <ScrollArea className="h-[calc(100vh-140px)]">
      <div className="space-y-4 p-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">ReliefTrack MY</h1>
              <MalaysiaFlag className="h-4 w-6" />
            </div>
            <p className="text-sm text-muted-foreground">Year of Assessment {settings.defaultTaxYear}</p>
          </div>
          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Greeting */}
        <p className="text-lg text-foreground">
          Hi, <span className="font-semibold">{profile.name}</span>
        </p>

        {/* Tax Filing Deadline Countdown */}
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                <CalendarClock className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/90">Tax Filing Deadline</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{deadlineInfo.days}</span>
                  <span className="text-sm text-white/80">days left</span>
                </div>
                <p className="text-xs text-white/75">until {deadlineInfo.date}</p>
              </div>
              <div className="text-right">
                <Clock className="ml-auto h-5 w-5 text-white/60" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Relief Card */}
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-white/90">Total Relief Claimed</p>
                <p className="text-3xl font-bold">{formatRM(totalClaimed)}</p>
                <p className="text-sm text-white/75">of {formatRM(totalPossible)} maximum</p>
                <div className="pt-2">
                  <LHDNBadge />
                </div>
              </div>
              <CircularProgress value={totalClaimed} max={totalPossible} />
            </div>
          </CardContent>
        </Card>

        {/* Tax Savings Estimator */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <TrendingDown className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Estimated Tax Savings</p>
                <p className="text-xl font-bold text-primary">~{formatRM(estimatedSavings)}</p>
                <p className="text-xs text-muted-foreground">this assessment year</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3 w-3" />
              <span>Estimate based on average tax bracket. <button className="text-primary underline-offset-2 hover:underline">Learn more</button></span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Summary Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <BarChart3 className="h-4 w-4 text-primary" />
              Relief Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {applicableReliefs.slice(0, 5).map((relief) => {
              const claimed = reliefTotals[relief.id] || 0
              const maxLimit = relief.perItem
                ? relief.id === "children_under18"
                  ? profile.childrenUnder18 * relief.maxLimit
                  : profile.childrenEducation * relief.maxLimit
                : relief.maxLimit
              const percentage = (claimed / maxLimit) * 100

              return (
                <div key={relief.id} className="flex items-center gap-3">
                  <div className="w-24 truncate text-xs text-muted-foreground">
                    {relief.name.split(" ")[0]}
                  </div>
                  <div className="flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-right text-xs font-medium">{formatRM(claimed)}</div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Applicable Reliefs Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Your Applicable Reliefs</h2>
            <Badge variant="secondary" className="text-xs">
              {applicableReliefs.length} categories
            </Badge>
          </div>

          {applicableReliefs.map((relief) => {
            const Icon = relief.icon
            const claimed = reliefTotals[relief.id] || 0
            const maxLimit = relief.perItem
              ? relief.id === "children_under18"
                ? profile.childrenUnder18 * relief.maxLimit
                : profile.childrenEducation * relief.maxLimit
              : relief.maxLimit
            const percentage = Math.round((claimed / maxLimit) * 100)

            return (
              <Card key={relief.id} className="transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-medium text-foreground">{relief.name}</h3>
                          <p className="text-xs text-muted-foreground">{relief.description}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {formatRM(claimed)} claimed
                          </span>
                          <span className="font-medium text-primary">{percentage}% utilised</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Max: {formatRM(maxLimit)}
                          {relief.perItem && " total"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </ScrollArea>
  )}

  // Records Tab
  const RecordsTab = () => (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      {/* Search and Filter */}
      <div className="space-y-3 border-b border-border bg-background p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-9 w-[140px]">
              <Filter className="mr-2 h-3 w-3" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {RELIEF_CATEGORIES.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name.split(" ")[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex rounded-lg border border-input bg-background p-1">
            <Button
              variant={recordsView === "list" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-2"
              onClick={() => setRecordsView("list")}
            >
              <FileText className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={recordsView === "chart" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-2"
              onClick={() => setRecordsView("chart")}
            >
              <PieChart className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-9"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        </div>
      </div>

      {/* Records List or Chart */}
      <ScrollArea className="flex-1">
        {recordsView === "list" ? (
          <div className="divide-y divide-border">
            {filteredRecords.map((record) => {
              const category = getCategoryInfo(record.category)
              const Icon = category?.icon || FileText

              return (
                <button
                  key={record.id}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate text-sm font-medium text-foreground">
                        {record.merchant}
                      </h3>
                      <span className="shrink-0 text-sm font-semibold text-foreground">
                        {formatRM(record.amount)}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{record.description}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{record.date}</span>
                      <Badge
                        variant={record.status === "verified" ? "default" : "secondary"}
                        className={cn(
                          "h-5 text-xs",
                          record.status === "verified"
                            ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
                            : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400"
                        )}
                      >
                        {record.status === "verified" ? (
                          <Check className="mr-1 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {record.status}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {/* Pie Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Relief Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <div className="relative h-40 w-40">
                    <svg viewBox="0 0 100 100" className="h-full w-full rotate-[-90deg]">
                      {applicableReliefs.slice(0, 5).map((relief, index) => {
                        const total = applicableReliefs
                          .slice(0, 5)
                          .reduce((sum, r) => sum + (reliefTotals[r.id] || 0), 0)
                        const value = reliefTotals[relief.id] || 0
                        const percentage = total > 0 ? value / total : 0
                        const offset = applicableReliefs
                          .slice(0, index)
                          .reduce((sum, r) => sum + (reliefTotals[r.id] || 0) / total, 0)
                        const colors = [
                          "text-emerald-500",
                          "text-red-500",
                          "text-blue-500",
                          "text-amber-500",
                          "text-purple-500",
                        ]

                        return (
                          <circle
                            key={relief.id}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="20"
                            strokeDasharray={`${percentage * 251.2} 251.2`}
                            strokeDashoffset={`${-offset * 251.2}`}
                            className={colors[index]}
                          />
                        )
                      })}
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {applicableReliefs.slice(0, 5).map((relief, index) => {
                    const colors = [
                      "bg-emerald-500",
                      "bg-red-500",
                      "bg-blue-500",
                      "bg-amber-500",
                      "bg-purple-500",
                    ]
                    return (
                      <div key={relief.id} className="flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full", colors[index])} />
                        <span className="truncate text-xs text-muted-foreground">
                          {relief.name.split(" ")[0]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Monthly Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-32 items-end gap-2">
                  {["Jan", "Feb", "Mar"].map((month, index) => {
                    const values = [4200, 2050, 6249]
                    const maxValue = Math.max(...values)
                    const height = (values[index] / maxValue) * 100

                    return (
                      <div key={month} className="flex flex-1 flex-col items-center gap-1">
                        <div className="relative w-full">
                          <div
                            className="w-full rounded-t bg-primary transition-all duration-500"
                            style={{ height: `${height}px` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{month}</span>
                        <span className="text-xs font-medium">{formatRM(values[index])}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </ScrollArea>

      {/* Record Detail Modal */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Record Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Receipt Image</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      <ZoomIn className="mr-1 h-3 w-3" />
                      View Full
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="text-sm font-medium">
                    {getCategoryInfo(selectedRecord.category)?.name.split(" ")[0]}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="text-sm font-medium">{selectedRecord.date}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-medium">{formatRM(selectedRecord.amount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Merchant</span>
                  <span className="text-sm font-medium">{selectedRecord.merchant}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge
                    variant={selectedRecord.status === "verified" ? "default" : "secondary"}
                    className={cn(
                      selectedRecord.status === "verified"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    )}
                  >
                    {selectedRecord.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )

  // Profile Tab
  const ProfileTab = () => (
    <ScrollArea className="h-[calc(100vh-140px)]">
      <div className="space-y-6 p-4 pb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-2xl font-bold text-white">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{profile.name}</h2>
            <p className="text-sm text-muted-foreground">Tax Resident - Malaysia</p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Marital Status */}
            <div className="space-y-2">
              <Label className="text-sm">Marital Status</Label>
              <Select
                value={profile.maritalStatus}
                onValueChange={(value) =>
                  setProfile({ ...profile, maritalStatus: value as Profile["maritalStatus"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Spouse Working */}
            {profile.maritalStatus === "married" && (
              <div className="flex items-center justify-between">
                <Label className="text-sm">Spouse Working?</Label>
                <Switch
                  checked={profile.isSpouseWorking}
                  onCheckedChange={(checked) => setProfile({ ...profile, isSpouseWorking: checked })}
                />
              </div>
            )}

            <Separator />

            {/* Children Under 18 */}
            <div className="space-y-2">
              <Label className="text-sm">Children (Under 18)</Label>
              <Select
                value={String(profile.childrenUnder18)}
                onValueChange={(value) => setProfile({ ...profile, childrenUnder18: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Children in Higher Education */}
            <div className="space-y-2">
              <Label className="text-sm">Children in Higher Education</Label>
              <Select
                value={String(profile.childrenEducation)}
                onValueChange={(value) => setProfile({ ...profile, childrenEducation: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Disability Flags */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Disability Status</Label>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal text-muted-foreground">Self</Label>
                <Switch
                  checked={profile.isDisabled}
                  onCheckedChange={(checked) => setProfile({ ...profile, isDisabled: checked })}
                />
              </div>
              {profile.maritalStatus === "married" && (
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-normal text-muted-foreground">Spouse</Label>
                  <Switch
                    checked={profile.isSpouseDisabled}
                    onCheckedChange={(checked) => setProfile({ ...profile, isSpouseDisabled: checked })}
                  />
                </div>
              )}
              <div className="flex items-center justify-between">
                <Label className="text-sm font-normal text-muted-foreground">Child</Label>
                <Switch
                  checked={profile.isChildDisabled}
                  onCheckedChange={(checked) => setProfile({ ...profile, isChildDisabled: checked })}
                />
              </div>
            </div>

            <Separator />

            {/* Dependent Parents */}
            <div className="flex items-center justify-between">
              <Label className="text-sm">Dependent Parents / Grandparents?</Label>
              <Switch
                checked={profile.hasParents}
                onCheckedChange={(checked) => setProfile({ ...profile, hasParents: checked })}
              />
            </div>

            {profile.hasParents && (
              <div className="space-y-2">
                <Label className="text-sm">Number of Dependents</Label>
                <Select
                  value={String(profile.parentsCount)}
                  onValueChange={(value) => setProfile({ ...profile, parentsCount: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Separator />

            {/* First Home Owner */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">First-Time Home Owner?</Label>
                <p className="text-xs text-muted-foreground">For housing loan interest relief</p>
              </div>
              <Switch
                checked={profile.isFirstHomeOwner}
                onCheckedChange={(checked) => setProfile({ ...profile, isFirstHomeOwner: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Profile Button */}
        <Button className="w-full bg-primary hover:bg-primary/90">
          Save Profile
        </Button>
      </div>
    </ScrollArea>
  )

  // Settings Tab
  const SettingsTab = () => {
    const handleConnectGoogleDrive = () => {
      // Simulate Google Drive connection
      setSettings({
        ...settings,
        googleDriveConnected: true,
        googleDriveEmail: "dandylau@gmail.com",
        lastSyncTime: new Date().toLocaleString(),
      })
    }

    const handleDisconnectGoogleDrive = () => {
      setSettings({
        ...settings,
        googleDriveConnected: false,
        googleDriveEmail: "",
        lastSyncTime: "",
      })
    }

    const handleBackupNow = () => {
      setSettings({
        ...settings,
        lastSyncTime: new Date().toLocaleString(),
      })
    }

    const handleExportRecords = () => {
      // Simulate export
      alert("Exporting records as CSV and PDF...")
    }

    const handleClearCache = () => {
      alert("OCR cache cleared!")
    }

    const handleDeleteAllRecords = () => {
      setRecords([])
      setShowDeleteDialog(false)
    }

    return (
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="space-y-6 p-4 pb-8">
          {/* Storage & Backup */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 font-semibold text-foreground">
              <HardDrive className="h-4 w-4 text-primary" />
              Storage & Backup
            </h2>
            <Card>
              <CardContent className="space-y-4 p-4">
                {!settings.googleDriveConnected ? (
                  <Button
                    className="w-full gap-2 bg-white text-foreground border border-input hover:bg-muted"
                    onClick={handleConnectGoogleDrive}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google Drive">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Connect Google Drive
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                          <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Connected</p>
                          <p className="text-xs text-muted-foreground">{settings.googleDriveEmail}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={handleDisconnectGoogleDrive}>
                        <CloudOff className="mr-1 h-4 w-4" />
                        Disconnect
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last synced: {settings.lastSyncTime || "Never"}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-upload receipts</p>
                    <p className="text-xs text-muted-foreground">Sync records to Google Drive</p>
                  </div>
                  <Switch
                    checked={settings.autoUploadReceipts}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoUploadReceipts: checked })}
                    disabled={!settings.googleDriveConnected}
                  />
                </div>

                <Button variant="outline" className="w-full" onClick={handleBackupNow} disabled={!settings.googleDriveConnected}>
                  Backup Now
                </Button>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Storage used</span>
                    <span className="font-medium">{settings.storageUsed} MB / 100 MB</span>
                  </div>
                  <Progress value={settings.storageUsed} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 font-semibold text-foreground">
              <Bell className="h-4 w-4 text-primary" />
              Notifications
            </h2>
            <Card>
              <CardContent className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Tax deadline reminders</p>
                    <p className="text-xs text-muted-foreground">Get notified before filing deadlines</p>
                  </div>
                  <Switch
                    checked={settings.taxDeadlineReminders}
                    onCheckedChange={(checked) => setSettings({ ...settings, taxDeadlineReminders: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Low relief utilization alerts</p>
                    <p className="text-xs text-muted-foreground">Alert when reliefs are underutilized</p>
                  </div>
                  <Switch
                    checked={settings.lowReliefAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, lowReliefAlerts: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Weekly summary</p>
                    <p className="text-xs text-muted-foreground">Receive weekly relief summary</p>
                  </div>
                  <Switch
                    checked={settings.weeklySummary}
                    onCheckedChange={(checked) => setSettings({ ...settings, weeklySummary: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">New LHDN updates</p>
                    <p className="text-xs text-muted-foreground">Get notified about tax law changes</p>
                  </div>
                  <Switch
                    checked={settings.lhdnUpdates}
                    onCheckedChange={(checked) => setSettings({ ...settings, lhdnUpdates: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 font-semibold text-foreground">
              <Shield className="h-4 w-4 text-primary" />
              Security
            </h2>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Fingerprint className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Biometric Lock</p>
                      <p className="text-xs text-muted-foreground">Face ID / Fingerprint</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.biometricLock}
                    onCheckedChange={(checked) => setSettings({ ...settings, biometricLock: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 font-semibold text-foreground">
              <Palette className="h-4 w-4 text-primary" />
              Preferences
            </h2>
            <Card>
              <CardContent className="space-y-4 p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm">Language</Label>
                  </div>
                  <Select
                    value={settings.language}
                    onValueChange={(value: "en" | "ms") => setSettings({ ...settings, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ms">Bahasa Melayu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {mounted && (settings.themePreference === "dark" || (settings.themePreference === "system" && theme === "dark") ? (
                      <Moon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Sun className="h-4 w-4 text-muted-foreground" />
                    ))}
                    <Label className="text-sm">Theme</Label>
                  </div>
                  <Select
                    value={settings.themePreference}
                    onValueChange={(value: "light" | "dark" | "system") => {
                      setSettings({ ...settings, themePreference: value })
                      setTheme(value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm">Default Tax Year</Label>
                  </div>
                  <Select
                    value={settings.defaultTaxYear}
                    onValueChange={(value: "2025" | "2026") => setSettings({ ...settings, defaultTaxYear: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Management */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 font-semibold text-foreground">
              <HardDrive className="h-4 w-4 text-primary" />
              Data Management
            </h2>
            <Card>
              <CardContent className="space-y-3 p-4">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExportRecords}>
                  <Download className="h-4 w-4" />
                  Export All Records (CSV + PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleClearCache}>
                  <Trash2 className="h-4 w-4" />
                  Clear OCR Cache
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Delete All Records
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 font-semibold text-foreground">
              <Info className="h-4 w-4 text-primary" />
              About
            </h2>
            <Card>
              <CardContent className="space-y-4 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                    <MalaysiaFlag className="h-6 w-10" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">ReliefTrack MY</p>
                    <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                  </div>
                </div>

                <Separator />

                <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      This app is for personal tax planning purposes only. Tax relief categories and limits are based on LHDN guidelines. Always verify with LHDN for official eligibility and amounts.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-between rounded-lg p-2 text-sm text-foreground transition-colors hover:bg-muted">
                    Privacy Policy
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="flex items-center justify-between rounded-lg p-2 text-sm text-foreground transition-colors hover:bg-muted">
                    Terms of Service
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="flex items-center justify-between rounded-lg p-2 text-sm text-foreground transition-colors hover:bg-muted">
                    LHDN Official Website
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300">
            Log Out
          </Button>
        </div>
      </ScrollArea>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background">
      {/* Main Content */}
      <main className="flex-1 pt-2">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "records" && <RecordsTab />}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>

      {/* Add Record Modal */}
      <Drawer open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Add New Record</DrawerTitle>
          </DrawerHeader>

          {!isProcessing && !showOCRForm ? (
            <div className="space-y-4 p-4">
              <Button
                variant="outline"
                className="h-24 w-full flex-col gap-2"
                onClick={handleUpload}
              >
                <Camera className="h-8 w-8 text-primary" />
                <span>Take Photo</span>
              </Button>
              <Button
                variant="outline"
                className="h-24 w-full flex-col gap-2"
                onClick={handleUpload}
              >
                <Upload className="h-8 w-8 text-primary" />
                <span>Upload Image or PDF</span>
              </Button>
            </div>
          ) : isProcessing ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="absolute inset-2 animate-pulse rounded-full bg-primary/40" />
                <div className="absolute inset-4 flex items-center justify-center rounded-full bg-primary">
                  <FileText className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">OCR Processing...</p>
                <p className="text-sm text-muted-foreground">Extracting receipt data</p>
              </div>
            </div>
          ) : (
            <ScrollArea className="max-h-[60vh] px-4 pb-4">
              <div className="space-y-4">
                {/* Receipt Preview */}
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Receipt uploaded</p>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newRecord.category}
                    onValueChange={(value) => setNewRecord({ ...newRecord, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RELIEF_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label>Amount (RM)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newRecord.amount}
                    onChange={(e) => setNewRecord({ ...newRecord, amount: e.target.value })}
                  />
                </div>

                {/* Merchant */}
                <div className="space-y-2">
                  <Label>Merchant / Provider</Label>
                  <Input
                    placeholder="Enter merchant name"
                    value={newRecord.merchant}
                    onChange={(e) => setNewRecord({ ...newRecord, merchant: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Brief description"
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowOCRForm(false)
                        setNewRecord({
                          category: "lifestyle",
                          date: new Date().toISOString().split("T")[0],
                          amount: "",
                          merchant: "",
                          description: "",
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                  <Button className="flex-1" onClick={handleSaveRecord}>
                    Save to Records
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DrawerContent>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Delete All Records
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All your tax relief records and receipts will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                setRecords([])
                setShowDeleteDialog(false)
              }}
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="relative flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 transition-colors",
              activeTab === "dashboard" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("records")}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 transition-colors",
              activeTab === "records" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs font-medium">Records</span>
          </button>

          {/* Floating Action Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Add new record"
          >
            <Plus className="h-7 w-7" />
          </button>

          {/* Spacer for FAB */}
          <div className="w-14" />

          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 transition-colors",
              activeTab === "profile" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 transition-colors",
              activeTab === "settings" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
