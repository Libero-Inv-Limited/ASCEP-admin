// DownloadReport.tsx
import { useEffect } from "react";
import { useGetReportInfo } from "@/api/response";
import jsPDF from "jspdf";

interface DownloadReportProps {
  reportId: number;
  onComplete: () => void;
}

export default function DownloadReport({ reportId, onComplete }: DownloadReportProps) {
  const { data: reportData, isLoading, error } = useGetReportInfo(String(reportId));

  useEffect(() => {
    if (reportData && !isLoading) {
      const pdf = new jsPDF();
      pdf.setFontSize(14);

      // Add Title with dynamic wrapping
      pdf.text("REPORT:", 10, 10);
      const titleLines = pdf.splitTextToSize(reportData.title, 180);
      pdf.text(titleLines, 10, 20);

      let yPosition = 20 + titleLines.length * 10; // Adjust y-position based on title height

      // Add Date
      pdf.setFontSize(12);
      pdf.text(`Date: ${new Date(reportData.createdAt).toDateString()}`, 10, yPosition);
      yPosition += 10;

      // Add Location with dynamic wrapping
      const locationLines = pdf.splitTextToSize(reportData.location_meta, 180);
      pdf.text(`Location: ${locationLines}`, 10, yPosition + 10);
      yPosition += locationLines.length * 10 + 10;

      // Add SDGs if available
      if (reportData.reportSDGs && reportData.reportSDGs.length > 0) {
        pdf.text("SDGs:", 10, yPosition);
        reportData.reportSDGs.forEach((sdg, index) => {
          pdf.text(`- ${sdg.sdg.title}`, 15, yPosition + (index + 1) * 10);
        });
        yPosition += reportData.reportSDGs.length * 10 + 10;
      }

      // Add Description with dynamic wrapping
      pdf.text("Description:", 10, yPosition);
      const descriptionLines = pdf.splitTextToSize(reportData.description, 180);
      pdf.text(descriptionLines, 10, yPosition + 10);
      yPosition += descriptionLines.length * 10 + 10;

      // Save the PDF file
      pdf.save(`report_${reportId}.pdf`);


      onComplete(); // Notify parent that download is complete
    }
  }, [reportData, isLoading, reportId, onComplete]);

  // if (isLoading) return <div>Downloading report...</div>;
  if (error) return <div>Error downloading report</div>;
  return null;
}
