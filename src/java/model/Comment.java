
package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Ville L
 */
@Entity
@Table(name = "Comment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Comment.findAll", query = "SELECT c FROM Comment c")
    , @NamedQuery(name = "Comment.findById", query = "SELECT c FROM Comment c WHERE c.id = :id")
    , @NamedQuery(name = "Comment.findByAddtime", query = "SELECT c FROM Comment c WHERE c.addtime = :addtime")
    , @NamedQuery(name = "Comment.findByUserId", query = "SELECT c FROM Comment c WHERE c.useridUser = :useridUser")
    , @NamedQuery(name = "Comment.findByCompId", query = "SELECT c FROM Comment c WHERE c.compidComp = :compidComp")
    , @NamedQuery(name = "Comment.deleteComment", query = "DELETE FROM Comment c WHERE c.id = :id")
    , @NamedQuery(name = "Comment.countCommsOnComp", query = "SELECT COUNT(c) FROM Comment c WHERE c.compidComp = :compidComp")})
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Lob
    @Column(name = "CONTENT", length = 65535)
    private String content;
    @Basic(optional = false)
    @Column(name = "ADDTIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date addtime;
    @JoinColumn(name = "USERID", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private User useridUser;
    @JoinColumn(name = "COMPID", referencedColumnName = "ID")
    @ManyToOne(optional = false)
    private Comp compidComp;

    public Comment() {
    }

    public Comment(Integer id) {
        this.id = id;
    }

    public Comment(String content, Date addtime, User useridUser, Comp compidComp) { // are foreign keys added automatically ??
        this.content = content;
        this.addtime = addtime;
        this.useridUser = useridUser;
        this.compidComp = compidComp;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getAddtime() {
        return addtime;
    }

    public void setAddtime(Date addtime) {
        this.addtime = addtime;
    }

    public User getUseridUser() {
        return useridUser;
    }

    public void setUseridUser(User useridUser) {
        this.useridUser = useridUser;
    }

    public Comp getCompidComp() {
        return compidComp;
    }

    public void setCompidComp(Comp compidComp) {
        this.compidComp = compidComp;
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
        if (!(object instanceof Comment)) {
            return false;
        }
        Comment other = (Comment) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "model.Comment[ id=" + id + " ]";
    }
    
}
