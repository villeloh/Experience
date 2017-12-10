
package controller.services;

import controller.beans.CommentBean;
import controller.beans.CompBean;
import controller.beans.UserBean;
import java.sql.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.CookieParam;
import javax.ws.rs.Produces;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.Comment;
import model.Comp;
import model.User;
import utils.ResponseString;
import static utils.Utils.statusResponse;
import static utils.Validation.validComment;

/**
 * REST Web Service
 * Service for managing comments and their db operations.
 * @author Ville L
 */
@Path("CommentService")
public class CommentService {
    
    @EJB
    private CommentBean commBean;
    
    @EJB
    private CompBean compBean;
    
    @EJB
    private UserBean uBean;

    public CommentService() {
    }

    // create new comment (based on form data)
    @POST
    @Path("AddComment")
    //@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON) 
    public Response addComment(
            @FormParam("content") String content, 
            @FormParam("compid") int compid,
            @FormParam("time") long time,
            @CookieParam("id") int ownId
            ) {
    
        // TODO: spam check...
        
        if (!validComment(content)) {
        
            return statusResponse("invalidComment");
        }
        
        Date addTime = new Date(time); // convert millisecond value to a date object       
        User u = uBean.findById(ownId);
        
        Comment c = new Comment();
        c.setUseridUser(u);
        c.setContent(content);
        c.setAddtime(addTime);
        c.setCompidComp(compBean.findByIntX("Id", compid));
        commBean.insertToDb(c);
        
        // increase number of comments on the relevant composition by 1. 
        // NOTE: there is likely a way to automate this operation somehow...
        Comp alteredComp = compBean.findByIntX("Id", compid); // this should always succeed (because of compid's origin)
        alteredComp.setComms(alteredComp.getComms()+1);
        compBean.updateDbEntry(alteredComp);
        
        ResponseString s = new ResponseString();
        s.add("status", "addedComment");
        s.add("content", content);     
        s.add("compId", compid+"");
        s.add("time", addTime+"");
        s.add("adder", u.getAlias());
        s.add("numOfComms", alteredComp.getComms()+"");
        s.pack();
        return Response.ok(s.toString()).build();
    } // end addComment()
    
    // the edit button should only be visible to admins and the comment adder
    @POST
    @Path("EditComment")
    @Produces(MediaType.APPLICATION_JSON) 
    public Response editComment(@CookieParam("id") int ownId, @QueryParam("id") int commId, @FormParam("content") String newContent) { // the id comes from clicking on the comment to edit
        
        // TODO: add a time check... if we have the time :p
        
        if (!validComment(newContent)) {
        
            return statusResponse("invalidComment");
        }
        
        Comment c = commBean.findByIntX("Id", commId);
     
        c.setContent(newContent);
        commBean.updateDbEntry(c);
        
        return statusResponse("editedComment"); 
    } // end editComment()
    
    @POST
    @Path("DeleteComment")
    @Produces(MediaType.APPLICATION_JSON) 
    public Response deleteComment(@CookieParam("id") int ownId, @QueryParam("id") int id) { // the id comes from clicking on the comment to delete
        
        Comment c = commBean.findByIntX("Id", id);
        commBean.deleteFromDb(c);
        
        // TODO: check that this is correct...
        Comp alteredComp = compBean.findByIntX("Id", c.getCompidComp().getId()); // the composition that the the comment was attached to
        
        int newComms = (alteredComp.getComms() > 0) ? alteredComp.getComms()-1 : 0; // if there's at least one comment, decrease the number of comments by one
        
        alteredComp.setComms(newComms);
        compBean.updateDbEntry(alteredComp);
        
        return statusResponse("removedComment"); 
    } // end removeComment()
    
    // used in a double-fetch when clicking on a composition in the larger list view
    @POST
    @Path("GetCommentsByCompId")
    @Produces(MediaType.APPLICATION_JSON) 
    public Response getCommsByCompId(@FormParam("id") int compId) {
         
        try {
            List<Comment> cList = commBean.findAllByCompId(compId);
      
            ResponseString returnString = new ResponseString();
            
            int commCount = 1;

            for (Comment c : cList) {

                // individual String object (value) to be wrapped in final return String object
                ResponseString s = new ResponseString();
                s.addToList("id", c.getId()+""); // needed for deleting / editing
                s.addToList("adder", c.getUseridUser().getAlias());
                s.addToList("content", c.getContent());
                s.addToList("addtime", c.getAddtime()+"");
                s.pack();
                
                // key-value pair for individual comment entry in the final return String
                String num = commCount+"";
                returnString.add("comm_"+num, s.toString());

                commCount++;
            } // end for-loop
            
            returnString.pack();
            return Response.ok(returnString.toString()).build();
            
        } catch (Exception e) {
            return statusResponse("failedToGetComments");
        }
    } // end getCommsByCompId()
    
    // used for displaying your own comments in the profile view
    @POST
    @Path("GetCommentsByOwnId")
    @Produces(MediaType.APPLICATION_JSON) 
    public Response getCommsByUserId(@CookieParam("id") int userId) {
        
        try {        
            List<Comment> cList = (List<Comment>)commBean.findAllByUserId(userId);
            ResponseString returnString = new ResponseString();
            returnString.add("status", "gotCommentsByOwnId");
            
            int commCount = 1;

            for (Comment c : cList) {

                // individual String object (value) to be wrapped in final return String object
                ResponseString s = new ResponseString();
                s.addToList("id", c.getId()+""); // needed for going to the comment
                s.addToList("content", c.getContent());
                s.addToList("addtime", c.getAddtime()+"");
                s.addToList("comp", c.getCompidComp().getTitle());
                s.pack();
                
                // key-value pair for individual comment entry in the final return String
                String num = commCount+"";
                returnString.add("item_"+num, s.toString());

                commCount++;
            } // end for-loop
            
            returnString.pack();
            return Response.ok(returnString.toString()).build();
            
        } catch (Exception e) {
            return statusResponse("failedToGetComments");
        }
    } // end getCommsByUserId()
} // end class()
