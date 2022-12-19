package com.myApp.backend.service;

import com.myApp.backend.model.MyLearning;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MyLearningService {

    private static List<MyLearning> myLearnings = new ArrayList<>();
    private static long idCounter = 0;

    static {
        myLearnings.add(new MyLearning(++idCounter,"Mak","Learn Aws",new Date(),false));
        myLearnings.add(new MyLearning(++idCounter,"Priya","Learn Docker",new Date(),false));
        myLearnings.add(new MyLearning(++idCounter,"Mayanku","Learn Kubernetes",new Date(),false));
        myLearnings.add(new MyLearning(++idCounter,"Priyanku","Learn Spring",new Date(),false));
        myLearnings.add(new MyLearning(++idCounter,"Makakak","Learn SpringBoot",new Date(),false));
    }

    public List<MyLearning> findAll(){
        return myLearnings;
    }

    public MyLearning save(MyLearning myLearning){
        if(myLearning.getId() == -1 || myLearning.getId() == 0) {
            myLearning.setId(++idCounter);
            myLearnings.add(myLearning);
        } else{
            deleteById(myLearning.getId());
            myLearnings.add(myLearning);
        }
        return myLearning;
    }


    public MyLearning deleteById(long id){
        MyLearning myLearning = findByid(id);
        if(myLearning==null) return null;
        if(myLearnings.remove(myLearning)){
            return myLearning;
        }
        return null;
    }

    public MyLearning findByid(long id) {
        for(MyLearning myLearning: myLearnings) {
            if(myLearning.getId() == id) {
                return myLearning;
            }
        }
        return null;
    }

}
