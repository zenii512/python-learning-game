package com.pythonquest.backend.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pythonquest.backend.dto.QuestionResponse;
import com.pythonquest.backend.model.Question;
import com.pythonquest.backend.repository.QuestionRepository;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:4173"})
public class QuestionController {

    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping("/random")
    public ResponseEntity<?> getRandomQuestion(@RequestParam("levelId") int levelId) {
        Question question = questionRepository.findRandomQuestionByLevel(levelId);

        if (question == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "No questions found for level " + levelId));
        }

        return ResponseEntity.ok(QuestionResponse.fromQuestion(question));
    }

    @PostMapping("/{id}/answer")
    public ResponseEntity<?> submitAnswer(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        Question question = questionRepository.findById(id).orElse(null);

        if (question == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Question not found with id " + id));
        }

        String selectedOption = requestBody == null ? null : requestBody.get("selectedOption");
        if (selectedOption == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "selectedOption is required"));
        }

        String normalizedOption = selectedOption.trim().toUpperCase();
        if (!normalizedOption.equals("A") && !normalizedOption.equals("B")
                && !normalizedOption.equals("C") && !normalizedOption.equals("D")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid option. Must be A, B, C, or D"));
        }

        String correctOption = question.getCorrectAnswer() == null ? "" : question.getCorrectAnswer().trim().toUpperCase();
        boolean correct = normalizedOption.equals(correctOption);

        return ResponseEntity.ok(Map.of(
                "correct", correct,
                "correctOption", correctOption
        ));
    }
}