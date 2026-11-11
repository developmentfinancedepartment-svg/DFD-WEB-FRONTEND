import axios from 'axios';
import BaseUrl from './baseURL';
import { servicesData } from '../data/servicesData';

/**
 * Global Search Categories
 */
export const SEARCH_CATEGORIES = {
  ALL: { key: 'all', label: 'All Results', icon: 'fas fa-th-large' },
  STAFF: { key: 'staff', label: 'Team Members', icon: 'fas fa-user-tie' },
  SCHEMES: { key: 'schemes', label: 'Loan Schemes', icon: 'fas fa-hand-holding-usd' },
  PUBLICATIONS: { key: 'publications', label: 'Publications', icon: 'fas fa-file-alt' },
  GALLERY: { key: 'gallery', label: 'Media Gallery', icon: 'fas fa-images' },
  PAGES: { key: 'pages', label: 'Pages & Notices', icon: 'fas fa-compass' }
};

/**
 * Default Seed Index for Staff / Team Members
 */
const staffIndex = [
  {
    id: 'staff-1',
    category: 'staff',
    title: 'Mr. P.M.K. Hettiarachchi',
    subtitle: 'Director General',
    tag: 'Director General',
    meta: 'Room 140 • Ext 1400 • Office: +94 11 248 4511',
    description: 'Leading the Department of Development Finance in coordinating national concessionary credit schemes, interest subsidy mechanisms, and financial inclusion frameworks across Sri Lanka. Executive Directorate.',
    path: '/team',
    keywords: ['hettiarachchi', 'director general', 'head', 'executive', '140', '1400', 'dgdf@dfd.treasury.gov.lk', 'leadership']
  },
  {
    id: 'staff-2',
    category: 'staff',
    title: 'Mr. H.M.A.S. Herath',
    subtitle: 'Additional Director General (Financial Solutions)',
    tag: 'Additional Director General',
    meta: 'Room 145 • Ext 1410 • Office: +94 11 248 4520',
    description: 'Overseeing the strategic direction of credit solutions, SME concessionary loan facilities, and sovereign guarantee funds. Financial Solution Division.',
    path: '/team',
    keywords: ['herath', 'adg', 'additional director general', 'financial solutions', 'credit solutions', 'sme loans', '145', '1410']
  },
  {
    id: 'staff-3',
    category: 'staff',
    title: 'Mr. K.A.D.S. Nanayakkara',
    subtitle: 'Director - Financial Solutions Division',
    tag: 'Director',
    meta: 'Room 150 • Ext 1420 • Office: +94 11 248 4530',
    description: 'Heading program formulation, monitoring credit allocations to participatory financial institutions. Financial Solution Division.',
    path: '/team',
    keywords: ['nanayakkara', 'director', 'financial solutions', 'credit allocations', '150', '1420']
  },
  {
    id: 'staff-4',
    category: 'staff',
    title: 'Mrs. K.M.S.D. Jayasekara',
    subtitle: 'Director - Concessionary Credit & Schemes',
    tag: 'Director',
    meta: 'Room 152 • Ext 1425 • Office: +94 11 248 4535',
    description: 'Specializing in green finance mechanisms, revolving credit funds, and MSME refinance frameworks. Financial Solution Division.',
    path: '/team',
    keywords: ['jayasekara', 'director', 'concessionary credit', 'green finance', 'msme', '152', '1425']
  },
  {
    id: 'staff-5',
    category: 'staff',
    title: 'Mr. R.M.A.P. Rathnayake',
    subtitle: 'Deputy Director - Financial Solutions',
    tag: 'Deputy Director',
    meta: 'Room 154 • Ext 1428 • Office: +94 11 248 4540',
    description: 'Managing commercial bank interest subsidy reconciliations and claim verifications. Financial Solution Division.',
    path: '/team',
    keywords: ['rathnayake', 'deputy director', 'subsidy', 'reconciliations', '154', '1428']
  },
  {
    id: 'staff-6',
    category: 'staff',
    title: 'Ms. W.A.S.M. Wickramasinghe',
    subtitle: 'Deputy Director - Interest Subsidy & Monitoring',
    tag: 'Deputy Director',
    meta: 'Room 155 • Ext 1429 • Office: +94 11 248 4542',
    description: 'Conducting financial feasibility audits on regional partner banking branches. Financial Solution Division.',
    path: '/team',
    keywords: ['wickramasinghe', 'deputy director', 'interest subsidy', 'monitoring', '155', '1429']
  },
  {
    id: 'staff-7',
    category: 'staff',
    title: 'Mr. T.M.N.B. Thennakoon',
    subtitle: 'Assistant Director',
    tag: 'Assistant Director',
    meta: 'Room 157 • Ext 1432 • Office: +94 11 248 4544',
    description: 'Field level coordination with district secretariats on enterprise loan uptake. Financial Solution Division.',
    path: '/team',
    keywords: ['thennakoon', 'assistant director', 'enterprise loan', '157', '1432']
  },
  {
    id: 'staff-8',
    category: 'staff',
    title: 'Ms. K.G.C.L. Gamage',
    subtitle: 'Assistant Director',
    tag: 'Assistant Director',
    meta: 'Room 158 • Ext 1434 • Office: +94 11 248 4546',
    description: 'Analysis of quarterly disbursement reports and beneficiary database management. Financial Solution Division.',
    path: '/team',
    keywords: ['gamage', 'assistant director', 'disbursement', 'database', '158', '1434']
  },
  {
    id: 'staff-9',
    category: 'staff',
    title: 'Mr. W.M.K.R. Weerakoon',
    subtitle: 'Development Officer - Schemes Execution',
    tag: 'Development Officer',
    meta: 'Room 159 • Ext 1436 • Office: +94 11 248 4548',
    description: 'Verification of borrower documentation and regional cooperative compliance. Financial Solution Division.',
    path: '/team',
    keywords: ['weerakoon', 'development officer', 'schemes execution', 'borrower', '159', '1436']
  },
  {
    id: 'staff-10',
    category: 'staff',
    title: 'Ms. P.H.N. De Silva',
    subtitle: 'Development Officer - Credit Appraisal',
    tag: 'Development Officer',
    meta: 'Room 159 • Ext 1437 • Office: +94 11 248 4549',
    description: 'Appraisal of loan claims submitted by private commercial banks. Financial Solution Division.',
    path: '/team',
    keywords: ['de silva', 'development officer', 'credit appraisal', 'commercial banks', '159', '1437']
  },
  {
    id: 'staff-11',
    category: 'staff',
    title: 'Mr. M.D.K. Perera',
    subtitle: 'Development Officer - Data & Verification',
    tag: 'Development Officer',
    meta: 'Room 159 • Ext 1438 • Office: +94 11 248 4552',
    description: 'National database entry and interest subsidy calculation validation. Financial Solution Division.',
    path: '/team',
    keywords: ['perera', 'development officer', 'data verification', 'subsidy calculation', '159', '1438']
  },
  {
    id: 'staff-12',
    category: 'staff',
    title: 'Mrs. C.K. Wickramatunga',
    subtitle: 'Additional Director General (Market Access & Development)',
    tag: 'Additional Director General',
    meta: 'Room 148 • Ext 1430 • Office: +94 11 248 4545',
    description: 'Guiding value-chain linkages, export credit promotion, and agricultural market development. Market Access & Development Division.',
    path: '/team',
    keywords: ['wickramatunga', 'adg', 'market access', 'value chain', 'export credit', '148', '1430']
  },
  {
    id: 'staff-13',
    category: 'staff',
    title: 'Mr. D.L.P. Bandara',
    subtitle: 'Director - Market Access & Value Chain Development',
    tag: 'Director',
    meta: 'Room 160 • Ext 1440 • Office: +94 11 248 4550',
    description: 'Formulating forward linkage partnerships with export chambers and agri-commodity boards. Market Access & Development Division.',
    path: '/team',
    keywords: ['bandara', 'director', 'market access', 'value chain', 'export chambers', '160', '1440']
  },
  {
    id: 'staff-14',
    category: 'staff',
    title: 'Mrs. T.K. Wickramasinghe',
    subtitle: 'Deputy Director - Commercial Agriculture Promotion & Markets',
    tag: 'Deputy Director',
    meta: 'Room 162 • Ext 1442 • Office: +94 11 248 4554',
    description: 'Facilitating commercial farming modernization and cold-chain facility loans. Market Access & Development Division.',
    path: '/team',
    keywords: ['wickramasinghe', 'deputy director', 'commercial agriculture', 'farming', 'cold chain', '162', '1442']
  },
  {
    id: 'staff-15',
    category: 'staff',
    title: 'Mr. H.M.S.B. Herath',
    subtitle: 'Deputy Director - Entrepreneurship Outreach & MSME Clusters',
    tag: 'Deputy Director',
    meta: 'Room 163 • Ext 1445 • Office: +94 11 248 4558',
    description: 'Conducting capacity building workshops and MSME market-entry mentoring. Market Access & Development Division.',
    path: '/team',
    keywords: ['herath', 'deputy director', 'entrepreneurship', 'msme clusters', 'outreach', '163', '1445']
  },
  {
    id: 'staff-16',
    category: 'staff',
    title: 'Ms. K.G.N. Fernando',
    subtitle: 'Deputy Director - Progress Monitoring & Field Verification',
    tag: 'Deputy Director',
    meta: 'Room 164 • Ext 1448 • Office: +94 11 248 4562',
    description: 'Leading on-site inspection missions to evaluate beneficiary enterprise performance. Market Access & Development Division.',
    path: '/team',
    keywords: ['fernando', 'deputy director', 'monitoring', 'field verification', 'inspection', '164', '1448']
  },
  {
    id: 'staff-17',
    category: 'staff',
    title: 'Mr. M.S.I. Peiris',
    subtitle: 'Additional Director General (Admin & Accounts)',
    tag: 'Additional Director General',
    meta: 'Room 149 • Ext 1450 • Office: +94 11 248 4565',
    description: 'Strategic stewardship over institutional budget, establishment matters, and parliamentary reporting. Admin and Accounts Division.',
    path: '/team',
    keywords: ['peiris', 'adg', 'admin', 'accounts', 'budget', 'parliamentary', '149', '1450']
  },
  {
    id: 'staff-18',
    category: 'staff',
    title: 'Mrs. A.H.M. Nizam',
    subtitle: 'Director (Admin & Finance)',
    tag: 'Director',
    meta: 'Room 172 • Ext 1462 • Office: +94 11 248 4574',
    description: 'Directing general administration, public finance circular compliance, and internal audit oversight. Admin and Accounts Division.',
    path: '/team',
    keywords: ['nizam', 'director', 'admin', 'finance', 'audit', '172', '1462']
  },
  {
    id: 'staff-19',
    category: 'staff',
    title: 'Mr. P.G.D. Karunaratne',
    subtitle: 'Deputy Director - Logistics, Fleet & Procurement',
    tag: 'Deputy Director',
    meta: 'Room 173 • Ext 1465 • Office: +94 11 248 4578',
    description: 'Managing department facilities, asset registry, and government procurement processes. Admin and Accounts Division.',
    path: '/team',
    keywords: ['karunaratne', 'deputy director', 'logistics', 'procurement', 'fleet', '173', '1465']
  },
  {
    id: 'staff-20',
    category: 'staff',
    title: 'Mr. E.A.N. Senarath',
    subtitle: 'Deputy Director - Scheme Disbursements & Financial Audits',
    tag: 'Deputy Director',
    meta: 'Room 175 • Ext 1469 • Office: +94 11 248 4584',
    description: 'Supervising treasury payment vouchers and annual parliamentary performance audit preparations. Admin and Accounts Division.',
    path: '/team',
    keywords: ['senarath', 'deputy director', 'disbursements', 'financial audits', 'vouchers', '175', '1469']
  },
  {
    id: 'staff-21',
    category: 'staff',
    title: 'Ms. I.U. Dissanayake',
    subtitle: 'Chief Management Service Officer (CMSO) - Operations',
    tag: 'CMSO',
    meta: 'Room 174 • Ext 1468 • Office: +94 11 248 4582',
    description: 'Supervising establishment affairs, official correspondence dispatch, and HR records. Admin and Accounts Division.',
    path: '/team',
    keywords: ['dissanayake', 'cmso', 'management service', 'operations', 'hr records', '174', '1468']
  },
  {
    id: 'staff-22',
    category: 'staff',
    title: 'Mr. B.M.C. Weerasinghe',
    subtitle: 'Development Officer - General Administration & Records',
    tag: 'Development Officer',
    meta: 'Room 176 • Ext 1470 • Office: +94 11 248 4586',
    description: 'Managing institutional archiving, RTI request handling, and vehicle log maintenance. Admin and Accounts Division.',
    path: '/team',
    keywords: ['weerasinghe', 'development officer', 'general administration', 'records', 'rti', '176', '1470']
  }
];

