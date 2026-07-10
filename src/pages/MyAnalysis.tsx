import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Clock3, Download, LogOut, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import {
  downloadPortalReportPdf,
  fetchPortalSession,
  logoutPortalSession,
  redeemPortalAccessLink,
  type PortalClientProfile,
  type PortalReport,
} from '../utils/portal-api';

const PORTAL_SESSION_STORAGE_KEY = 'soul_infinity_portal_session';

function getPortalSessionStore(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.sessionStorage;
}

type PortalState =
  | { status: 'loading'; message: string }
  | { status: 'error'; message: string }
  | {
      status: 'ready';
      client: PortalClientProfile | null;
      reports: PortalReport[];
      activeReportId: string | null;
      deliveryEmail?: string;
    };

function formatPortalDate(value: string): string {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function renderTextWithLinks(value: string) {
  const parts = value.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-sky-700 underline underline-offset-4 hover:text-sky-800"
        >
          {part}
        </a>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'unordered-list'; items: string[] };

function parseContentBlocks(value: string): ContentBlock[] {
  const lines = String(value || '').replaceAll('\r\n', '\n').split('\n');
  const blocks: ContentBlock[] = [];
  let paragraphLines: string[] = [];
  let listKind: 'ordered-list' | 'unordered-list' | null = null;
  let listItems: string[] = [];

  const flushParagraph = () => {
    const text = paragraphLines.join(' ').trim();
    if (text) {
      blocks.push({ type: 'paragraph', text });
    }
    paragraphLines = [];
  };

  const flushList = () => {
    if (listKind && listItems.length > 0) {
      blocks.push({ type: listKind, items: [...listItems] });
    }
    listKind = null;
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const orderedMatch = line.match(/^(\d+)[.)]\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listKind !== 'ordered-list') {
        flushList();
        listKind = 'ordered-list';
      }
      listItems.push(orderedMatch[2].trim());
      continue;
    }

    const unorderedMatch = line.match(/^[-*•]\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listKind !== 'unordered-list') {
        flushList();
        listKind = 'unordered-list';
      }
      listItems.push(unorderedMatch[1].trim());
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function renderFormattedContent(value: string) {
  return parseContentBlocks(value).map((block, index) => {
    if (block.type === 'paragraph') {
      return (
        <p key={`${block.text.slice(0, 24)}-${index}`} className="leading-8 text-slate-700">
          {renderTextWithLinks(block.text)}
        </p>
      );
    }

    const ListTag = block.type === 'ordered-list' ? 'ol' : 'ul';
    const listClassName =
      block.type === 'ordered-list'
        ? 'list-decimal space-y-3 pl-6 text-slate-700 marker:font-semibold'
        : 'list-disc space-y-3 pl-6 text-slate-700 marker:text-amber-700';

    return (
      <ListTag key={`list-${index}`} className={listClassName}>
        {block.items.map((item, itemIndex) => (
          <li key={`${item.slice(0, 24)}-${itemIndex}`} className="leading-8">
            {renderTextWithLinks(item)}
          </li>
        ))}
      </ListTag>
    );
  });
}

const MyAnalysis = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null);
  const [portalState, setPortalState] = useState<PortalState>({
    status: 'loading',
    message: 'Opening your private analysis portal...',
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const accessToken = searchParams.get('token')?.trim() || '';
      const existingSession = getPortalSessionStore()?.getItem(PORTAL_SESSION_STORAGE_KEY) || '';

      try {
        if (accessToken) {
          const result = await redeemPortalAccessLink(accessToken);
          if (cancelled) {
            return;
          }

          getPortalSessionStore()?.setItem(PORTAL_SESSION_STORAGE_KEY, result.sessionToken);
          setSearchParams((current) => {
            current.delete('token');
            return current;
          }, { replace: true });
          setPortalState({
            status: 'ready',
            client: result.client,
            reports: result.reports,
            activeReportId: result.reports[0]?.id ?? null,
            deliveryEmail: result.deliveryEmail,
          });
          return;
        }

        if (!existingSession) {
          setPortalState({
            status: 'error',
            message:
              'This portal opens through your secure email link. Please use the latest analysis link shared from Soul Infinity.',
          });
          return;
        }

        const session = await fetchPortalSession(existingSession);
        if (cancelled) {
          return;
        }

        setPortalState({
          status: 'ready',
          client: session.client,
          reports: session.reports,
          activeReportId: session.reports[0]?.id ?? null,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        getPortalSessionStore()?.removeItem(PORTAL_SESSION_STORAGE_KEY);
        setPortalState({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'We could not open your analysis right now.',
        });
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [searchParams, setSearchParams]);

  const activeReport =
    portalState.status === 'ready'
      ? portalState.reports.find((report) => report.id === portalState.activeReportId) ?? portalState.reports[0] ?? null
      : null;

  const handleLogout = async () => {
    const sessionToken = getPortalSessionStore()?.getItem(PORTAL_SESSION_STORAGE_KEY) || '';
    getPortalSessionStore()?.removeItem(PORTAL_SESSION_STORAGE_KEY);

    if (sessionToken) {
      void logoutPortalSession(sessionToken);
    }

    setPortalState({
      status: 'error',
      message:
        'You have been signed out of the analysis portal. Open your secure email link again whenever you want to revisit your reading.',
    });
  };

  const handleDownloadPdf = async (report: PortalReport) => {
    const sessionToken = getPortalSessionStore()?.getItem(PORTAL_SESSION_STORAGE_KEY) || '';
    if (!sessionToken) {
      window.alert('Your secure session expired. Please open the latest analysis link again before downloading the report.');
      return;
    }

    try {
      setDownloadingReportId(report.id);
      const blob = await downloadPortalReportPdf(sessionToken, report.id);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const slug = `${report.title || 'soul-infinity-analysis'}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'soul-infinity-analysis';

      link.href = downloadUrl;
      link.download = `${slug}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : 'We could not download the PDF report right now.',
      );
    } finally {
      setDownloadingReportId(null);
    }
  };

  return (
    <>
      <SEOHead
        title="My Analysis Portal | Soul Infinity"
        description="Private astrology analysis portal for Soul Infinity clients."
        noindex
        omitDefaultSchema
      />

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.18),_transparent_42%),linear-gradient(180deg,_#fffdf8_0%,_#f6efe0_100%)] py-20">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-8 top-16 h-40 w-40 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] border border-amber-200/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(98,71,25,0.14)] backdrop-blur"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                  Soul Infinity Client Portal
                </p>
                <h1 className="mt-4 font-heading text-4xl font-bold text-slate-900 md:text-5xl">
                  Your astrology analysis, history, and future updates in one place.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  Every secure analysis link opens on Soul Infinity first, so your reading stays private while keeping you connected to the website for future updates and follow-ups.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white/90 bg-white shadow-[0_16px_36px_rgba(15,23,42,0.18)] ring-2 ring-amber-200/80">
                  <img
                    src="/saurabh-jain-portal-stamp.png"
                    alt="Saurabh Jain"
                    className="h-full w-full object-cover object-[center_22%]"
                    loading="eager"
                  />
                </div>
                <div className="text-left lg:text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
                    Guided by
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">Saurabh Jain</p>
                </div>

                {portalState.status === 'ready' && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                )}
              </div>
            </div>

            {portalState.status === 'loading' && (
              <div className="mt-10 rounded-3xl border border-amber-200 bg-amber-50/70 p-8 text-slate-700">
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  {portalState.message}
                </div>
              </div>
            )}

            {portalState.status === 'error' && (
              <div className="mt-10 rounded-3xl border border-rose-200 bg-rose-50/70 p-8">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-rose-500" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Portal access needed</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                      {portalState.message}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Go To Contact Form
                      </Link>
                      <a
                        href="mailto:soul.infinity.astro@gmail.com?subject=Need%20analysis%20portal%20access"
                        className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Email Support
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {portalState.status === 'ready' && (
              <div className="mt-10 grid gap-8 lg:grid-cols-[320px,minmax(0,1fr)]">
                <aside className="space-y-6">
                  <div className="rounded-[28px] border border-amber-200/80 bg-amber-50/70 p-6">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                      <p className="text-sm font-semibold text-slate-900">Secure client access</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {portalState.deliveryEmail
                        ? `Access redeemed for ${portalState.deliveryEmail}.`
                        : 'Your session is active in this tab only.'}
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                      Client Profile
                    </p>
                    <h2 className="mt-3 font-heading text-2xl font-bold text-slate-900">
                      {portalState.client?.fullName || 'Soul Infinity Client'}
                    </h2>
                    <div className="mt-5 space-y-4 text-sm text-slate-600">
                      <div className="flex gap-3">
                        <Mail className="mt-0.5 h-4 w-4 text-amber-600" />
                        <span>{portalState.client?.emailAddress || 'Email not available'}</span>
                      </div>
                      <div className="flex gap-3">
                        <BookOpen className="mt-0.5 h-4 w-4 text-amber-600" />
                        <span>{portalState.reports.length} analysis entr{portalState.reports.length === 1 ? 'y' : 'ies'} in history</span>
                      </div>
                      <div className="flex gap-3">
                        <Clock3 className="mt-0.5 h-4 w-4 text-amber-600" />
                        <span>
                          Joined record: {portalState.client?.createdAt ? formatPortalDate(portalState.client.createdAt) : 'Not available'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                      Analysis History
                    </p>
                    <div className="mt-4 space-y-3">
                      {portalState.reports.map((report) => (
                        <button
                          key={report.id}
                          type="button"
                          onClick={() =>
                            setPortalState((current) =>
                              current.status === 'ready'
                                ? { ...current, activeReportId: report.id }
                                : current,
                            )
                          }
                          className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                            activeReport?.id === report.id
                              ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                              : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:bg-white'
                          }`}
                        >
                          <p className="text-sm font-semibold">{report.title}</p>
                          <p className={`mt-2 text-xs ${activeReport?.id === report.id ? 'text-slate-200' : 'text-slate-500'}`}>
                            {report.reportType} • {formatPortalDate(report.publishedAt || report.updatedAt)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                  {activeReport ? (
                    <>
                      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                            {activeReport.reportType}
                          </p>
                          <h2 className="mt-3 font-heading text-3xl font-bold text-slate-900">
                            {activeReport.title}
                          </h2>
                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            Published {formatPortalDate(activeReport.publishedAt || activeReport.updatedAt)}
                            {activeReport.placeOfBirth ? ` • Birth place recorded as ${activeReport.placeOfBirth}` : ''}
                          </p>
                        </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        History maintained on Soul Infinity for future readings.
                      </div>
                    </div>

                      {activeReport.pdfEnabled && (
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Download your branded PDF report</p>
                            <p className="mt-1 text-sm text-slate-600">
                              This download includes your analysis, remedies, and mantra or blog references in one Soul Infinity report.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => void handleDownloadPdf(activeReport)}
                            disabled={downloadingReportId === activeReport.id}
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            {downloadingReportId === activeReport.id ? 'Preparing PDF...' : 'Download PDF Report'}
                          </button>
                        </div>
                      )}

                      <div className="mt-8 space-y-6">
                        <section className="rounded-[28px] border border-slate-200 bg-slate-50/80 p-6">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                            Section 1
                          </p>
                          <h3 className="mt-2 font-heading text-2xl font-bold text-slate-900">Planetary Analysis</h3>
                          <div className="mt-4 space-y-4">
                            {renderFormattedContent(activeReport.analysisBody || activeReport.reportBody)}
                          </div>
                        </section>

                        {activeReport.remediesBody && (
                          <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                              Section 2
                            </p>
                            <h3 className="mt-2 font-heading text-2xl font-bold text-slate-900">Recommended Remedies</h3>
                            <div className="mt-4 space-y-4">
                              {renderFormattedContent(activeReport.remediesBody)}
                            </div>
                          </section>
                        )}

                        {activeReport.resourceLinksBody && (
                          <section className="rounded-[28px] border border-slate-200 bg-white p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                              Section 3
                            </p>
                            <h3 className="mt-2 font-heading text-2xl font-bold text-slate-900">Mantras And Helpful Links</h3>
                            <div className="mt-4 space-y-4">
                              {renderFormattedContent(activeReport.resourceLinksBody)}
                            </div>
                          </section>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-slate-600">
                      Your portal is active, but no visible analysis has been published yet.
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MyAnalysis;
