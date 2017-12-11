
package model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * Entity class for the Composition object.
 * @author Ville L
 */

@Entity
@Table(name = "Comp")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Comp.findAll", query = "SELECT c FROM Comp c")
    , @NamedQuery(name = "Comp.findById", query = "SELECT c FROM Comp c WHERE c.id = :id")
    , @NamedQuery(name = "Comp.findByTitle", query = "SELECT c FROM Comp c WHERE c.title = :title")
    , @NamedQuery(name = "Comp.findByAuthor", query = "SELECT c FROM Comp c WHERE c.author = :author")
    , @NamedQuery(name = "Comp.findByLength", query = "SELECT c FROM Comp c WHERE c.length = :length")
    , @NamedQuery(name = "Comp.findByYear", query = "SELECT c FROM Comp c WHERE c.year = :year")
    , @NamedQuery(name = "Comp.findByDiff", query = "SELECT c FROM Comp c WHERE c.diff = :diff")
    , @NamedQuery(name = "Comp.findByPages", query = "SELECT c FROM Comp c WHERE c.pages = :pages")
    , @NamedQuery(name = "Comp.findByVideo", query = "SELECT c FROM Comp c WHERE c.video = :video")
    , @NamedQuery(name = "Comp.findByAddtime", query = "SELECT c FROM Comp c WHERE c.addtime = :addtime")
    , @NamedQuery(name = "Comp.findByAdderId", query = "SELECT c FROM Comp c WHERE c.adderidUser = :adderidUser")
    , @NamedQuery(name = "Comp.deleteComp", query = "DELETE FROM Comp c WHERE c.id = :id")
    , @NamedQuery(name = "Comp.findAllByAdderId", query = "SELECT COUNT(c) FROM Comp c WHERE c.adderidUser = :adderidUser")})
public class Comp implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "TITLE", length = 255)
    private String title;
    @Basic(optional = false)
    @Column(name = "AUTHOR", length = 255)
    private String author;
    @Column(name = "LENGTH")
    private Integer length;
    @Column(name = "YEAR")
    private Integer year;
    @Basic(optional = false)
    @Column(name = "DIFF")
    private int diff;
    @Column(name = "PAGES")
    private Integer pages;
    @Column(name = "VIDEO", length = 255)
    private String video;
    @Column(name = "SHEET", length = 255)
    private String sheet;
    @Basic(optional = false)
    @Column(name = "ADDTIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date addtime;
    @Column(name = "COMMS")
    private int comms;
    @Column(name = "LIKENUM")
    private int likenum;
    @Column(name = "FAVNUM")
    private int favnum;
    
    @ManyToMany(mappedBy = "favorites")
    private Collection<User> userCollection; 
    
    @ManyToMany(mappedBy = "likes") 
    private Collection<User> userCollection1; 
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "compidComp") 
    private Collection<Comment> commentCollection; 
    
    @JoinColumn(name = "ADDERID", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private User adderidUser;

    public Comp() {
    }

    public Comp(Integer id) {
        this.id = id;
    }

    public Comp(String title, String author, Integer length, Integer year, int diff, Integer pages, String video, String sheet, Date addtime, User adderidUser, int comms, int likenum, int favnum) {
        this.title = title;
        this.author = author;
        this.length = length;
        this.year = year;
        this.diff = diff;
        this.pages = pages;
        this.video = video;
        this.sheet = sheet;
        this.addtime = addtime;
        this.adderidUser = adderidUser;
        this.comms = comms;
        this.likenum = likenum;
        this.favnum = favnum;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public int getDiff() {
        return diff;
    }

    public void setDiff(int diff) {
        this.diff = diff;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getSheet() {
        return sheet;
    }

    public void setSheet(String sheet) {
        this.sheet = sheet;
    }

    public Date getAddtime() {
        return addtime;
    }

    public void setAddtime(Date addtime) {
        this.addtime = addtime;
    }
    
    public int getComms() {
        return this.comms;
    }

    public void setComms(int comms) {
        this.comms = comms;
    }
    
    public int getLikeNum() {
        return this.likenum;
    }

    public void setLikeNum(int likenum) {
        this.likenum = likenum;
    }
    
    public int getFavNum() {
        return this.favnum;
    }

    public void setFavNum(int favnum) {
        this.favnum = favnum;
    }

    @XmlTransient
    public Collection<User> getUserCollection() {
        return userCollection;
    }

    public void setUserCollection(Collection<User> userCollection) {
        this.userCollection = userCollection;
    }

    @XmlTransient
    public Collection<User> getUserCollection1() {
        return userCollection1;
    }

    public void setUserCollection1(Collection<User> userCollection1) {
        this.userCollection1 = userCollection1;
    }

    @XmlTransient
    public Collection<Comment> getCommentCollection() {
        return commentCollection;
    }

    public void setCommentCollection(Collection<Comment> commentCollection) {
        this.commentCollection = commentCollection;
    }

    public User getAdderidUser() {
        return adderidUser;
    }

    public void setAdderidUser(User adderidUser) {
        this.adderidUser = adderidUser;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Comp)) {
            return false;
        }
        Comp other = (Comp) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        
        return "model.Comp[ id=" + id + " ]\n" + "[ title=" + title + " ]\n" + "[ author=" + author + " ]\n" + "[ length=" + length + " ]\n" + "[ year=" + year + " ]\n" + "[ adderidUser=" + adderidUser.toString() + " ]\n";
    }
} // end class
