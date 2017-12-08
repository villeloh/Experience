/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Ville L
 */
@javax.ws.rs.ApplicationPath("App")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(controller.AdminService.class);
        resources.add(controller.CommentService.class);
        resources.add(controller.CompService.class);
        resources.add(controller.LoginService.class);
        resources.add(controller.ProfileService.class);
        resources.add(controller.services.AdminService.class);
        resources.add(controller.services.CommentService.class);
        resources.add(controller.services.CompService.class);
        resources.add(controller.services.LoginService.class);
        resources.add(controller.services.ProfileService.class);
    }
    
}
