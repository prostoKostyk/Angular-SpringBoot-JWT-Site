/*
 */
package com.example.clever.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
*Kласс получения и записи полей таблицы Roles.
* @since 1.0
*/
@Entity
@Table(name = "roles")
public class RoleModel {

    /**
    *Поле id роли.
    */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
    *Поле Название роли.
    */
    @Enumerated(EnumType.STRING)
    private UserRole name;

    public RoleModel() {}

    /**
    *Конструктор для класса RoleModel.
    *@param name название роли
    */
    public RoleModel(final UserRole name) {
        this.name = name;
    }

    /**
     *Метод получения значения поля {@link Integer#id}.
     *
     *@return
     *Возвращает id роли.
     */
    public Integer getId() {
        return this.id;
    }

    /**
     *Метод определения поля id роли {@link Integer#id}.
     *
     *@param idl
     *Поле id роли.
     */
    public void setId(final Integer idl) {
        this.id = idl;
    }

    /**
     *Метод определения поля id роли {@link UserRole#name}.
     *
     *@return Возвращает название роли.
     */
    public UserRole getName() {
        return this.name;
    }

    /**
     *Метод получения значения поля {@link UserRole#name}.
     *
     *@param namel Название роли
     */
    public void setName(final UserRole namel) {
        this.name = namel;
    }
}
