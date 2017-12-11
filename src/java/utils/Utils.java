
package utils;

import javax.ws.rs.core.Response;

/**
 * Class containing useful utility functions, for use in all possible places.
 * @author Ville L
 */

public class Utils {
    
    // helper method to convert 'findByX()' call result to boolean form
    public static boolean notNull(Object o) {
    
        return !(o == null);
    }
    
    // helper method to easily set a single-line status field for a json (response) object
    public static Response statusResponse(String statusMsg) {

        return Response.ok("{\"status\": \"" + statusMsg + "\"}").build();    
    }
    
    // check whether something is empty or not (zero length or contains pure whitespace)
    public static boolean isEmpty(String str) {
        
        // these must be combinable somehow, but for now I haven't found the way to do it   
        return (str.matches("\\s+") || str.equals(""));
    }
    
    public static boolean lengthOver(String str, int length) {
    
        return str.length() > length;
    }
    
    public static boolean lengthUnder(String str, int length) {
    
        return str.length() < length;
    }
} // end class
