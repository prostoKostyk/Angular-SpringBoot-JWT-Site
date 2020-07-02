/*
 */
package com.example.clever.repository;

import com.example.clever.model.ProjectModel;
import com.example.clever.model.UserModel;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
*Репозиторий ProjectRepository.
* @since 1.0
*/
@Repository
public interface ProjectRepository extends PagingAndSortingRepository<ProjectModel, Long> {
    /**
    *Поиск проектов по имени.
    *@param name имя
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными проектами
    */
    Page<ProjectModel> findByNameContainingIgnoreCase(String name, Pageable pageable);

    /**
    *Поиск проектов по имени и по "одобрен".
    *@param name Имя
    *@param approved Одобрен
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными проектами
    */
    Page<ProjectModel> findByNameContainingIgnoreCaseAndApproved(String name, boolean approved,
        Pageable pageable);

    /**
    *Поиск проектов по "одобрен".
    *@param approved Одобрен
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными проектами
    */
    Page<ProjectModel> findByApproved(boolean approved, Pageable pageable);

    /**
    *Поиск проектов по пользователям.
    *@param users Пользователи
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными проектами
    */
    Page<ProjectModel> findByUsers(Optional<UserModel> users, Pageable pageable);

    /**
    *Поиск проектов по пользователям и по "одобрен".
    *@param users Пользователи
    *@param approved Одобрен
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными проектами
    */
    Page<ProjectModel> findByUsersAndApproved(Optional<UserModel> users, boolean approved,
        Pageable pageable);

    /**
    *Поиск проектов по пользователям и по имени.
    *@param users Пользователи
    *@param name Имя
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными проектами
    */
    Page<ProjectModel> findByUsersAndNameContainingIgnoreCase(Optional<UserModel> users,
        String name, Pageable pageable);
}
