package com.pythonquest.backend.controllers;

import com.pythonquest.backend.model.Question;
import com.pythonquest.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:3000") // Allows your React frontend to connect
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    // API endpoint: GET /api/questions/random?levelId=1
    @GetMapping("/random")
    public Question getRandomQuestion(@RequestParam int levelId) {
        return questionRepository.findRandomQuestionByLevel(levelId);
    }
}