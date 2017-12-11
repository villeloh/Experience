
package controller.beans;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import model.User;

/**
 * Session bean to manage to manage db operations for Users.
 * @author Ville L
 */
@Stateless
public class UserBean {

    @PersistenceContext
    private EntityManager em;

    public List<User> getAllUsers() {

        return em.createNamedQuery("User.findAll").getResultList();
    }
    
    public User insertToDb(User u) {
       
        try { 
            em.persist(u);
        } 
        catch (Exception e) {
            u = null;
        }
        return u;
    }
    
    public void updateDbEntry(User u){
        
        em.merge(u); 
    }
    
    public void deleteFromDb(User u) {
        
        em.remove(em.merge(u));
    }    
        
   public User findById(int id) {
      
       try { 
            User u = (User)em.createNamedQuery("User.findById").setParameter("id", id).getSingleResult();
            return u;
        } catch (NoResultException e) {
            return null;
        }
   }
    
    // checks whether a user with a certain String-form stat (name, email, etc) exists in the User database and returns it
    // NOTE: use a big initial letter in 'stat' for this to work!
    public User findByX(String stat, String arg) {
        
        try {
            User u = (User)em.createNamedQuery("User.findBy"+stat).setParameter(stat.toLowerCase(), arg).getSingleResult();         
            return u;
        } catch (NoResultException e) {
            return null;
        }    
    } // end findByX()     
} // end class
