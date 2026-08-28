import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export async function exportToPDF(filename: string): Promise<void> {
  // Hide interactive chrome that shouldn't appear in the PDF
  const hidden: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>(".print\\:hidden").forEach((el) => {
    if (el.style.display !== "none") {
      el.style.display = "none";
      hidden.push(el);
    }
  });

  try {
    // html-to-image uses getComputedStyle (browser-native), so oklab / oklch etc. all resolve correctly
    const dataUrl = await toPng(document.body, {
      pixelRatio: 1.5,
      skipAutoScale: true,
    });

    // Derive rendered image dimensions so pagination is accurate
    const img = await new Promise<HTMLImageElement>((resolve) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.src = dataUrl;
    });

    const pdf = new jsPDF({ orientation: "p", unit: "px", format: "a4" });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();

    const scale = pdfW / img.naturalWidth;
    const totalH = img.naturalHeight * scale;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfW, totalH);

    let heightLeft = totalH - pdfH;
    let offset = -pdfH;
    while (heightLeft > 1) {
      pdf.addPage();
      pdf.addImage(dataUrl, "PNG", 0, offset, pdfW, totalH);
      offset -= pdfH;
      heightLeft -= pdfH;
    }

    pdf.save(filename);
  } finally {
    hidden.forEach((el) => {
      el.style.display = "";
    });
  }
}
