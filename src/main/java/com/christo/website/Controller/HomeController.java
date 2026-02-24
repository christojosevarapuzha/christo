package com.christo.website.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import com.christo.website.Service.VisitorService;
import com.christo.website.Service.GuestbookService;

@Controller
public class HomeController {

    private final VisitorService visitorService;
    private final GuestbookService guestbookService;

    @Autowired
    public HomeController(VisitorService visitorService, GuestbookService guestbookService) {
        this.visitorService = visitorService;
        this.guestbookService = guestbookService;
    }

    @GetMapping("/")
    public String home(Model model, HttpServletRequest request) {
        System.out.println("Request received from: " + request.getRequestURI() + " | User-Agent: "
                + request.getHeader("User-Agent"));

        int visitorCount = visitorService.incrementAndGetVisitorCount();
        List<String> guestbookMessages = guestbookService.getRecentMessages(10);

        model.addAttribute("visitorCount", visitorCount);
        model.addAttribute("guestbookMessages", guestbookMessages);
        return "index";
    }

    @GetMapping("/admin/guestbook")
    public String adminGuestbook(
            @org.springframework.web.bind.annotation.RequestParam(value = "secret", required = false) String secret,
            Model model) {
        if (!"123".equals(secret)) {
            // Unauthorized / Forbidden
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.FORBIDDEN, "Access Denied");
        }

        List<String> allMessages = guestbookService.getAllMessages();
        model.addAttribute("messages", allMessages);
        return "admin_guestbook";
    }

    @PostMapping("/api/guestbook")
    @ResponseBody
    public ResponseEntity<String> addGuestbookMessage(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");
        boolean success = guestbookService.addMessage(message);

        if (success) {
            return ResponseEntity.ok("Message added");
        } else {
            if (message == null || message.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Message cannot be empty");
            }
            return ResponseEntity.internalServerError().body("Error saving message");
        }
    }
}