/**
 * Seed Index for Loan Schemes & Services
 */
const schemesIndex = servicesData.map(scheme => ({
  id: `scheme-${scheme.id}`,
  category: 'schemes',
  title: scheme.title,
  subtitle: `Max Loan: ${scheme.maxLoan} • Interest: ${scheme.interestRate}`,
  tag: scheme.maxLoan,
  meta: `Tenure: ${scheme.repaymentPeriod} • Grace: ${scheme.gracePeriod}`,
  description: `${scheme.description} ${scheme.objective} Participating Banks: ${scheme.participatingBanks?.join(', ')}.`,
  path: `/services/${scheme.id}`,
  keywords: [
    scheme.id,
    scheme.title,
    scheme.maxLoan,
    scheme.interestRate,
    ...(scheme.participatingBanks || []),
    'loan', 'credit', 'interest subsidy', 'refinance', 'bank', 'sme', 'msme', 'agriculture', 'concessionary'
  ]
}));

/**
 * Seed Index for Publications & Documents
 */
const publicationsIndex = [
  {
    id: 'pub-actionplan-2024',
    category: 'publications',
    title: 'Annual Action Plan 2024',
    subtitle: 'Department Strategic Roadmap • Year 2024',
    tag: 'Action Plan • 2024',
    meta: 'PDF Document • Ministry of Finance',
    description: 'Official Annual Action Plan 2024 of the Department of Development Finance: Strategic objectives, concessionary credit deployment, and institutional performance monitoring.',
    path: '/publications',
    fileUrl: '/AP2024.pdf',
    keywords: ['action plan', '2024', 'strategic roadmap', 'annual action plan', 'budget', 'treasury', 'pdf']
  },
  {
    id: 'pub-actionplan-2023',
    category: 'publications',
    title: 'Annual Action Plan 2023',
    subtitle: 'Department Strategic Roadmap • Year 2023',
    tag: 'Action Plan • 2023',
    meta: 'PDF Document • Ministry of Finance',
    description: 'Annual Action Plan 2023: Concessionary credit program execution, interest subsidy frameworks, and post-crisis enterprise revival policies.',
    path: '/publications',
    fileUrl: '/AP2023.pdf',
    keywords: ['action plan', '2023', 'revival', 'credit program', 'treasury', 'pdf']
  },
  {
    id: 'pub-actionplan-2022',
    category: 'publications',
    title: 'Annual Action Plan 2022',
    subtitle: 'Department Strategic Roadmap • Year 2022',
    tag: 'Action Plan • 2022',
    meta: 'PDF Document • Ministry of Finance',
    description: 'Annual Action Plan 2022: Concessionary finance operations and participatory financial institution credit coordination.',
    path: '/publications',
    fileUrl: '/AP2022.pdf',
    keywords: ['action plan', '2022', 'concessionary finance', 'pdf']
  },
  {
    id: 'pub-actionplan-2021',
    category: 'publications',
    title: 'Annual Action Plan 2021',
    subtitle: 'Department Strategic Roadmap • Year 2021',
    tag: 'Action Plan • 2021',
    meta: 'PDF Document • Ministry of Finance',
    description: 'Annual Action Plan 2021: Vision, mission, core responsibilities, and credit line allocation frameworks.',
    path: '/publications',
    fileUrl: '/AP2021.pdf',
    keywords: ['action plan', '2021', 'strategic goals', 'pdf']
  },
  {
    id: 'pub-citizens-charter',
    category: 'publications',
    title: 'Citizens Charter (Service Commitments)',
    subtitle: 'Public Service Standards & Commitments',
    tag: 'Citizens Charter',
    meta: 'Official Policy Document',
    description: 'Citizens Charter of the Department of Development Finance: Public service delivery commitments, application processing turnaround standards, and client rights.',
    path: '/publications',
    fileUrl: '/citizenc.pdf',
    keywords: ['citizens charter', 'citizen charter', 'service delivery', 'commitments', 'standards', 'rights', 'charter', 'pdf']
  },
  {
    id: 'pub-annual-report',
    category: 'publications',
    title: 'Annual Performance Reports',
    subtitle: 'Ministry of Finance & DFD Performance',
    tag: 'Annual Report',
    meta: 'Institutional Review',
    description: 'Comprehensive performance reports detailing national concessionary loan disbursements, repayment tracking, and economic impacts.',
    path: '/publications',
    keywords: ['performance report', 'annual report', 'progress', 'audit', 'disbursements', 'treasury review']
  },
  {
    id: 'pub-circulars',
    category: 'publications',
    title: 'Credit Guidelines & Treasury Circulars',
    subtitle: 'Operational instructions for Partner Banks',
    tag: 'Circulars & Guidelines',
    meta: 'Regulatory Directives',
    description: 'Operational circulars, credit guarantee parameters, and interest subsidy claim guidelines for commercial and development banks.',
    path: '/publications',
    keywords: ['circulars', 'guidelines', 'regulations', 'interest subsidy claims', 'instructions', 'banks']
  }
];

