import { useEffect } from "react";
import { useGetReportInfo } from "@/api/response";
import jsPDF from "jspdf";

interface DownloadReportProps {
  reportId: number;
  onComplete: () => void;
}

export default function DownloadReport({ reportId, onComplete }: DownloadReportProps) {
  const { data: reportData, isLoading, error } = useGetReportInfo(String(reportId));

  console.log(reportData);

  function extractTextFromJSXString(jsxString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(jsxString, "text/html");
    return doc.body.textContent || "";
  }

  async function addImageToPDF(pdf: jsPDF, imageUrl: string, x: number, y: number, width: number, height: number) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise<void>((resolve, reject) => {
      reader.onload = function() {
        const base64Image = reader.result as string;
        pdf.addImage(base64Image, "PNG", x, y, width, height);
        resolve();
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  useEffect(() => {
    async function createPDF() {
      if (reportData && !isLoading) {
        const pdf = new jsPDF();
        pdf.setFontSize(14);

        pdf.text("REPORT:", 10, 10);
        const titleLines = pdf.splitTextToSize(reportData.title, 180);
        pdf.text(titleLines, 10, 20);

        let yPosition = 20 + titleLines.length * 10;

        // Add Image if available
        const imageUrl = reportData.reportImages[0].image_url;
        await addImageToPDF(pdf, imageUrl, 10, yPosition, 180, 90); // Adjust position and size as needed
        yPosition += 100; // Adjust for image height and spacing

        // Add Date
        pdf.setFontSize(12);
        pdf.text(`Date: ${new Date(reportData.createdAt).toDateString()}`, 10, yPosition);
        // yPosition += 10;

        // Add Location
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

        // Add Description
        pdf.text("Description:", 10, yPosition);
        const descriptionLines = pdf.splitTextToSize(extractTextFromJSXString(reportData.description), 180);
        pdf.text(descriptionLines, 10, yPosition + 10);
        yPosition += descriptionLines.length * 10 + 10;

        // Save the PDF
        pdf.save(`report_${reportId}.pdf`);
        onComplete();
      }
    }

    createPDF();
  }, [reportData, isLoading, reportId, onComplete]);

  if (error) return <div>Error downloading report</div>;
  return null;
}
