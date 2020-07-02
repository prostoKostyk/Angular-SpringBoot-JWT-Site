/*
 */
package com.example.clever.model;

import com.example.clever.GlobalVariables;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

/**
*Kласс получения и записи полей таблицы Опыт.
* @since 1.0
*/
@Entity
@Table(name = "experience")
public class ExperienceModel {
    /**
    *Поле id опыта.
    */
    @Id
    @GeneratedValue(generator = "experience_generator")
    @SequenceGenerator(name = "experience_generator",
        sequenceName = "experience_sequence", initialValue = GlobalVariables.VALUE_OF_ID_INITIALVALUE)
    private long id;

    /**
    *Поле Компания.
    */
    @NotBlank
    private String company;

    /**
    *Поле Должность.
    */
    private String position;

    /**
    *Поле Дата начала работы.
    */
    @Column(name = "beginning_date")
    private Date begindate;

    /**
    *Поле Дата окончания работы.
    */
    @Column(name = "end_date")
    private Date enddate;

    /**
    *Поле Время работы в месяцах.
    */
    @Column(name = "experience_months")
    private int experienceMonths;

    /**
    *Пользователь, для которого создан опыт.
    */
    @OneToOne(targetEntity = UserModel.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UserModel user;

    /**
     *Метод получения значения поля {@link long#id}.
     *
     *@return
     *Возвращает id опыта работы.
     */
    public long getId() {
        return this.id;
    }

    public ExperienceModel() {}

    /**
    *Конструктор для класса ConfirmationToken.
    *@param user Данные пользователя.
    */
    public ExperienceModel (final String company,
                            final String position,
                            final Date begindate,
                            final Date enddate,
                            final int experienceMonths,
                            final UserModel user) {
        this.company = company;
        this.position = position;
        this.begindate = begindate;
        this.enddate = enddate;
        this.experienceMonths = experienceMonths;
        this.user = user;
    }

    /**
     *Метод определения поля id опыта работы {@link long#id}.
     *
     *@param idl Поле id опыта работы.
     */
    public void setId(final long idl) {
        this.id = idl;
    }

    /**
     *Метод получения значения поля {@link String#company}.
     *
     *@return Возвращает название компании.
     */
    public String getCompany() {
        return this.company;
    }

    /**
     *Метод определения поля название
     *компании {@link String#company}.
     *
     *@param companyl Название компании.
     */
    public void setCompany(final String companyl) {
        this.company = companyl;
    }

    /**
     *Метод получения значения поля {@link String#position}.
     *
     *@return Возвращает должность.
     */
    public String getPosition() {
        return this.position;
    }

    /**
     *Метод определения поля Должность {@link String#position}.
     *
     *@param positionl Должность.
     */
    public void setPosition(final String positionl) {
        this.position = positionl;
    }

    /**
     *Метод получения значения поля {@link Date#begindate}.
     *
     *@return Возвращает дату начала работы
     */
    public Date getBeginningdate() {
        return this.begindate;
    }

    /**
     *Метод определения поля Дата начала работы,
     *{@link Date#begindate}.
     *
     *@param begindatel
     *Поле дата начала работы.
     */
    public void setBeginningdate(final Date begindatel) {
        this.begindate = begindatel;
    }

    /**
     *Метод получения значения поля {@link Date#enddate}.
     *
     *@return
     *Возвращает дата окончания работы.
     */
    public Date getEnddate() {
        return this.enddate;
    }

    /**
     *Метод определения поля Дата
     *окончания работы {@link Date#enddate}.
     *
     *@param enddatel
     *Поле дата окончания работы.
     */
    public void setEnddate(final Date enddatel) {
        this.enddate = enddatel;
    }

    /**
     *Метод получения значения поля Опыт в месяцах
     *{@link int#experienceMonths}.
     *
     *@return
     *Возвращает Опыт в месяцах
     */
    public int getExperiencemonths() {
        return this.experienceMonths;
    }

    /**
     *Метод определения поля Опыт в месяцах,
     *{@link int#experienceMonths}.
     *
     *@param experienceMonthsl
     *Опыт в месяцах.
     */
    public void setExperiencemonths(final int experienceMonthsl) {
        this.experienceMonths = experienceMonthsl;
    }

    /**
     *Метод получения значения поля {@link UserModel#user}.
     *
     *@return Возвращает пользователя
     */
    public UserModel getUser() {
        return this.user;
    }

    /**
     *Метод определения пользовател.
     *
     *@param userl
     *Поле дата создания токена.
     */
    public void setUser(final UserModel userl) {
        this.user = userl;
    }
}