/**
 * Seed Index for Media Gallery & Events
 */
const galleryIndex = [
  {
    id: 'gal-msme-workshop',
    category: 'gallery',
    title: 'MSME Policy Workshop 2025/2026',
    subtitle: 'Workshops & Stakeholder Forums',
    tag: 'Workshop',
    meta: 'Colombo • Capacity Building',
    description: 'High-level policy dialogue and training on MSME concessionary loan disbursement mechanisms with commercial bank representatives.',
    path: '/gallery',
    keywords: ['msme workshop', 'workshop', 'training', 'policy', 'colombo', 'capacity building']
  },
  {
    id: 'gal-dairy-central',
    category: 'gallery',
    title: 'Dairy Farm Inspection - Central Province',
    subtitle: 'Smallholder Dairy Development (SDP) Mission',
    tag: 'Field Visit',
    meta: 'Nuwara Eliya & Kandy • Inspection',
    description: 'On-site progress evaluation of beneficiaries under the Smallholder Dairy Development loan scheme in Central Province.',
    path: '/gallery',
    keywords: ['dairy farm', 'central province', 'nuwara eliya', 'kandy', 'sdp', 'inspection', 'field visit', 'cattle']
  },
  {
    id: 'gal-agm-briefing',
    category: 'gallery',
    title: 'Annual Institutional Review & Leadership Meeting',
    subtitle: 'Treasury Secretariat Briefings',
    tag: 'Institutional',
    meta: 'The Secretariat, Colombo',
    description: 'Annual institutional conference reviewing nationwide concessionary credit deployment, subsidy disbursement, and 2026 goals.',
    path: '/gallery',
    keywords: ['annual general meeting', 'leadership meeting', 'secretariat', 'review', 'briefing', 'colombo 01']
  },
  {
    id: 'gal-avc-kurunegala',
    category: 'gallery',
    title: 'Agribusiness Value Chain Assessment',
    subtitle: 'North Western Province Inspection',
    tag: 'Field Visit',
    meta: 'Kurunegala • Cold Storage & Processing',
    description: 'Field inspection of export-oriented agri-processing factories and temperature-controlled storage supported by AVC loan facilities.',
    path: '/gallery',
    keywords: ['agribusiness', 'avc', 'value chain', 'kurunegala', 'cold storage', 'processing', 'field visit']
  },
  {
    id: 'gal-fin-literacy',
    category: 'gallery',
    title: 'Financial Literacy Training for Youth & Women',
    subtitle: 'Regional Outreach Seminars',
    tag: 'Workshop',
    meta: 'Regional Centers • Enterprise Development',
    description: 'Capacity-building workshops designed to empower youth and women entrepreneurs with basic accounting and loan application skills.',
    path: '/gallery',
    keywords: ['financial literacy', 'women entrepreneurs', 'youth', 'training', 'outreach', 'seminars']
  },
  {
    id: 'gal-scheme-launch',
    category: 'gallery',
    title: 'Commercial Bank Partnership Signing Ceremony',
    subtitle: 'Concessionary Credit Agreements',
    tag: 'Institutional',
    meta: 'Ministry of Finance Auditorium',
    description: 'Official signing ceremony of tripartite agreements between the Ministry of Finance and participatory commercial banks.',
    path: '/gallery',
    keywords: ['scheme launch', 'bank partnership', 'signing ceremony', 'agreements', 'commercial banks']
  },
  {
    id: 'gal-field-visits-hub',
    category: 'gallery',
    title: 'Field Visits & Progress Monitoring Portal',
    subtitle: 'Nationwide Tracking Across 25 Districts',
    tag: 'Field Visits Hub',
    meta: 'On-Ground Enterprise Verification',
    description: 'Comprehensive photo gallery and monitoring reports from agricultural and industrial enterprise visits across all Sri Lankan districts.',
    path: '/events/field-visits',
    keywords: ['field visits', 'progress monitoring', 'districts', 'kurunegala', 'galle', 'kandy', 'batticaloa', 'anuradhapura', 'tracking']
  }
];

