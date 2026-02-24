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
                copyFromClasspath(file);
                // If it's still completely empty, default to 0
                if (file.length() == 0) {
                    writeFile(file, "0");
                }
            }

            // Read current count
            String content = readFile(file);
            try {
                count = Integer.parseInt(content.trim());
            } catch (NumberFormatException nfe) {
                count = 0;
            }

            // Increment count
            count++;

            // Write new count
            writeFile(file, String.valueOf(count));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return count;
    }

    private void copyFromClasspath(File targetFile) {
        try (InputStream is = getClass().getResourceAsStream("/" + VISITOR_FILE_PATH)) {
            if (is != null) {
                try (OutputStream os = new FileOutputStream(targetFile)) {
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = is.read(buffer)) != -1) {
                        os.write(buffer, 0, bytesRead);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
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
