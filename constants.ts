
import { Section } from './types';

export const APP_TITLE = "طراحی پروتکل شبکه کوانتومی";

// This structure will grow as we add more sections
export const NAVIGATION_TREE: Section[] = [
  {
    id: 'cover',
    title: 'صفحه اصلی (Cover)',
  },
  {
    id: 'abstract',
    title: 'چکیده (Abstract)',
  },
  {
    id: 'introduction',
    title: '۱. مقدمه (Introduction)',
    subsections: [
      { id: 'overview', title: '۱-۱. کلیات و انقلاب دوم' },
      { id: 'current-state', title: '۱-۲. وضعیت فعلی و محدودیت‌ها' },
      { id: 'physical-barriers', title: '۱-۳. موانع بنیادین فیزیکی' },
      { id: 'entanglement-solution', title: '۱-۴. راهکار: توزیع درهم‌تنیدگی' },
    ]
  },
  {
    id: 'background',
    title: '۲. پیش‌زمینه و انگیزه',
    subsections: [
      { id: 'motivation', title: '۲-۱. انگیزه و ضرورت زمانی' },
      { id: 'entanglement-swapping', title: '۲-۲. تعویض درهم‌تنیدگی' },
      { id: 'fidelity-decoherence', title: '۲-۳. فیدلیتی و ناهمدوسی' },
      { id: 'node-architecture', title: '۲-۴. معماری گره کوانتومی' },
    ]
  },
  {
    id: 'protocol',
    title: '۳. لایه شبکه کوانتومی',
    subsections: [
      { id: 'use-cases', title: '۳-۱. موارد استفاده (Use Cases)' },
      { id: 'service-delivered', title: '۳-۲. سرویس تحویلی به لایه بالا' },
      { id: 'network-layer-architecture', title: '۳-۳. معماری لایه شبکه' },
      { id: 'quantum-data-plane', title: '۳-۴. پروتکل صفحه داده کوانتومی' },
      { id: 'link-layer-service', title: '۳-۵. سرویس لایه لینک' },
    ]
  },
  {
    id: 'design',
    title: '۴. پروتکل پیشنهادی (QNP)',
    subsections: [
      { id: 'protocol-design', title: '۴-۱-۱. چرخه عملیاتی (Operation Cycle)' },
      { id: 'swap-tracking', title: '۴-۱-۲. ردیابی و سواب (Swap & Tracking)' },
      { id: 'error-time-management', title: '۴-۱-۳. مدیریت خطا و زمان' },
      { id: 'traffic-optimization', title: '۴-۱-۴. مدیریت ترافیک و بهینه‌سازی' },
      { id: 'protocol-details', title: '۴-۱-۵. جزئیات عملیاتی و محاسباتی' },
      { id: 'example-sequence', title: '۴-۲. نمونه دنباله عملیاتی (Sequence)' },
      { id: 'entanglement-distillation', title: '۴-۳. تقطیر درهم‌تنیدگی (Distillation)' },
    ]
  },
  {
    id: 'evaluation',
    title: '۵. ارزیابی (Evaluation)',
    subsections: [
      { id: 'setup', title: '۵-۱. پیاده‌سازی و پیکربندی (Setup)' },
      { id: 'throughput-latency', title: '۵-۲. پهنای باند و تاخیر' },
      { id: 'decoherence', title: '۵-۳. مقاومت در برابر ناهمدوسی' },
      { id: 'near-future', title: '۵-۴. عملکرد روی سخت‌افزار آینده نزدیک' },
    ]
  },
  {
    id: 'discussion',
    title: '۶. بحث و نتیجه‌گیری (Discussion)',
  },
  {
    id: 'related-work',
    title: '۷. کارهای مرتبط (Related Work)',
  },
  {
    id: 'conclusions',
    title: '۸. نتیجه‌گیری (Conclusions)',
  }
];