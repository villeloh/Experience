
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * WebServlet... Used for image upload because we lack the time to figure out a better solution.
 * @author Ville L
 */
@WebServlet(name = "ImageUploadServlet", urlPatterns = {"/ImageUploadServlet"})
@MultipartConfig(location = "/var/www/html/images")
public class ImageUploadServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
        response.setContentType("application/json");
        
        try (PrintWriter out = response.getWriter()) {
            
            request.getPart("imgFile").write(request.getPart("imgFile").getSubmittedFileName());
            String str = "{\"src\" : \"http://10.114.32.22/images/" + request.getPart("imgFile").getSubmittedFileName() + "\"}";
            System.out.println("ResponseString: " + str);
            out.print(str);
        }
    } // end doPost()
} // end class
