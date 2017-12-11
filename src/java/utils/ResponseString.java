
package utils;

/**
 * Making my own String object to pass to Response.ok() in the services... It doesn't seem to play nice with standard JSONObjects.
 * @author Ville L
 */
public class ResponseString {
    
    private String str;
    
    public ResponseString() {
    
        this.str = "";
    }
    
    // need to escape the double-hipsulat that need to be present in the json for some reason...
    public void add(String key, String value) {
    
        this.str = this.str + " \"" + key + "\": " + "\"" + value + "\",";
    }
    
    // yet for lists, we need to use single quotes in order not to f up the json...
    public void addToList(String key, String value) {
    
        this.str = this.str + " '" + key + "': " + "'" + value + "',";
    }
    
    public void pack() {
    
        this.str = this.str.substring(0, this.str.length()-1); // remove the last, superfluous comma
        this.str = "{" + this.str + " }"; // add brackets around the whole thing
    }
    
    @Override
    public String toString() {
    
        return this.str;
    }       
} // end class
