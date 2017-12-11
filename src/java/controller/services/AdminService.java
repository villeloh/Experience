
package controller.services;

import controller.beans.UserBean;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.CookieParam;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.User;
import static utils.Utils.notNull;
import static utils.Utils.statusResponse;
import utils.ResponseString;

/**
 * REST Web Service
 * Contains admin-related methods.
 * @author Ville L
 */
@Path("AdminService")
public class AdminService {
    
    @EJB
    private UserBean uBean;

    public AdminService() {
    }
    
    // return a list of all users (for managing their admin rights / removing them)
    @POST
    @Path("GetAllUsers")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() { 
    
    List<User> uList = uBean.getAllUsers();
    
    ResponseString returnString = new ResponseString();
    returnString.add("status", "gotAllUsers");

    int userCount = 1;

    for (User u : uList) {

        // individual String object (value) to be wrapped in final return String object
        ResponseString s = new ResponseString();
        s.addToList("id", u.getId()+"");
        s.addToList("alias", u.getAlias());
        s.addToList("admin", u.getAdmin()+"");
        s.pack();

        // key-value pair for individual comp entry in the final return String
        String num = userCount+"";
        returnString.add("user_"+num, s.toString());

        userCount++;
    } // end for-loop

    returnString.pack();
    return Response.ok(returnString.toString()).build();
    } // end getAllUsers()

    // NOTE: only superadmin can make new admins, so only s/he should be able to see the button by which to grant new admin rights.
    // thus no check for admin status is needed.
    @POST
    @Path("GrantAdmin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response grantAdmin(@FormParam("userId") int id) {

            User u = uBean.findById(id); 
            
        if (notNull(u)) {
        
            u.setAdmin(1); // only admins may be made like this, not superadmins
            uBean.updateDbEntry(u); // update the db with the change

            return statusResponse("madeNewAdmin");
        } else {
            return statusResponse("noSuchUser");
        }
        // NOTE: theoretically, the superadmin could make themselves a regular admin, but we'll assume they're not that stupid...
    } // end grantAdminRights()
    
    // gives you your own admin status
    // NOTE: storing the admin status in a cookie would mean much less db calls... could be worth figuring out how to deal with multiple cookie values
    @POST
    @Path("GetOwnAdminStatus")
    @Produces(MediaType.APPLICATION_JSON) 
    public Response adminStatus(@CookieParam("id") int ownId) {
    
        try {
            User u = uBean.findById(ownId);

            return statusResponse(u.getAdmin()+"");
        } catch (Exception e) {
            
            return statusResponse("failedToGetOwnAdminStatus");
        }
    }
    
    // check some other user's admin status
    @GET
    @Path("CheckAdminStatus")
    @Produces(MediaType.APPLICATION_JSON)
    public Response checkAdmin(@QueryParam("checkAdmin") String alias) {
        
        // TODO: see that the user exists
        
        User u = uBean.findByX("Alias", alias);  
        
        if (notNull(u)) {
            ResponseString s = new ResponseString();
            s.add("status", "checkAdmin");
            s.add("adminName", alias);
            s.add("adminStatus", u.getAdmin()+"");
            s.pack();
            return Response.ok(s.toString()).build();
        } else {
            return statusResponse("noSuchUser");
        }
    } // end checkAdmin()
    
    // NOTE: only superadmin can revoke admin rights, so only s/he should be able to see this button
    @POST
    @Path("RevokeAdmin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response revokeAdmin(@FormParam("id") int id) {
        
        User u = uBean.findById(id);  
        
        if (notNull(u)) {
        
            u.setAdmin(0);
            uBean.updateDbEntry(u);

            return statusResponse("revokedAdmin");
        } else {
            return statusResponse("noSuchUser");
        }
    } // end revokeAdmin()

    // Meant for admin operations (only admins can see this)
    @POST
    @Path("DeleteAnyUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeAnyUser(@CookieParam("id") int ownId, @FormParam("ownRights") String ownRights, @FormParam("id") int userId) {
        
        User u = uBean.findById(userId);
        
        if (notNull(u)) {
                                                              
            if (userId == ownId) { // delete own user
                
                uBean.deleteFromDb(u);
                return statusResponse("deletedOwnUser");
            }
            else if (ownRights.equals("2")) { // delete other user as superadmin
                
                uBean.deleteFromDb(u); 
                return statusResponse("deletedOtherUser");
            } 
            else { // delete other user as regular admin (regular users cannot see this command, so a check for them is not needed)

                if (u.getAdmin() == 0) {
                
                    uBean.deleteFromDb(u);
                    return statusResponse("deletedOtherUser");
                
                } else {
                
                    return statusResponse("deniedToDeleteOtherAdmin");                
                }
            } // end admin status else-if      
        } 
        else {       
            return statusResponse("noSuchUser");
        } // end nullcheck else-if
    } // end deleteAnyUSer()
} // end class
