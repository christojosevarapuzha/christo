package com.christo.website.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import jakarta.servlet.http.HttpServletRequest;
import java.io.*;

@Controller
public class HomeController {

    private static final String VISITOR_FILE_PATH = "visitor_count.txt";

    @GetMapping("/")
    public String home(Model model, HttpServletRequest request) {
        System.out.println("Request received from: " + request.getRequestURI() + " | User-Agent: "
                + request.getHeader("User-Agent"));
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
            // Fallback if file error
        }

        model.addAttribute("visitorCount", count);
        return "index";
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
