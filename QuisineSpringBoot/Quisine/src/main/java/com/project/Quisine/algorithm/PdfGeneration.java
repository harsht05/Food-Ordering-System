package com.project.Quisine.algorithm;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.FileOutputStream;
import java.io.IOException;

public class PdfGeneration {

	public static String generateOrderSummaryPDF(String orderDetails) {
     
		String fileName = "order_summary.pdf";
        String filePath = "E:\\Order_Summary" + fileName;

        try {
        
        	Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(filePath));
            document.open();
            document.add(new Paragraph("Order Summary"));
            document.add(new Paragraph(orderDetails)); 
            document.close();
        } 
        catch (DocumentException | IOException e) {
        
        	e.printStackTrace();
        }
        
        return filePath;
    }
}
