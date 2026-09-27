package com.contextflow.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import javax.imageio.ImageIO;

import java.awt.image.BufferedImage;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

@Service
public class PdfTextExtractor {

    public String extractText(String filePath) throws IOException{

        File file = new File(filePath);
        try(PDDocument document = Loader.loadPDF(file)){
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            if(text!= null && !text.isBlank()){
                return text;
            }

            PDFRenderer renderer = new PDFRenderer(document);

            StringBuilder extractedText = new StringBuilder();

            for (int page = 0; page < document.getNumberOfPages(); page++) {

                BufferedImage image = renderer.renderImageWithDPI(page, 300);

                Path imagePath = Files.createTempFile("contextflow-page-", ".png");

                ImageIO.write(image, "png", imagePath.toFile());

                String ocrText = runTesseract(imagePath.toString());

                extractedText.append(ocrText);
                extractedText.append("\n");

                Files.deleteIfExists(imagePath);


            }
            return extractedText.toString();
        }
    }
    
    public String runTesseract(String imagePath) throws IOException{

        ProcessBuilder processBuilder = new ProcessBuilder(
            "tesseract",
                imagePath,
                "stdout"
        );

        Process process = processBuilder.start();

        String result = new String(
                process.getInputStream().readAllBytes()
        );

        try {
            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new IOException("Tesseract OCR failed");
            }

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IOException("OCR process interrupted", e);
        }
        return result;
    }
}
