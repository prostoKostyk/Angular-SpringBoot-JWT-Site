/*
 */
package com.example.clever.model;

import com.example.clever.GlobalVariables;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
*Kласс получения и записи полей таблицы Проекты.
* @since 1.0
*/
@Entity
@Table(name = "projects")
@SequenceGenerator(name = "seq", initialValue = 1, allocationSize = GlobalVariables.ALLOCATSIZE)
public class ProjectModel {
    /**
    *Поле id проекта.
    */
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    @Id
    private long id;

    /**
    *Поле Название проекта.
    */
    private String name;

    /**
    *Поле Цель проекта.
    */
    private String target;

    /**
    *Поле Описание проекта.
    */
    private String description;

    /**
    *Поле Лимит по времения проекта.
    */
    @Column(name = "time_limit_months")
    private int timelimit;

    /**
    *Поле Стоимость проекта.
    */
    private int cost;

    /**
    *Поле Проект одобрен.
    */
    private boolean approved;

    /**
    *Поле Пользователи в проекте.
    */
    @ManyToMany(mappedBy = "projects", fetch = FetchType.LAZY)
    private final Set<UserModel> users = new HashSet<>();

    public ProjectModel() {}

    /**
    *Конструктор для класса ProjectModel.
    *@param name название проекта
    *@param target цель роли
    *@param description описание проекта
    *@param timelimit лимит проекта по времени в месяцах
    *@param cost стоимость проекта
    *@param approved одобрен ли проект
    */
    public ProjectModel(final String name,
                        final String target,
                        final String description,
                        final int timelimit,
                        final int cost,
                        final boolean approved) {
        this.name = name;
        this.target = target;
        this.description = description;
        this.timelimit = timelimit;
        this.cost = cost;
        this.approved = approved;
    }

    /**
     *Метод получения значения поля {@link long#id}.
     *
     *@return
     *Возвращает id проекта.
     */
    public long getId() {
        return this.id;
    }

    /**
     *Метод определения поля*
     *id проекта {@link long#id}.
     *
     *@param idl
     *Поле id проекта.
     */
    public void setId(final long idl) {
        this.id = idl;
    }

    /**
     *Метод получения значения поля {@link String#name}.
     *
     *@return
     *Возвращает название проекта.
     */
    public String getName() {
        return this.name;
    }

    /**
     *Метод определения поля
     *Название проекта {@link String#name}.
     *
     *@param namel
     *Поле название проекта.
     */
    public void setName(final String namel) {
        this.name = namel;
    }

    /**
     *Метод получения значения
     *поля {@link String#target}.
     *
     *@return
     *Возвращает цель проекта.
     */
    public String getTarget() {
        return this.target;
    }

    /**
     *Метод определения поля Цель проекта {@link String#target}.
     *
     *@param targetl
     *Поле цель проекта.
     */
    public void setTarget(final String targetl) {
        this.target = targetl;
    }

    /**
     *Метод получения значения поля {@link String#description}.
     *
     *@return
     *Возвращает описание проекта.
     */
    public String getDescription() {
        return this.description;
    }

    /**
     *Метод определения поля описание
     *проекта {@link String#description}.
     *
     *@param descriptionl
     *Поле описание проекта.
     */
    public void setDescription(final String descriptionl) {
        this.description = descriptionl;
    }

    /**
     *Метод получения значения поля {@link int#timelimit}.
     *
     *@return
     *Возвращает Лимит проекта в месяцах.
     */
    public int getTimelimitmonths() {
        return this.timelimit;
    }

    /**
     *Метод определения поля Лимит проекта в месяцах,
     *{@link int#timelimit}.
     *
     *@param timelimitl
     *Лимит проекта в месяцах.
     */
    public void setTimelimitmonths(final int timelimitl) {
        this.timelimit = timelimitl;
    }

    /**
     *Метод получения значения поля {@link int#cost}.
     *
     *@return
     *Возвращает стоимость проекта.
     */
    public int getCost() {
        return this.cost;
    }

    /**
     *Метод определения поля стоимость проекта {@link int#cost}.
     *
     *@param costl
     *Поле стоимость проекта.
     */
    public void setCost(final int costl) {
        this.cost = costl;
    }

    /**
     *Метод получения значения поля {@link boolean#approved}.
     *
     *@return
     *Возвращает одобрен ли проект.
     */
    public boolean isApproved() {
        return this.approved;
    }

    /**
     *Метод определения поля Проект
     *одобрен {@link boolean#approved}.
     *
     *@param approvedl
     *Поле Проект одобрен.
     */
    public void setApproved(final boolean approvedl) {
        this.approved = approvedl;
    }
}
