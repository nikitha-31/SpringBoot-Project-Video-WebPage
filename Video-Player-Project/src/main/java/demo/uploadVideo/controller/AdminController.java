package demo.uploadVideo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.uploadVideo.entity.Admin;
import demo.uploadVideo.service.AdminService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:3000")
public class AdminController {
	
	@Autowired
    private AdminService adminService;
	
	@PostMapping("/admin/login")
    public ResponseEntity<String> adminLogin(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Admin admin = adminService.verifyAdmin(email, password);
        if (admin != null) {
            return ResponseEntity.ok("Admin logged in successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Admin authentication failed");
    }

}
