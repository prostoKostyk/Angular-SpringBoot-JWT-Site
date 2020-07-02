/*
 */
package com.example.clever.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
*Kласс получения и записи полей
*отношения пользователь-компания.
* @since 1.0
*/
@Entity
@Table(name = "users_companies")
public final class UserCompanyModel {
    /**
    *Поле Id компании.
    */
    @Id
    @Column(name = "company_id")
    private long companyid;

    /**
    *Поле Id пользователя.
    */
    @Column(name = "user_id")
    private long userid;

    /**
     *Метод получения значения
     *поля {@link long#company_id}.
     *
     *@return
     *Возвращает Company_id.
     */
    public long getCompanyid() {
        return this.companyid;
    }

    /**
     *Метод определения поля
     *companyid {@link long#companyid}.
     *
     *@param companyidl
     *Поле companyid.
     */
    public void setCompanyid(final long companyidl) {
        this.companyid = companyidl;
    }

    /**
     *Метод получения значения
     *поля {@link long#userid}.
     *
     *@return
     *Возвращает userid.
     */
    public long getUserid() {
        return this.userid;
    }

    /**
    *Метод определения поля
    *company_id проекта {@link long#company_id}.
    *
    *@param useridl
    *Поле company_id.
    */
    public void setUserid(final long useridl) {
        this.userid = useridl;
    }

}
