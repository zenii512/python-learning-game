package com.pythonquest.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pythonquest.backend.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "SELECT * FROM question WHERE level_id = :levelId ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Question findRandomQuestionByLevel(@Param("levelId") int levelId);
}
