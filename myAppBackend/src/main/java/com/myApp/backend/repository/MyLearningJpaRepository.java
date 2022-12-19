package com.myApp.backend.repository;

import com.myApp.backend.model.MyLearning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyLearningJpaRepository extends JpaRepository<MyLearning, Long> {

    List<MyLearning> findByUsername(String username);
}
