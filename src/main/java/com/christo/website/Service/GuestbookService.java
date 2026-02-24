package com.christo.website.Service;

import org.springframework.stereotype.Service;
import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class GuestbookService {
    private static final String GUESTBOOK_FILE_PATH = "guestbook.txt";

    public List<String> getRecentMessages(int limit) {
        List<String> messages = new ArrayList<>();
        try {
            File guestbookFile = new File(GUESTBOOK_FILE_PATH);
            if (!guestbookFile.exists()) {
                guestbookFile.createNewFile();
                return messages;
            }
            messages = readLastLines(guestbookFile, limit);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return messages;
    }

    public List<String> getAllMessages() {
        List<String> allMessages = new ArrayList<>();
        try {
            File guestbookFile = new File(GUESTBOOK_FILE_PATH);
            if (guestbookFile.exists()) {
                try (BufferedReader reader = new BufferedReader(new FileReader(guestbookFile))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        if (!line.trim().isEmpty()) {
                            allMessages.add(line);
                        }
                    }
                }
                Collections.reverse(allMessages); // Show latest first
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return allMessages;
    }

    public boolean addMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            return false;
        }

        // Basic sanitization
        message = message.trim().replaceAll("[\\r\\n]", " ");
        if (message.length() > 100) {
            message = message.substring(0, 100);
        }

        try {
            File guestbookFile = new File(GUESTBOOK_FILE_PATH);
            appendFile(guestbookFile, message);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private void appendFile(File file, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file, true))) {
            writer.write(content);
            writer.newLine();
        }
    }

    private List<String> readLastLines(File file, int numLines) throws IOException {
        List<String> lines = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.trim().isEmpty()) {
                    lines.add(line);
                }
            }
        }
        int start = Math.max(0, lines.size() - numLines);
        List<String> lastLines = new ArrayList<>(lines.subList(start, lines.size()));
        Collections.reverse(lastLines);
        return lastLines;
    }
}