/**
 * Seed Index for General Pages & Notices
 */
const pagesIndex = [
  {
    id: 'page-home',
    category: 'pages',
    title: 'Home — Department of Development Finance',
    subtitle: 'Ministry of Finance Official Portal',
    tag: 'Main Portal',
    meta: 'Secretariat, Colombo 01',
    description: 'Department of Development Finance: Coordinating national concessionary credit schemes, enterprise subsidies, participatory banks, and hotline 1819.',
    path: '/',
    keywords: ['home', 'main page', 'dfd', 'ministry of finance', 'treasury', 'development finance', 'welcome']
  },
  {
    id: 'page-about',
    category: 'pages',
    title: 'About Us — Vision, Mission & Responsibilities',
    subtitle: 'Institutional Profile & Objectives',
    tag: 'About DFD',
    meta: 'Department Overview',
    description: 'Digitalized treasury development finance management, policy implementation, stakeholder coordination, and economic stabilization support.',
    path: '/About',
    keywords: ['about us', 'vision', 'mission', 'responsibilities', 'mandate', 'structure', 'about']
  },
  {
    id: 'page-services',
    category: 'pages',
    title: 'All Loan Schemes & Concessionary Services',
    subtitle: 'Browse All 8 Concessionary Credit Lines',
    tag: 'Loan Schemes',
    meta: 'Credit Facilities Catalog',
    description: 'Explore Re-MSME Plus, NPA Relief, Food Security FSLRP, Working Capital, SMELoC ADB, Agribusiness AVC, Dairy SDP, and NCRCS schemes.',
    path: '/Services',
    keywords: ['services', 'loan schemes', 'credit lines', 'concessionary loans', 'subsidies', 'schemes']
  },
  {
    id: 'page-team',
    category: 'pages',
    title: 'Our Leadership & Key Officials (Staff Directory)',
    subtitle: 'Executive Directorate & Divisional Officers',
    tag: 'Staff Directory',
    meta: 'Rooms, Extensions & Contact Details',
    description: 'Contact details of the Director General Mr. P.M.K. Hettiarachchi, Additional Director Generals, Directors, Deputy Directors, and Officers.',
    path: '/team',
    keywords: ['team', 'our team', 'staff directory', 'officials', 'contacts', 'leadership', 'phone directory']
  },
  {
    id: 'page-publications',
    category: 'pages',
    title: 'Action Plans & Publications',
    subtitle: 'Annual Reports, Strategic Documents & Downloads',
    tag: 'Publications Hub',
    meta: 'PDF Downloads & Reports',
    description: 'Download official action plans (2024, 2023, 2022, 2021), citizens charter, circulars, and annual progress performance reports.',
    path: '/publications',
    keywords: ['publications', 'action plans', 'reports', 'citizens charter', 'downloads', 'documents']
  },
  {
    id: 'page-gallery',
    category: 'pages',
    title: 'Photo Gallery & Events',
    subtitle: 'Workshops, Field Inspections & Institutional Photos',
    tag: 'Photo Gallery',
    meta: 'Media Archive',
    description: 'Explore visual photographic highlights from enterprise field inspections, regional seminars, and official Ministry briefings.',
    path: '/gallery',
    keywords: ['gallery', 'photos', 'albums', 'media', 'pictures', 'events']
  },
  {
    id: 'page-field-visits',
    category: 'pages',
    title: 'Field Visits & Progress Monitoring',
    subtitle: 'District-wise enterprise inspections',
    tag: 'Field Monitoring',
    meta: '25 Administrative Districts',
    description: 'Explore beneficiary loan utilization, field inspections, and enterprise growth verified on-ground by DFD project monitoring teams.',
    path: '/events/field-visits',
    keywords: ['field visits', 'district inspection', 'monitoring', 'on-ground']
  },
  {
    id: 'page-contact',
    category: 'pages',
    title: 'Contact Us & Send Inquiry',
    subtitle: 'Room 140, The Secretariat, Colombo 01',
    tag: 'Contact & Help',
    meta: 'Hotline 1819 • Phone: +94 112 484 862',
    description: 'Official postal address, email dgdf@dfd.treasury.gov.lk, government hotline 1819, Google Map directions, and online public inquiry submission form.',
    path: '/contact',
    keywords: ['contact', 'contact us', 'inquiries', 'help', 'hotline', '1819', 'secretariat', 'address', 'phone', 'email']
  },
  {
    id: 'page-rti',
    category: 'pages',
    title: 'Right to Information (RTI)',
    subtitle: 'Designated & Information Officers',
    tag: 'RTI Division',
    meta: 'RTI Act No. 12 of 2016',
    description: 'Information Officer contact details, designated appellate authority, RTI application process, and official document downloads.',
    path: '/rti',
    keywords: ['rti', 'right to information', 'information officer', 'designated officer', 'rti application']
  },
  {
    id: 'page-systems',
    category: 'pages',
    title: 'Government IT Systems & Digital Tools',
    subtitle: 'Government Salary Calculator & Letter Management',
    tag: 'Digital Systems',
    meta: 'Public Administration Tools',
    description: 'Government Salary Calculator App 2025 (Management Service Circular 01/2025) and Letter Management System for Treasury departments.',
    path: '/Systems',
    keywords: ['systems', 'salary calculator', 'letter management', 'calculator', 'tools']
  },
  {
    id: 'page-disclaimer',
    category: 'pages',
    title: 'Website Disclaimer & Translation Policy',
    subtitle: 'Official Terms & Information Policy',
    tag: 'Legal Notice',
    meta: 'Terms of Use',
    description: 'Information regarding website content accuracy, automated trilingual Google translation notice, and Ministry liability terms.',
    path: '/Disclaimer',
    keywords: ['disclaimer', 'translation', 'privacy', 'terms', 'policy']
  }
];

