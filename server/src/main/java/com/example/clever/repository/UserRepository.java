/*
 */
package com.example.clever.repository;

import com.example.clever.model.CompanyModel;
import com.example.clever.model.ProjectModel;
import com.example.clever.model.UserModel;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
*Репозиторий UserRepository.
* @since 1.0
*/
@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    /**
    *Поиск пользователя по логину.
    *@param username Логин
    *@return Возвращает Optional c найденными пользователями
    */
    Optional<UserModel> findByUsername(String username);

    /**
    *Поиск пользователя по email.
    *@param email Email
    *@return Возвращает найденного пользователя
    */
    UserModel findByEmail(String email);

    /**
    *Поиск пользователя по проектам.
    *@param projects Проекты
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными пользователями
    */
    Page<UserModel> findByProjects(Optional<ProjectModel> projects, Pageable pageable);

    /**
    *Поиск пользователя по компании.
    *@param projects Проекты
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными пользователями
    */
    Page<UserModel> findByCompany(Optional<CompanyModel> companies, Pageable pageable);

    /**
    *Проверка существования пользователя по логину.
    *@param username Логин
    *@return Возвращает true или false
    */
    Boolean existsByUsername(String username);

    /**
    *Поиск пользователя по email.
    *@param email Email
    *@return Возвращает true или false
    */
    Boolean existsByEmail(String email);
}

