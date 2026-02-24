package com.christo.website.Service;

import org.springframework.stereotype.Service;
import java.io.*;

@Service
public class VisitorService {
    private static final String VISITOR_FILE_PATH = "visitor_count.txt";

    public int incrementAndGetVisitorCount() {
        int count = 0;
        try {
            File file = new File(VISITOR_FILE_PATH);
            if (!file.exists()) {
                file.createNewFile();
                writeFile(file, "0");
            }

            // Read current count
            String content = readFile(file);
            count = Integer.parseInt(content.trim());

            // Increment count
            count++;

            // Write new count
            writeFile(file, String.valueOf(count));
        } catch (IOException | NumberFormatException e) {
            e.printStackTrace();
        }
        return count;
    }

    private String readFile(File file) throws IOException {
        StringBuilder content = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
        }
        return content.toString();
    }

    private void writeFile(File file, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            writer.write(content);
        }
    }
}
