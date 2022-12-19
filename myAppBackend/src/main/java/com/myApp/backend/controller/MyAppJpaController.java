package com.myApp.backend.controller;

import com.myApp.backend.model.MyLearning;
import com.myApp.backend.repository.MyLearningJpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MyAppJpaController {

    private MyLearningJpaRepository repository;

    public MyAppJpaController(MyLearningJpaRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/jpa/user/{username}/learnings")
    public List<MyLearning> getMyLearnings(@PathVariable String username) {
        return repository.findAll();
    }

    @GetMapping("/jpa/user/{username}/learnings/{id}")
    public MyLearning getMyLearning(@PathVariable String username, @PathVariable long id) {
        return repository.findById(id).get();
    }

    @PutMapping("/jpa/user/{username}/learnings/{id}")
    public ResponseEntity<MyLearning> updateMyLearning(@PathVariable String username, @PathVariable long id,
                                           @RequestBody MyLearning myLearning) {
        myLearning.setUsername(username);
        MyLearning myLearnings = repository.save(myLearning);
        return new ResponseEntity<MyLearning>(myLearning, HttpStatus.OK);
    }

    @PostMapping("/jpa/user/{username}/learnings")
    public ResponseEntity<Void> createMyLearning(@PathVariable String username, @RequestBody MyLearning myLearning) {
        myLearning.setUsername(username);
        MyLearning createdLearning = repository.save(myLearning);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdLearning.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping ("/jpa/user/{username}/learnings/{id}")
    public ResponseEntity<Void> deleteMyLearning(@PathVariable String username,
                                                 @PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
