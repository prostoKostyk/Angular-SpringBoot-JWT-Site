/*
 */
package com.example.clever.repository;

import java.util.Optional;

import com.example.clever.model.ExperienceModel;
import com.example.clever.model.UserModel;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
*Репозиторий ExperienceRepository.
* @since 1.0
*/
@Repository
public interface ExperienceRepository extends JpaRepository<ExperienceModel, Long> {
    /**
    *Поиск пользователя по пользователю.
    *@param user Пользователь
    *@param pageable Интерфейс для пагинации Pageable
    *@return Возвращает Page c найденными пользователями
    */
    Page<ExperienceModel> findByUser(Optional<UserModel> user, Pageable pageable);
}
