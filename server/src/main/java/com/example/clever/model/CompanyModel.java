/*
 */
package com.example.clever.model;

import com.example.clever.GlobalVariables;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

/**
*Kласс для получения и определения полей компаний.
* @since 1.0
*/
@Entity
@Table(name = "companies")
public class CompanyModel {
    /**
    *Поле id компании.
    */
    @Id
    @GeneratedValue(generator = "company_generator")
    @SequenceGenerator(
        name = "company_generator",
        sequenceName = "company_sequence",
        initialValue = GlobalVariables.VALUE_OF_ID_INITIALVALUE
    )
    private long id;

    /**
    *Поле название компании.
    */
    @NotBlank
    private String name;

    /**
    *Поле Организационная форма компании.
    */
    private String form;

    /**
    *Поле Описание компании.
    */
    private String description;

    /**
    *Поле Дата основания компании.
    */
    @Column(name = "foundation_date")
    private Date foundDate;

    /**
    *Пользователи в компании.
    */
    @ManyToMany(mappedBy = "company", fetch = FetchType.LAZY)
    private final Set<UserModel> users = new HashSet<>();

    public CompanyModel() {}

    /**
    *Конструктор для класса CompanyModel.
    *@param name название компании
    *@param form организационная форма компании
    *@param description описание компании
    *@param foundDate дата основания компании
    */
    public CompanyModel(final String name,
                        final String form,
                        final String description,
                        final Date foundDate) {
        this.name = name;
        this.form = form;
        this.description = description;
        this.foundDate = foundDate;
    }

    /**
     *Метод получения значения поля {@link long#id}.
     *
     *@return
     *Возвращает id компании.
     */
    public long getId() {
        return this.id;
    }

    /**
     *Метод определения поля id компании {@link long#id}.
     *
     *@param idl
     *Поле id компании.
     */
    public void setId(final long idl) {
        this.id = idl;
    }

    /**
     *Метод получения значения поля {@link String#name}.
     *
     *@return
     *Возвращает название компании.
     */
    public String getName() {
        return this.name;
    }

    /**
     *Метод определения поля Название
     *компании {@link String#name}.
     *
     *@param namel
     *Поле название компании.
     */
    public void setName(final String namel) {
        this.name = namel;
    }

    /**
     *Метод получения значения поля {@link String#form}.
     *
     *@return
     *Возвращает организационную форму компании.
     */
    public String getForm() {
        return this.form;
    }

    /**
     *Метод определения поля Организационная
     *форма компании {@link String#form}.
     *
     *@param forml
     *Поле форма компании.
     */
    public void setForm(final String forml) {
        this.form = forml;
    }

    /**
     *Метод получения значения поля
     *{@link String#description}.
     *
     *@return Возвращает описание компании
     */
    public String getDescription() {
        return this.description;
    }

    /**
     *Метод определения поля Описание
     *компании {@link String#description}.
     *
     *@param descriptionl
     *Поле описание компании.
     */
    public void setDescription(final String descriptionl) {
        this.description = descriptionl;
    }

    /**
     *Метод получения значения поля {@link Date#foundDate}.
     *
     *@return
     *Возвращает дату основания компании.
     */
    public Date getFoundationDate() {
        return this.foundDate;
    }

    /**
     *Метод определения поля Дата основания
     *компании компании {@link Date#foundDate}.
     *
     *@param foundDatel
     *Дата основания компании.
     */
    public void setFoundationDate(final Date foundDatel) {
        this.foundDate = foundDatel;
    }
}
