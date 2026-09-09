package contextflow_backend;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.contextflow.service.PdfTextExtractor;

public class PDFTextExtractorTest {
    @Test
    void extractTextFromPdf() throws Exception{

        PdfTextExtractor extractor = new PdfTextExtractor();

        String text = extractor.extractText("uploads/Tanmay_riwari_resume.pdf");
        System.out.println(text);
        assertNotNull(text);
        assertFalse(text.isBlank());
    }


    
}