// Unified Master Index
let masterSearchIndex = [
  ...staffIndex,
  ...schemesIndex,
  ...publicationsIndex,
  ...galleryIndex,
  ...pagesIndex
];

/**
 * Searches the master index with advanced multi-token query matching, scoring, and categorization
 * 
 * @param {string} rawQuery - Search term entered by user
 * @param {string} categoryFilter - 'all' or specific category key
 * @returns {Array} List of matched, scored, and categorized results
 */
export function performGlobalSearch(rawQuery, categoryFilter = 'all') {
  if (!rawQuery || typeof rawQuery !== 'string') {
    return [];
  }

  const query = rawQuery.trim().toLowerCase();
  if (query.length === 0) {
    return [];
  }

  const tokens = query.split(/\s+/).filter(t => t.length > 0);

  const matched = [];

  for (const item of masterSearchIndex) {
    // If filtered by category, skip items from other categories
    if (categoryFilter && categoryFilter !== 'all' && item.category !== categoryFilter) {
      continue;
    }

    const titleLower = (item.title || '').toLowerCase();
    const subtitleLower = (item.subtitle || '').toLowerCase();
    const tagLower = (item.tag || '').toLowerCase();
    const descLower = (item.description || '').toLowerCase();
    const metaLower = (item.meta || '').toLowerCase();
    const keywordsLower = (item.keywords || []).map(k => String(k).toLowerCase());

    let score = 0;
    let allTokensMatched = true;

    // Check each search token
    for (const token of tokens) {
      let tokenMatched = false;

      // Exact title match gets highest score
      if (titleLower === token) {
        score += 100;
        tokenMatched = true;
      } else if (titleLower.includes(token)) {
        score += 50;
        tokenMatched = true;
      }

      if (tagLower.includes(token)) {
        score += 35;
        tokenMatched = true;
      }

      if (subtitleLower.includes(token)) {
        score += 30;
        tokenMatched = true;
      }

      if (metaLower.includes(token)) {
        score += 25;
        tokenMatched = true;
      }

      if (keywordsLower.some(k => k.includes(token))) {
        score += 20;
        tokenMatched = true;
      }

      if (descLower.includes(token)) {
        score += 15;
        tokenMatched = true;
      }

      if (!tokenMatched) {
        allTokensMatched = false;
        break;
      }
    }

    if (allTokensMatched && score > 0) {
      matched.push({
        ...item,
        score
      });
    }
  }

  // Sort results by relevance score descending
  matched.sort((a, b) => b.score - a.score);

  return matched;
}

