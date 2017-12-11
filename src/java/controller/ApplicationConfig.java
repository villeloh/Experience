
package controller;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 * @author N/A (auto-generated file)
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
        resources.add(controller.services.AdminService.class);
        resources.add(controller.services.CommentService.class);
        resources.add(controller.services.CompService.class);
        resources.add(controller.services.LoginService.class);
        resources.add(controller.services.ProfileService.class);
    }
    
} // end class
