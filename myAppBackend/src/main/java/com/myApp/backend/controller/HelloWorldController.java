package com.myApp.backend.controller;

import com.myApp.backend.model.HelloBean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldController {

    @GetMapping("/hello")
    public String getHeloWorld() {
        return "Welcome to Hello world!!";
    }

    @GetMapping("/hello-bean")
    public HelloBean getHelloWorldBean() {
        return new HelloBean("I am HelloBean");
    }

    @GetMapping("/hello/{name}")
    public HelloBean getLoginDetails(@PathVariable String name) {
       return new HelloBean(String.format("Hello from Bean %s",name));
    }
}
