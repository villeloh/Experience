
package controller.services;

import controller.beans.CompBean;
import controller.beans.UserBean;
import javax.ejb.EJB;
import javax.ws.rs.CookieParam;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.User;
import utils.ResponseString;
import static utils.Utils.notNull;
import static utils.Utils.statusResponse;
import static utils.Validation.validAlias;
import static utils.Validation.validEmail;
import static utils.Validation.validPw;
import static utils.Validation.validPic;

/**
 * REST Web Service
 * Contains user-profile-related methods (to be used by logged-in users).
 * @author Ville L
 */
@Path("ProfileService")
public class ProfileService {

    @EJB
    private UserBean uBean;
    
    @EJB
    private CompBean cBean;
    
    public ProfileService() {
    }
    
    // for displaying your own profile stats (on opening the profile page)
    @POST
    @Path("GetUserStats")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserStats(@CookieParam("id") int ownId) {
    
        User u = uBean.findById(ownId);
        
        long numOfComps = (long)cBean.numOfCompsAddedByUser(ownId);
          
        ResponseString s = new ResponseString();
        s.add("status", "gotUserStats");
        s.add("alias", u.getAlias());
        s.add("email", u.getEmail());
        s.add("pw", u.getPw());
        s.add("pic", u.getPic());
        s.add("admin", u.getAdmin()+"");
        s.add("numOfComps", numOfComps+"");
        s.pack();
        return Response.ok(s.toString()).build();  
    }
    
    // TODO: make an admin function (in AdminService) that does the same to any user...
    @POST
    @Path("AlterOwnUserStats")
    @Produces(MediaType.APPLICATION_JSON)
    public Response alterUserStats(
            @FormParam("newAlias") String newName, 
            @FormParam("newEmail") String newEmail, 
            @FormParam("newPw") String newPw, 
            @FormParam("newPw2") String newPw2,
            @CookieParam("id") int ownId) {
    
        User u = uBean.findById(ownId);
        String alias = "noChange";
        String email = "noChange";
        String pw = "noChange";
        String pic = "noChange";
        
        if (validAlias(newName)) {
            
            if (!notNull(uBean.findByX("Alias", newName))) { // new name should not be already taken
            
                u.setAlias(newName);
                alias = newName;
            }
        }
        
        if (validEmail(newEmail)) {
            
            if (!notNull(uBean.findByX("Alias", newEmail))) {
            
                u.setEmail(newEmail);  
                email = newEmail;
            }
        }
                
        if (validPw(newPw) && newPw.equals(newPw2)) {
            
            u.setPw(newPw);   
            pw = newPw;
        }
        
        try {
            uBean.updateDbEntry(u);

            ResponseString s = new ResponseString();
            s.add("status", "alteredOwnUserStats");
            s.add("alias", alias);
            s.add("email", email);
            s.add("pw", pw);
            s.add("pic", pic);
            s.pack();
            return Response.ok(s.toString()).build();  
        } catch (Error e) {
            
            return statusResponse("couldNotUpdateUserStats");
        }
    } // end alterOwnUserStats()
    
    @POST
    @Path("UpdatePic")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updatePic(@CookieParam("id") int ownId, @FormParam("pic") String newPic) {

        if (validPic(newPic)) {
        
            User u = uBean.findById(ownId);
            u.setPic(newPic);
            uBean.updateDbEntry(u);
            
            ResponseString s = new ResponseString();
            s.add("status", "updatedPic");
            s.add("pic", newPic);
            s.pack();
            return Response.ok(s.toString()).build();  
        } 
        else {  
            return statusResponse("failedToUpdatePic");
        }
    } // end updatePic()
    
    @POST
    @Path("DeletePic")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletePic(@CookieParam("id") int ownId) {

        try {
            String newPic = "resources/pepe.png";
            User u = uBean.findById(ownId);
            u.setPic(newPic);
            uBean.updateDbEntry(u);
            
            ResponseString s = new ResponseString();
            s.add("status", "deletedPic");
            s.add("pic", newPic);
            s.pack();
            return Response.ok(s.toString()).build(); 

            // TODO: delete pic from the SERVER... not sure how to do this tbh
        } catch (Exception e) {
        return statusResponse("failedToDeletePic");
        }
    } // end deletePic()
 
    @POST
    @Path("RemoveOwnUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeOwnUser(@CookieParam("id") int id) {
        
        uBean.deleteFromDb(uBean.findById(id));
        
        return statusResponse("removedOwnUser");
    } // end removeOwnUser()
} // end class
