import { useEffect } from "react";
import { useGetReportInfo } from "@/api/response";
import jsPDF from "jspdf";
import logger from "@/utils/logger";

interface DownloadReportProps {
  reportId: number;
  onComplete: () => void;
}

interface ReportImage {
  image_url: string;
}

export default function DownloadReport({ reportId, onComplete }: DownloadReportProps) {
  const { data: reportData, isLoading, error } = useGetReportInfo(String(reportId));

  function extractTextFromJSXString(jsxString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(jsxString, "text/html");
    return doc.body.textContent || "";
  }

  async function addImageToPDF(pdf: jsPDF, imageUrl: string, x: number, y: number, width: number, height: number) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const reader = new FileReader();

      return new Promise<void>((resolve, reject) => {
        reader.onload = function () {
          const base64Image = reader.result as string;
          pdf.addImage(base64Image, "PNG", x, y, width, height);
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      logger.error("Error loading image:", error, "DownloadReport");
    }
  }

  async function accessAllImages(pdf: jsPDF, images: ReportImage[], yPosition: number) {
    for (const image of images) {
      if (yPosition + 90 > 280) {
        pdf.addPage();
        yPosition = 20; // Reset to top margin
      }
      await addImageToPDF(pdf, image.image_url, 10, yPosition, 180, 90);
      yPosition += 100; // Adjust for image height and spacing
    }
    return yPosition;
  }

  function addText(pdf: jsPDF, content: string, yPositionRef: { value: number }, yOffset = 10) {
    const pageHeight = 280;
    const lines = pdf.splitTextToSize(content, 180);

    if (yPositionRef.value + lines.length * 10 > pageHeight) {
      pdf.addPage();
      yPositionRef.value = 20; // Reset to top margin
    }

    pdf.text(lines, 10, yPositionRef.value);
    yPositionRef.value += lines.length * 10 + yOffset;
  }

  useEffect(() => {
    async function createPDF() {
      if (reportData && !isLoading) {
        const pdf = new jsPDF();
        pdf.setFontSize(14);
        const yPositionRef = { value: 20 }; // Using object to pass by reference

        pdf.text("REPORT:", 10, yPositionRef.value);
        yPositionRef.value += 10;

        addText(pdf, reportData.title, yPositionRef);

        // Add Images if available
        if (reportData.reportImages && reportData.reportImages.length > 0) {
          yPositionRef.value = await accessAllImages(pdf, reportData.reportImages, yPositionRef.value);
        }

        pdf.setFontSize(12);
        addText(pdf, `Date: ${new Date(reportData.createdAt).toDateString()}`, yPositionRef);

        addText(pdf, `Location: ${reportData.location_meta}`, yPositionRef);

        // Add SDGs if available
        if (reportData.reportSDGs && reportData.reportSDGs.length > 0) {
          pdf.text("SDGs:", 10, yPositionRef.value);
          yPositionRef.value += 10;
          for (const sdg of reportData.reportSDGs) {
            addText(pdf, `- ${sdg.sdg.title}`, yPositionRef, 5);
          }
        }

        // Add Description
        pdf.text("Description:", 10, yPositionRef.value);
        yPositionRef.value += 10;
        addText(pdf, extractTextFromJSXString(reportData.description), yPositionRef);

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
