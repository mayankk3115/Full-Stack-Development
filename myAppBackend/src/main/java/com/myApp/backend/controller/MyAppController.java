package com.myApp.backend.controller;

import com.myApp.backend.model.MyLearning;
import com.myApp.backend.service.MyLearningService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MyAppController {

    private MyLearningService myLearningService;

    public MyAppController(MyLearningService myLearningService) {
        this.myLearningService = myLearningService;
    }

    @GetMapping("/user/{username}/learnings")
    public List<MyLearning> getMyLearnings(@PathVariable String username) {
        return myLearningService.findAll();
    }

    @GetMapping("/user/{username}/learnings/{id}")
    public MyLearning getMyLearning(@PathVariable String username, @PathVariable long id) {
        return myLearningService.findByid(id);
    }

    @PutMapping("/user/{username}/learnings/{id}")
    public ResponseEntity<MyLearning> updateMyLearning(@PathVariable String username, @PathVariable long id,
                                           @RequestBody MyLearning myLearning) {
        MyLearning myLearnings = myLearningService.save(myLearning);
        return new ResponseEntity<MyLearning>(myLearning, HttpStatus.OK);
    }

    @PostMapping("/user/{username}/learnings")
    public ResponseEntity<Void> createMyLearning(@PathVariable String username, @RequestBody MyLearning myLearning) {
        MyLearning createdLearning = myLearningService.save(myLearning);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdLearning.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping ("/user/{username}/learnings/{id}")
    public ResponseEntity<Void> deleteMyLearning(@PathVariable String username,
                                                 @PathVariable long id) {
        MyLearning myLearning = myLearningService.deleteById(id);
        if(myLearning!=null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