/**
 * Groups a flat array of search results by their category
 * 
 * @param {Array} results - Search results
 * @returns {Array} List of grouped categories containing items
 */
export function groupResultsByCategory(results) {
  const groups = {
    staff: { ...SEARCH_CATEGORIES.STAFF, items: [] },
    schemes: { ...SEARCH_CATEGORIES.SCHEMES, items: [] },
    publications: { ...SEARCH_CATEGORIES.PUBLICATIONS, items: [] },
    gallery: { ...SEARCH_CATEGORIES.GALLERY, items: [] },
    pages: { ...SEARCH_CATEGORIES.PAGES, items: [] }
  };

  for (const item of results) {
    if (groups[item.category]) {
      groups[item.category].items.push(item);
    }
  }

  // Return only groups that have matching items
  return Object.values(groups).filter(g => g.items.length > 0);
}

/**
 * Counts results per category
 * 
 * @param {Array} results - Search results
 * @returns {Object} Count per category key
 */
export function getCategoryCounts(results) {
  const counts = {
    all: results.length,
    staff: 0,
    schemes: 0,
    publications: 0,
    gallery: 0,
    pages: 0
  };

  for (const item of results) {
    if (counts[item.category] !== undefined) {
      counts[item.category]++;
    }
  }

  return counts;
}

