'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function ResumeViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Resume preview
        </span>

        {numPages && (
          <span className="font-mono text-xs text-muted">
            {numPages} {numPages === 1 ? 'page' : 'pages'}
          </span>
        )}
      </div>

      {error ? (
        <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
          <div>
            <p className="font-display text-sm text-text">
              Preview unavailable
            </p>
            <p className="mt-2 text-sm text-muted">
              Use the Open Resume button above to view the PDF.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-h-[80vh] overflow-auto p-3 sm:p-6">
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={() => setError(true)}
            loading={
              <div className="flex min-h-[300px] items-center justify-center">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  Loading resume…
                </span>
              </div>
            }
          >
            {numPages &&
              Array.from({ length: numPages }, (_, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="mb-4 flex justify-center last:mb-0"
                >
                  <Page
                    pageNumber={index + 1}
                    width={700}
                  />
                </div>
              ))}
          </Document>
        </div>
      )}
    </div>
  );
}