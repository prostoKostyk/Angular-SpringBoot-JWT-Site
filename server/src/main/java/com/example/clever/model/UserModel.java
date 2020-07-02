/*
 */
package com.example.clever.model;

import com.example.clever.GlobalVariables;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
*Kласс для получения и
*определения полей пользователей.
* @since 1.0
*/
@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email") })
public final class UserModel {
    /**
    *Поле id пользователя.
    */
    @Id
    @GeneratedValue(generator = "user_generator")
    @SequenceGenerator(name = "user_generator",
        sequenceName = "user_sequence", initialValue = GlobalVariables.VALUE_OF_ID_INITIALVALUE)
    private long id;

    /**
    *Поле логин пользователя.
    */
    private String username;

    /**
    *Поле имя пользователя.
    */
    @Column(name = "first_name")
    private String firstname;

    /**
    *Поле фамилия пользователя.
    */
    @Column(name = "second_name")
    private String secondname;

    /**
    *Поле отчество пользователя.
    */
    @Column(name = "last_name")
    private String lastname;

    /**
    *Поле номер телефона пользователя.
    */
    @Column(name = "phone_number")
    private String phonenumber;

    /**
    *Поле email пользователя.
    */
    private String email;

    /**
    *Поле пароль пользователя.
    */
    private String password;

    /**
    *Роли пользователя.
    */
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleModel> roles = new HashSet<>();

    /**
    *Проекты пользователя.
    */
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_projects",
        joinColumns = @JoinColumn(name = "user_id",
        referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"))
    private Set<ProjectModel> projects;

    /**
    *Компании пользователя.
    */
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "users_companies",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "company_id", referencedColumnName = "id"))
    private Set<CompanyModel> company;

    /**
    *Пустой конструктор для класса UserModel.
    */
    public UserModel() {}

    /**
    *Конструктор для класса UserModel.
    *@param username логин пользователя
    *@param firstname имя пользователя
    *@param secondname фамилия пользователя
    *@param lastname отчество пользователя
    *@param phonenumber телефонный номер пользователя
    *@param email email пользователя
    *@param password пароль пользователя
    */
    public UserModel(final String username,
                     final String firstname,
                     final String secondname,
                     final String lastname,
                     final String phonenumber,
                     final String email,
                     final String password) {
        this.username = username;
        this.firstname = firstname;
        this.secondname = secondname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.email = email;
        this.password = password;
    }

    /**
     *Метод получения значения поля
     *id пользователя {@link long#id}.
     *
     *@return
     *Возвращает id пользователя.
     */
    public long getId() {
        return this.id;
    }

    /**
     *Метод определения поля
     *id пользователя {@link long#id}.
     *
     *@param idl
     *Поле id пользователя.
     */
    public void setId(final long idl) {
        this.id = idl;
    }

    /**
     *Метод получения значения
     *поля username пользователя {@link String#username}.
     *
     *@return
     *Возвращает username пользователя.
     */
    public String getUsername() {
        return this.username;
    }

    /**
     *Метод определения
     *поля username пользователя {@link String#username}.
     *
     *@param usernamel
     *Поле username пользователя.
     */
    public void setUsername(final String usernamel) {
        this.username = usernamel;
    }

    /**
     *Метод получения значения
     *поля firstname пользователя {@link String#firstname}.
     *
     *@return
     *Возвращает firstname пользователя.
     */
    public String getfirstname() {
        return this.firstname;
    }

    /**
     *Метод определения поля
     *firstname пользователя {@link String#firstname}.
     *
     *@param firstnamel
     *Поле firstname пользователя.
     */
    public void setfirstname(final String firstnamel) {
        this.firstname = firstnamel;
    }

    /**
     *Метод получения значения
     *поля firstname пользователя {@link String#secondname}.
     *
     *@return
     *Возвращает secondname пользователя.
     */
    public String getsecondname() {
        return this.secondname;
    }

    /**
     *Метод определения поля
     *secondname пользователя {@link String#secondname}.
     *
     *@param secondnamel
     *Поле secondname пользователя.
     */
    public void setsecondname(final String secondnamel) {
        this.secondname = secondnamel;
    }

    /**
     *Метод получения значения
     *поля lastname пользователя {@link String#lastname}.
     *
     *@return
     *Возвращает lastname пользователя.
     */
    public String getlastname() {
        return this.lastname;
    }

    /**
     *Метод определения поля
     *lastname пользователя {@link String#lastname}.
     *
     *@param lastnamel
     *Поле lastname пользователя.
     */
    public void setlastname(final String lastnamel) {
        this.lastname = lastnamel;
    }

    /**
     *Метод получения значения
     *поля phonenumber пользователя {@link String#phonenumber}.
     *
     *@return
     *Возвращает phonenumber пользователя.
     */
    public String getphonenumber() {
        return this.phonenumber;
    }

    /**
     *Метод определения поля
     *phonenumber пользователя {@link String#phonenumber}.
     *
     *@param phonenumberl
     *Поле phonenumber пользователя.
     */
    public void setphonenumber(final String phonenumberl) {
        this.phonenumber = phonenumberl;
    }

    /**
     *Метод получения значения
     *поля email пользователя {@link String#email}.
     *
     *@return
     *Возвращает email пользователя.
     */
    public String getEmail() {
        return this.email;
    }

    /**
     *Метод определения поля
     *email пользователя {@link String#email}.
     *
     *@param emaill
     *Поле email пользователя.
     */
    public void setEmail(final String emaill) {
        this.email = emaill;
    }

    /**
     *Метод получения значения
     *поля password пользователя {@link String#password}.
     *
     *@return
     *Возвращает password пользователя.
     */
    public String getPassword() {
        return this.password;
    }

    /**
     *Метод определения поля
     *password пользователя {@link String#password}.
     *
     *@param passwordl
     *Поле password пользователя.
     */
    public void setPassword(final String passwordl) {
        this.password = passwordl;
    }

    /**
     *Метод получения значения поля
     *roles пользователя {@link RoleModel#roles}.
     *
     *@return
     *Возвращает roles пользователя.
     */
    public Set<RoleModel> getRoles() {
        return this.roles;
    }

    /**
     *Метод определения поля roles
     *пользователя {@link RoleModel#roles}.
     *
     *@param rolesl
     *Поле roles пользователя.
     */
    public void setRoles(final Set<RoleModel> rolesl) {
        this.roles = rolesl;
    }

    /**
     *Метод получения значения поля projects
     *пользователя {@link ProjectModel#projects}.
     *
     *@return
     *Возвращает projects пользователя.
     */
    public Set<ProjectModel> getProjects() {
        return this.projects;
    }

    /**
     *Метод определения поля projects
     *пользователя {@link ProjectModel#projects}.
     *
     *@param projectsl
     *Поле projects пользователя.
     */
    public void setProjects(final Set<ProjectModel> projectsl) {
        this.projects = projectsl;
    }

    /**
     *Метод получения компаний
     *пользователя {@link CompanyModel#company}.
     *
     *@return
     *Возвращает компании пользователя.
     */
    public Set<CompanyModel> getCompanies() {
        return this.company;
    }

    /**
     *Метод определения поля
     *company пользователя {@link CompanyModel#company}.
     *
     *@param companyl
     *Поле Компания пользователя.
     */
    public void setCompanies(final Set<CompanyModel> companyl) {
        this.company = companyl;
    }
}
