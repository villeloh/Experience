
package utils;

import static utils.Utils.isEmpty;
import static utils.Utils.lengthOver;
import static utils.Utils.lengthUnder;

/**
 * Contains functions for validating various thingies.
 * @author Ville L
 */
public class Validation {
    
    // NOTE: client-side validation should be used to tell the user why their entries were invalid.
    // These methods return booleans (for simplicity), which means that the reasons for invalidity 
    // get lost before sending the response back to the client.
    
    // regExp sure looks neat with those double escapes... let's hope that it works!
    private static final String SPECIALS = "\\!\\$\\¤\\%\\+\\#\\\\\\{\\}\\@\\/\\[\\]\\*\\;\\^\\'\\~\\<\\>\\|\\=\\`\\(\\)\\\"";
    
    // used in the signup form
    public static boolean validUser(String alias, String email, String pw, String pw2) {
    
        return validAlias(alias) && validEmail(email) && validPw(pw) && pw.equals(pw2);
    }
    
    //used in the login form
    public static boolean validUser(String alias, String pw) {
    
        return validAlias(alias) && validPw(pw);
    }
    
    public static boolean validAlias(String alias) {

        if (lengthOver(alias, 20) || isEmpty(alias)) {
            
            return false;
        }
        // This returns false if the String starts with a number or whitespace, or contains any of a number of illegal characters (in any place)
        
        return !alias.matches("^(?=.*[\\d\\s+])(?=.*["+SPECIALS+"]+).*$");
    } // end validAlias()
    
    public static boolean validEmail(String email) {

        if (lengthOver(email, 25) || isEmpty(email)) {
            
            return false;
        }
        // if the email starts with space or a number or a special character, or contains non-alphabetical, non-numeric characters, 
        // or has an end part with the wrong amount of letters, it is invalid.
        // NOTE: this pattern requires at least two letters for the first part of the email... if some bozo really has an address like 'a@b.com', 
        // then s/he can do without our app :D 
        return email.matches("^[^"+SPECIALS+"\\d\\s+][a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,3}$");
    } // end validEmail()
    
    public static boolean validPw(String pw) {
                
        if (lengthOver(pw, 15) || lengthUnder(pw, 6) || isEmpty(pw)) {
            
            return false;
        }
        // password must contain at least 2 special characters, have no whitespace, contain 2 big letters, 2 numbers
        // and 2 small letters 
        return pw.matches("^(?=.*["+SPECIALS+"]{2,})(?!.*\\s+)(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*\\d{2,}).*$");
    } // end validPw()
    
    
    public static boolean validPic(String pic) {
    
        return !isEmpty(pic);
    }
    
    public static boolean validComp(String title, String author, int length, int year, int diff, int pages, String video, String sheet) {
    
        if (lengthOver(title, 50) || isEmpty(title)) {
        
            return false;
        }
        
        if (lengthOver(author, 50) || isEmpty(author)) {
        
            return false;
        } 
                
        if (length < 0 || length > 36000) { // length more than 10 hours
        
            return false;
        } 
                        
        if (year < 0 || year > 9999) {
        
            return false;
        } 
                                
        if (diff != 0 && diff != 1 && diff != 2) {
        
            return false;
        } 
                                        
        if (pages <= 0 || pages > 20) { // ask Xenia for an optimal limit
        
            return false;
        } 
        
        // the url must refer to youtube.com
        if (!video.matches("^https\\:\\/\\/www\\.youtube\\.com\\/\\S+$")) {
        
            return false;
        } 
        
        // the sheet address should always be valid, given how its entered, but it's good to check for emptiness just in case
        if (isEmpty(sheet)) {
        
            return false;
        } 
  
        return true;
    } // end validComp()
    
    public static boolean validComment(String content) {
    
        if (lengthOver(content, 500) || isEmpty(content)) {
            
            return false;
        }  
            
        return true;
    } // end validComment()       
} // end class
