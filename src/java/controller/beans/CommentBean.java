
package controller.beans;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import model.Comment;

/**
 *
 * @author Ville L
 */
@Stateless
public class CommentBean {

    @PersistenceContext
    private EntityManager em;
    
    @EJB
    private CompBean cBean;
    
    @EJB
    private UserBean uBean;
    
    public List<Comment> getAllComments() {

        return em.createNamedQuery("Comment.findAll").getResultList();
    }
    
    public Comment insertToDb(Comment c) {
       
        try { 
            em.persist(c);
        } 
        catch (Exception e) {
            c = null;
        }
        return c;
    }
    
    public void updateDbEntry(Comment c){
        
        em.merge(c); // replace existing user entry in the db with the updated one (?)
    }
    
    // delete user from the database (hopefully...)
    public void deleteFromDb(Comment c) {
        
        em.remove(em.merge(c));
        //em.createNamedQuery("Comment.deleteComment").setParameter("id", c.getId()).getSingleResult();
    }

    // A 'findByX' method that works for ints instead of Strings (analogical to 'findById()' in UserBean.java, but here more int stats are needed)
    public Comment findByIntX(String stat, int arg) {
      
        try {
            Comment c = (Comment)em.createNamedQuery("Comment.findBy"+stat).setParameter(stat.toLowerCase(), arg).getSingleResult();         
            return c;
        } catch (NoResultException e) {
            return null;
        }  
    } // end findByIntX()    
    
    // A method to fetch all comments with a certain int stat (in practice, userId or compId)
    public List<Comment> findAllByIntX(String stat, int arg) {
      
        try {
            List<Comment> c = (List<Comment>)em.createNamedQuery("Comment.findBy"+stat).setParameter(stat.toLowerCase(), arg).getResultList();
            return c;
        } catch (NoResultException e) {
            return null;
        }  
    } // end findAllByIntX()
   
    // A method to fetch all comments with a certain compId
    public List<Comment> findAllByCompId(int compId) {
      
        try {
            List<Comment> c = (List<Comment>)em.createNamedQuery("Comment.findByCompId").setParameter("compidComp", cBean.findByIntX("Id", compId)).getResultList();
            return c;
        } catch (NoResultException e) {
            return null;
        }  
   } // end findAllByCompId()
    
    // A method to fetch all comments with a certain userId
    public List<Comment> findAllByUserId(int userId) {
      
        try {
            List<Comment> c = (List<Comment>)em.createNamedQuery("Comment.findByUserId").setParameter("useridUser", uBean.findById(userId)).getResultList();
            return c;
        } catch (NoResultException e) {
            return null;
        }  
   } // end findAllByUserId()
} // end class
