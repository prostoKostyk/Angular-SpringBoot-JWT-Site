/*
 */
package com.example.clever.model;

/**
*Kласс для создания объекта для пагинации.
* @since 1.0
*/
public final class PaginationModel {
    /**
    *Поле Номер страницы.
    */
    private int pageno;

    /**
    *Поле Размер страницы.
    */
    private int pagesize;

    /**
    *Поле Сортировка.
    */
    private String sortby;

    public PaginationModel() {}

    /**
    *Конструктор для класса PaginationModel.
    *@param pageno логин пользователя
    *@param pagesize имя пользователя
    *@param sortby фамилия пользователя
    */
    public PaginationModel(final int pageno,
                           final int pagesize,
                           final String sortby) {
        this.pageno = pageno;
        this.pagesize = pagesize;
        this.sortby = sortby;
    }

    /**
    *Метод получения значения поля {@link int#pageno}.
    *
    *@return
    *Возвращает pageno проекта.
    */
    public int getPageNo() {
        return this.pageno;
    }

    /**
    *Метод определения поля pageno проекта {@link int#pageno}.
    *
    *@param pagenol
    *Поле pageno проекта.
    */
    public void setPageNo(final int pagenol) {
        this.pageno = pagenol;
    }

    /**
    *Метод получения значения поля {@link int#pagesize}.
    *
    *@return
    *Возвращает pagesize проекта.
    */
    public int getPageSize() {
        return this.pagesize;
    }

    /**
    *Метод определения поля pagesize проекта {@link int#pagesize}.
    *
    *@param pagesizel
    *Поле pagesize проекта.
    */
    public void setUsername(final int pagesizel) {
        this.pagesize = pagesizel;
    }

    /**
    *Метод получения значения поля {@link int#sortby}.
    *
    *@return
    *Возвращает sortby проекта.
    */
    public String getSortBy() {
        return this.sortby;
    }

    /**
    *Метод определения поля sortby проекта {@link int#sortby}.
    *
    *@param sortbyl
    *Поле sortby проекта.
    */
    public void setSortBy(final String sortbyl) {
        this.sortby = sortbyl;
    }
}
