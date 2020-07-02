/*
 */
package com.example.clever.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
*Kласс получения и записи полей отношения
*пользователь-проект.
* @since 1.0
*/
@Entity
@Table(name = "user_projects")
public final class UserProjectModel {
    /**
    *Поле Id проекта.
    */
    @Id
    @Column(name = "project_id")
    private long projectid;

    /**
    *Поле Id пользователя.
    */
    @Column(name = "user_id")
    private long userid;

    /**
    *Метод получения значения поля {@link long#projectid}.
    *
    *@return
    *Возвращает projectid.
    */
    public long getProjectid() {
        return this.projectid;
    }

    /**
    *Метод определения поля projectid проекта {@link long#projectid}.
    *
    *@param projectidl
    *Поле projectid.
    */
    public void setProjectid(final long projectidl) {
        this.projectid = projectidl;
    }

    /**
    *Метод получения значения поля {@link long#userid}.
    *
    *@return
    *Возвращает userid.
    */
    public long getUserid() {
        return this.userid;
    }

    /**
     *Метод определения поля userid проекта {@link long#userid}.
     *
     *@param useridl
     *Поле userid.
     */
    public void setUserid(final long useridl) {
        this.userid = useridl;
    }

}