/**
 * Extracts a contextual snippet highlighting the matching query
 */
export function getSearchSnippet(text, query, maxLength = 130) {
  if (!text) return '';
  if (!query) return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().split(/\s+/)[0];
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '');
  }

  const start = Math.max(0, index - 35);
  const end = Math.min(text.length, index + lowerQuery.length + 75);
  let snippet = text.slice(start, end);

  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}

/**
 * Optional background sync: Merges live API team members if available
 */
export async function syncLiveBackendData() {
  try {
    const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';
    const res = await axios.get(`${apiBase}/api/v1/team-members`);
    const members = Array.isArray(res.data) ? res.data : (res.data?.members || []);
    
    if (members.length > 0) {
      const dynamicStaff = members.map(m => ({
        id: `staff-api-${m.id}`,
        category: 'staff',
        title: m.name,
        subtitle: m.designation === 'Director General of Development Finance' ? 'Director General' : m.designation,
        tag: m.designation === 'Director General of Development Finance' ? 'Director General' : (m.hierarchyLevel || 'Official'),
        meta: `${m.room ? m.room + ' • ' : ''}${m.extension ? 'Ext ' + m.extension + ' • ' : ''}${m.officePhone ? 'Office: ' + m.officePhone : ''}`,
        description: `${m.description || ''} ${m.division || ''}`.trim(),
        path: '/team',
        keywords: [m.name, m.designation, m.division, m.room, m.extension, m.officePhone, m.mobilePhone, m.primaryEmail].filter(Boolean)
      }));

      // Replace static staff entries with fresh backend staff
      masterSearchIndex = [
        ...dynamicStaff,
        ...schemesIndex,
        ...publicationsIndex,
        ...galleryIndex,
        ...pagesIndex
      ];
    }
  } catch (e) {
    // Backend offline; static masterSearchIndex continues seamlessly
  }
}

// Kick off background sync
syncLiveBackendData();

export default {
  performGlobalSearch,
  groupResultsByCategory,
  getCategoryCounts,
  getSearchSnippet,
  SEARCH_CATEGORIES
};
